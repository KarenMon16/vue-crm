<script>
import { DataTable } from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, defineComponent } from 'vue';
import axios from "axios";

DataTable.use(DataTablesCore);

const id_seller = 1;

export default defineComponent({
  components: {
    DataTable
  },
  setup() {
    const columns = ref([
      { title: 'Id', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'City', data: 'city' },
      { title: 'Civil Status', data: 'civil' },
      { title: 'Job', data: 'job' },
      { title: 'Last Call', data: 'last_call' },
      { title: 'Last Visit', data: 'last_visit' },
      { title: 'Option', data: null, render: function(data, type, row) {
          return `<button class="btn btn-primary details-button" data-id="${row.id}">Details</button>`;
        }
      }
    ]);

    const ajax = {
      url: `http://localhost:8080/contacts/seller?id=${id_seller}`,
      dataSrc: ''
    };

    return {
      columns,
      ajax
    };
  },
  methods: {
    details(id) {
      this.$router.push('/contact/' + id);
    }
  },
  mounted() {
    const vm = this;
    document.addEventListener('click', function(event) {
      if (event.target && event.target.matches('.details-button')) {
        const id = event.target.getAttribute('data-id');
        vm.details(id);
      }
    });
  }
});
</script>
<template>
  <div class="container">
    <h1>Royal Prestige New York SR</h1>

    <DataTable
        :columns="columns"
        :ajax="ajax"
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
  width: 300%; /* Adjust the width as needed */
}
</style>
