

export const ReturnFormatedError=(error)=>
  {
     if(error.response  && error.response.data)   
         { console.error( "Error in catch api helper");  console.error( error.response.data);     return error.response.data;  }
       else { console.error( "Error in catch api helper"); console.error(error.response.data); return error.response.data;   }
  }
  