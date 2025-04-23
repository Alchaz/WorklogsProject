<template>
    <div class="container my-4">
      <h2 class="mb-3">Worklogs</h2>
  
      <div class="d-flex justify-content-between align-items-center mb-3">
        <select class="form-select w-auto"  v-model="filterType" @change="changeFilter()">
          <option value="All">All</option>
          <option value="UT">Undertime (UT)</option>
          <option value="OT">Overtime (OT)</option>
        </select>
      </div>
  

      <table class="table table-bordered">
        <thead>
          <tr>
            <th v-if="isAdmin">User</th>
            <th>Date</th>
            <th>Total Hours</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in pagedData" :key="group.date">
            <td v-if="isAdmin">{{ group.user }}</td>
            <td>{{ group.date }}</td>
            <td>{{ group.totalHours }} hrs</td>
            <td>
              <span v-if="group.status" class="badge bg-secondary">{{ group.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      
    
    <!--
       <div v-for="group in pagedData" :key="group.date" class="mb-4 border p-3 rounded">
        <div class="d-flex justify-content-between">
          <h5>{{ group.date }} - {{ group.user }}</h5>
          <span>
            {{ group.totalHours }} hrs
            <span v-if="group.status" class="badge bg-secondary ms-2">{{ group.status }}</span>
          </span>
        </div>
        <ul class="list-group mt-2">
          <li v-for="entry in group.entries" :key="entry.id" class="list-group-item">
            {{ entry.description }} — {{ entry.workedHours }} hrs
          </li>
        </ul>
      </div>
  -->

      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
import { GetUserLogged } from '@/api-helpers/AuthHelper';
import { UserRoleEnum } from '@/helpers/Enums';

import axios from 'axios';

  export default {
    data() {
      return {
        rawApiData: [], 
        filterType: 'All',
        pageSize: 5,
        currentPage: 1,
        isAdmin: false,
        totalPages: 0
      };
    },
    created() {
      this.fetchData();
    },
    computed: {
      flatData() {
        return this.rawApiData.flat();
      },
      groupedData() {
        const grouped = {};
  
        this.flatData.forEach((entry) => {
          if (!grouped[entry.date]) grouped[entry.date] = [];
          grouped[entry.date].push(entry);
        });
  
          const result = Object.entries(grouped).map(([date, items]) => {
          const total = items.reduce((sum, e) => sum + e.workedHours, 0);
          const user = items[0].user;
          let label = '';
          if (total < user.dailyMinHours) label = 'UT';
          else if (total > user.dailyMaxHours) label = 'OT';
  
          return {
            date,
            totalHours: total,
            status: label,
            user: user.name,
            entries: items,
          };
        });
  
        return result.sort((a, b) => new Date(b.date) - new Date(a.date));
      },
        filteredData() {
        return this.groupedData;
      },
      pagedData() {
        return this.filteredData;
      },
    },
    methods: {
      changePage(newPage) {
        if (newPage >= 1 && newPage <= this.totalPages) {
          this.currentPage = newPage;
          this.fetchData();
        }
      },
      changeFilter() {
          this.fetchData();
      },
      async fetchData() {
        
        try {
                const token = GetUserLogged().Token;
                const response = await axios.get('https://localhost:7155/Worklog', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },params: {
                filter: this.filterType === 'All' ? 'ALL' : this.filterType,
                page: this.currentPage,
                pageSize: this.pageSize
                }
                }); 
                console.log(response.data);
                this.rawApiData =  response.data.worklogs
                this.isAdmin = GetUserLogged().Role== UserRoleEnum.Admin;
                this.totalPages = response.data.totalPages;
              } catch (err) 
              {
                  console.log(err);
              }
      },
    },
  };
  </script>
  