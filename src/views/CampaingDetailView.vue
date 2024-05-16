<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'vue-router';

DataTable.use(DataTablesCore);
const id_seller = 1;
const router = useRouter();

const back = () => {
  router.push('/campaigns');
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
    render: () => {
      return '<button class="btn btn-info" @click="back">Back</button>';
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
          url: 'http://localhost:8080/contacts/seller?id='+id_seller,
          dataSrc: ''
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
