
<template>
     <nav v-if="isAuthenticated" class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Worklogs</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link active" to="/Home">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" to="/listWorklogs">List Worklogs</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" to="/worklogs">My Worklogs</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" to="/WorklogsReport">Worklogs Report</router-link>
        </li>
        <li class="nav-item" v-if="isAdminUser" >
          <router-link class="nav-link active" to="/listUsers">List All Users</router-link>
        </li>
        <li class="nav-item" v-if="isAdminUser" >
          <router-link class="nav-link active" to="/editUsers">Edit Users Min/Max Hours</router-link>
        </li>
      </ul>

      <!-- Logout aligned to the right -->
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" href="/">{{nameUser}}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/" @click="handleLogout">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <router-view />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GetUserLogged, IsUserLogged, LogOutUser } from './api-helpers/AuthHelper';
import { UserRoleEnum } from './helpers/Enums';

const router = useRouter();
const route = useRoute();

let isAuthenticated = ref(false);
let nameUser = ref(" ");
let isAdminUser = ref(false);



const checkAuthStatus = () => {
  isAuthenticated.value = IsUserLogged();
  if(isAuthenticated.value)
  {
    const user = GetUserLogged();
    nameUser.value = user.Name;
    isAdminUser.value = user.Role === UserRoleEnum.Admin;
  }

};
onMounted(() => {
  checkAuthStatus();
  if (isAuthenticated.value  && window.location.pathname === '/') {
    router.push('/home');
  }
});

watch(() => route.path, () => {
  checkAuthStatus();
});


const handleLogout = () => {
    LogOutUser();
    router.push('/');
  };

</script>

<style>
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}
</style>