<template>
    <div class="modal fade" id="createWorklogModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="handleSubmit">
            <div class="modal-header">
              <h5 class="modal-title">New Worklog</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
  
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input v-model="worklog.description" type="text" class="form-control" required />
              </div>
  
              <div class="mb-3">
                <label class="form-label">Worked Hours</label>
                <input v-model.number="worklog.workedHours" type="number" step="0.1" class="form-control" required />
              </div>
            </div>
  
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  //import * as bootstrap from 'bootstrap';
import { GetUserLogged } from '@/api-helpers/AuthHelper';

  const worklog = ref({
    description: '',
    date: new Date().toISOString().split('T')[0],
    workedHours: 0,
  
  });
  
  const handleSubmit = async () => {
    try {
        const token = GetUserLogged().Token;
        await axios.post('https://localhost:7155/Worklog', worklog.value,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); 
    window.location.href = '/worklogs';
    //const modal = bootstrap.Modal.getInstance(document.getElementById('createWorklogModal'));
    //modal.hide();
    } catch (err) {
      alert('Error saving worklog.');
    }
  };
  </script>