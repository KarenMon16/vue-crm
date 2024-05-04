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
  { data: 'salary' },
];
</script>

<template>
  <div class="container">
    <h1>New York Campaing</h1>

    <DataTable
        :columns="columns"
        ajax="/data.json"
        class="table table-hover table-striped"
        width="100%"
    >
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Phone</th>
        <th>City</th>
        <th>Last Visit</th>
        <th>Salary</th>
      </tr>
      </thead>
    </DataTable>
  </div>
</template>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';

.container{
  width: 250%;
}
</style>
