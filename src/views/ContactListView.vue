<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
DataTable.use(DataTablesCore);

const columns = [
  { data: 'id' },
  { data: 'name' },
  { data: 'phone' },
  { data: 'city' },
  { data: 'lastvisit' },  {
    render: function (data, type, row) {
      return '<button @click="handleButtonClick(item)" class="btn btn-light">...</button>';
    }
  }
];

</script>

<template>
  <div class="container">
    <h1>Royal Prestige New York SR</h1>

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