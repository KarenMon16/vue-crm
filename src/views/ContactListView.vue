<template>
  <div class="container">
    <h1>Contact List</h1>

    <div class="container" >
      <!-- Seller Selector Dropdown -->
      <div >
        <select v-model="selectedSellerId" class="form-select" style="width: auto;">
          <option v-for="seller in sellers" :key="seller.id" :value="seller.id">{{ seller.name }} - {{seller.company_name}}</option>
        </select>
      </div>
    </div>

    <!-- DataTable -->
    <DataTable
        :columns="columns"
        :data="dataTableData"
        class="table table-hover table-striped"
    >
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th class="wider-column">City</th> <!-- Added wider-column class to make the City column wider -->
        <th>Civil Status</th>
        <th class="wider-column">Job</th>
        <th>Last Call</th>
        <th>Last Visit</th>
        <th>Option</th>
      </tr>
      </thead>
    </DataTable>
  </div>
</template>

<script>
import { DataTable } from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, defineComponent, onMounted, watch } from 'vue';
import axios from "axios";
import IconSelect from "@/components/icons/IconSelect.vue";

DataTable.use(DataTablesCore);

export default defineComponent({
  components: {
    DataTable
  },
  setup() {
    const columns = ref([
      {title: 'Id', data: 'id'},
      {title: 'Name', data: 'name'},
      {title: 'City', data: 'city'},
      {title: 'Civil Status', data: 'civil'},
      {title: 'Job', data: 'job'},
      { title: 'Last Call', data: 'last_call', render: function(data, type, row) {
          return formatDate(data);
        }
      },
      { title: 'Last Visit', data: 'last_visit', render: function(data, type, row) {
          return formatDate(data);
        }
      },
      {
        title: 'Option', data: null, render: function (data, type, row) {
          return `<button class="btn btn-light details-button" data-id="${row.id}">Details</button>`;
        }
      }
    ]);

    const id_seller = ref(1);
    const sellers = ref([]);
    const selectedSellerId = ref(localStorage.getItem('selectedSellerId') || null);
    const dataTableData = ref([]);
    const ajaxConfig = ref({
      url: '',
      dataSrc: ''
    });

    const fetchSellers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/sellers/all?id=${id_seller.value}`);
        sellers.value = response.data;
        if (sellers.value.length > 0 && !selectedSellerId.value) {
          selectedSellerId.value = sellers.value[0].id;
        }
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    const fetchContacts = async () => {
      if (selectedSellerId.value) {
        try {
          const response = await axios.get(`http://localhost:8080/contacts/seller?id=${selectedSellerId.value}`);
          const contacts = response.data;

          // Format last_call and last_visit
          contacts.forEach(contact => {
            contact.last_call = formatDate(contact.last_call);
            contact.last_visit = formatDate(contact.last_visit);
          });

          // Log the response
          console.log("Contacts from backend:", contacts);

          // Update dataTableData with new contacts
          dataTableData.value = contacts;

          // Reload DataTable
          const dataTable = refDataTable.value?.DTInstance;
          if (dataTable) {
            dataTable.ajax.url('').load();
          }
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    };

    const reloadDataTable = () => {
      fetchContacts();
    };

    const refDataTable = ref(null);

    onMounted(() => {
      fetchSellers();
      fetchContacts();
    });

    // Watch for changes in selectedSellerId and save to localStorage
    watch(selectedSellerId, (newId) => {
      if (newId !== null) {
        localStorage.setItem('selectedSellerId', newId);
        fetchContacts();
      }
    });

    // Function to format date
    const formatDate = (dateString) => {
      const options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
      return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return {
      columns,
      sellers,
      selectedSellerId,
      ajaxConfig,
      refDataTable,
      dataTableData,
      fetchContacts,
      reloadDataTable
    };
  },
  methods: {
    details(id) {
      this.$router.push('/contact/' + id);
    }
  },
  mounted() {
    const vm = this;
    document.addEventListener('click', function (event) {
      if (event.target && event.target.matches('.details-button')) {
        const id = event.target.getAttribute('data-id');
        vm.details(id);
      }
    });
  }
});
</script>

<style>
@import 'datatables.net-bs5';
.container {
  width: 1200px; /* Set a static width */
  position: relative; /* Ensure positioning context for absolute positioning */
}
.wider-column {
  width: 180px; /* Adjust the width as needed */
}
</style>
