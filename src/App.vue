
<template>
     <nav v-if="isAuthenticated" class="navbar navbar-expand-lg bg-primary " data-bs-theme="dark" >
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Worklogs</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <router-link  class="nav-link active" aria-current="page" to="/Home">Home</router-link>
                    
                  </li>
                  <li class="nav-item">
                    <router-link  class="nav-link active" aria-current="page" to="/worklogs">My Worklogs</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link  class="nav-link active" aria-current="page" to="/WorklogsReport">Worklogs Report</router-link>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/"  @click="handleLogout">Logout</a>
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
import { IsUserLogged, LogOutUser } from './api-helpers/AuthHelper';

const router = useRouter();
const route = useRoute();

let isAuthenticated = ref(false);

const checkAuthStatus = () => {
  isAuthenticated.value = IsUserLogged();
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