<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
DataTable.use(DataTablesCore);
const id_seller=1;

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};
const columns = [
  { data: 'id' },
  { data: 'name' },
  { data: 'city' },
  { data: 'job' },
  { data: 'civil' },
  { data: 'last_call' },
  { data: 'last_visit' },
  {
    render: function (data, type, row) {
      return '<button class="btn btn-light">...</button>';
    }
  }
];

</script>

<template>
  <div class="container">
    <h1>Royal Prestige New York SR</h1>

    <DataTable
        :columns="columns"
        :ajax="{
          url: 'http://localhost:8080/contacts/seller?id='+id_seller, // URL to fetch data from backend
          dataSrc: '' // If the data source is not nested in an object, set it to empty string
        }"
        class="table table-hover table-striped"
    >
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>City</th>
        <th>Civil Status</th>
        <th>Job</th>
        <th>Last Call</th>
        <th>Last Visit</th>
        <th>Option</th>
      </tr>
      </thead>
    </DataTable>
  </div>
</template>

<style>
@import 'datatables.net-bs5';

.container {
  width: 300%;
}
</style>
