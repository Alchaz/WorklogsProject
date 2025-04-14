
<template>
    <div class="container mt-5">
      <h2 class="mb-4 text-center">Worklogs</h2>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#createWorklogModal">
      Add Worklog
    </button>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>Worked Hours</th>
            <th>Set Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log) in worklogs" :key="log.id">
            <td>{{ log.description }}</td>
            <td>{{ log.date }}</td>
            <td>{{ log.workedHours }}</td>
            <td>
              <input v-model="log.newWorkedHours" type="number" class="form-control" min="0" />
            </td>
            <td>
              <button class="btn btn-sm btn-success" @click="saveHours(log)">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
      <CreateWorklogModal @created="loadWorklogs" />
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { GetUserLogged } from '@/api-helpers/AuthHelper';
import CreateWorklogModal from '@/components/CreateWorklogModal.vue';
  
  const worklogs = ref([]);
  const error = ref('');
  
  const loadWorklogs = async () => {
    try {
      const token = GetUserLogged().Token;
      const response = await axios.get('https://localhost:7155/Worklog', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); 
    const flatArray = response.data.flat();
      worklogs.value = flatArray.map(log => ({
        ...log,
        newWorkedHours: log.workedHours
      }));
    } catch (err) {
      error.value = 'Failed to load worklogs.';
    }
  };
  
  const saveHours = async (log) => {
    try {
        const token = GetUserLogged().Token;
      await axios.patch(`https://localhost:7155/Worklog/${log.id}`, {
         workedHours: log.newWorkedHours
      }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      log.workedHours = log.newWorkedHours;
    } catch (err) {
      error.value = 'Failed to update worklog.';
    }
  };
  
  onMounted(loadWorklogs);
  </script>