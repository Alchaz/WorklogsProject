<template>


    <div class="container mt-5" style="max-width: 400px;">
      <div class="card p-4 d-flex justify-content-center align-items-center" style="width: 18rem;" >
        <br/>
        <h2 class="mb-4 text-center">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label  class="form-label"  for="user">User</label>
          <input
           class="form-control"
            type="text"
            id="user"
            v-model="form.userName"
            required
            placeholder="Enter your user"
          />
        </div>
      <br/>
      <div class="form-group">
          <label  class="form-label"  >Password</label>
          <input
           class="form-control"
            type="password"
            id="pass"
            placeholder="Enter password"
          />
        </div>
      <br/>
      <div class="text-center">
        <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Logging in...' : 'Login' }}
        </button>
        <br/>
        <br/>
        <router-link to="/About">Help Page</router-link>
      </div>
        <br/>
        <br/>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
    </div>
 
  </template>
  
  <script setup>
  import { LogUser } from '@/api-helpers/AuthHelper';
import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const form = ref({
    userName: ''
  });
   const error = ref('');
  const isSubmitting = ref(false);
  


  const handleSubmit = async () => {
    error.value = '';
    isSubmitting.value = true;
    
    try {
      var loggedUser = await LogUser(form.value.userName,"" );
      if (loggedUser) 
      {
        router.push('/home');
      } else {
        error.value = 'Invalid user';
      }
    } catch (err) {
      error.value = 'An error occurred. Please try again.';
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  
