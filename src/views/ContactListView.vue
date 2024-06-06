<template>
  <div class="container">
    <h1>Contact List</h1>

    <div class="container">
      <!-- Seller Selector Dropdown -->
      <div>
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
        <th class="small-column">Id</th>
        <th class="wider-column">Name</th>
        <th class="wider-column">City</th>
        <th class="medium-column">Civil Status</th>
        <th class="medium-column">Job</th>
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

DataTable.use(DataTablesCore);

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
      { title: 'Last Call', data: 'last_call', render: (data) => formatDate(data) },
      { title: 'Last Visit', data: 'last_visit', render: (data) => formatDate(data) },
      {
        title: 'Option', data: null, render: (data, type, row) => {
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

    const fetchLastVisit = async (contactId) => {
      try {
        const response = await axios.get(`http://localhost:8080/appointments/contact?id=${contactId}`);
        const appointments = response.data;
        console.log("Appointments for contact ID", contactId, appointments);
        const lastAppointment = appointments[appointments.length - 1];
        return lastAppointment ? lastAppointment.visit_date : null;
      } catch (error) {
        console.error("Error fetching last visit date:", error);
        return null;
      }
    };

    const fetchLastCall = async (contactId) => {
      try {
        const response = await axios.get(`http://localhost:8080/calls/contact?id=${contactId}`);
        const calls = response.data;
        console.log("Calls for contact ID", contactId, calls);
        const lastCall = calls[0]; // Assuming the list is sorted by date and the first call is the latest
        return lastCall ? lastCall.called_at : null;
      } catch (error) {
        console.error("Error fetching last call date:", error);
        return null;
      }
    };

    const fetchContacts = async () => {
      if (selectedSellerId.value) {
        try {
          const response = await axios.get(`http://localhost:8080/contacts/seller?id=${selectedSellerId.value}`);
          const contacts = response.data;

          // Fetch last visit and last call date for each contact
          const updatedContacts = await Promise.all(contacts.map(async (contact) => {
            const lastVisitDate = await fetchLastVisit(contact.id);
            const lastCallDate = await fetchLastCall(contact.id);
            contact.last_visit = formatDate(lastVisitDate);
            contact.last_call = formatDate(lastCallDate);
            return contact;
          }));

          // Log the response
          console.log("Contacts from backend:", updatedContacts);

          // Update dataTableData with new contacts
          dataTableData.value = updatedContacts;

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
    const formatDate = (datetime) => {
      if (!datetime) return 'None yet';
      const date = new Date(datetime);
      if (isNaN(date)) return 'None yet';
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
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
<style scoped>
@import 'datatables.net-bs5';
.container {
  padding-left: 100px;
  width: 1600px; /* Set a static width */
  position: relative; /* Ensure positioning context for absolute positioning */
}
.wider-column {
  width: 180px; /* Adjust the width as needed */
}
.medium-column {
  width: 130px; /* Adjust the width as needed */
}
.small-column {
  width: 50px; /* Adjust the width as needed */
}
</style>
