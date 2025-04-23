import axios from "axios";
import Cookies from 'universal-cookie'


const URL_HOST = process.env.VUE_APP_NODE_HOST;
const cookies = new Cookies();




export const LogUser= async(userName, password) =>
{      
   try {
   
         const res = await axios.post(URL_HOST+'/User/login',{User: userName, Pass: password});
         const data = res.data;
         const expirationDate = new Date();
         expirationDate.setTime(expirationDate.getTime() + 12 * 60 * 60 * 1000);
         //cookies.set('FirstName', data.user.name, {path:"/", expires:expirationDate});
         cookies.set('DailyMinHours', data.user.dailyMinHours, {path:"/", expires:expirationDate});
         cookies.set('DailyMaxHours', data.user.dailyMaxHours, {path:"/", expires:expirationDate});
         //cookies.set('Role', data.user.role, {path:"/", expires:expirationDate});
         cookies.set('Token', data.token, {path:"/", expires:expirationDate});
         return true;
      } 
      catch (error) 
        { if(error.response  && error.response.data)   throw error.response.data;  else throw error;}
}


export const IsUserLogged=()=>
{
   if(cookies.get('Token'))
         return true; 
      else 
         return false;
}






export const GetUserLogged=()=>
{
   let user = {};
   user.Token = cookies.get('Token');
   if (!user.Token) return null;
   const decoded = ParseJwt(user.Token);
   user.Name = decoded.sub;
   user.Role = decoded.typ;
   user.DailyMinHours = cookies.get('DailyMinHours');
   user.DailyMaxHours = cookies.get('DailyMaxHours');
   //user.Name = cookies.get('FirstName');
   //user.Role = cookies.get('Role');
   return user;
}



function ParseJwt(token) {
   try {
       const base64Url = token.split('.')[1];
       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
       const jsonPayload = decodeURIComponent(
           atob(base64)
               .split('')
               .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
               .join('')
       );
       return JSON.parse(jsonPayload);
   } catch (e) {
       return null;
   }
}


export const LogOutUser=()=>
{
   cookies.remove('FirstName', { path: '/' });
   cookies.remove('DailyMinHours', { path: '/' });
   cookies.remove('DailyMaxHours', { path: '/' });
   cookies.remove('Role', { path: '/' });
   cookies.remove('Token', { path: '/' });
}
