<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

import { Icon } from '@iconify/vue';
import 'bootstrap/dist/css/bootstrap.min.css';
DataTable.use(DataTablesCore);

const columns = [
  { data: 'id' },
  { data: 'name' },
  { data: 'phone' },
  { data: 'city' },
  { data: 'lastvisit' },
  { render: function (data, type, row) {
      return '<button @click="handleButtonClick(item)" class="btn btn-light">View more</button>';
    }
  }
];
</script>

<template>
  <div class="container">
    <h1>New York Campaing</h1>

    <DataTable
        :columns="columns"
        ajax="/data.json"
        class="table table-hover table-striped"
    >
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Phone</th>
        <th>City</th>
        <th>Last Visit</th>
        <th>Option</th>
      </tr>
      </thead>
    </DataTable>
  </div>
</template>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';

.container{
  width: 300%;
}
</style>
