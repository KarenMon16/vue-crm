<template>
  <div class="container">
    <h1>Appointments</h1>

    <div class="row align-items-center mb-3">
      <!-- Seller Selector Dropdown -->
      <div class="col">
        <select v-model="selectedSellerId" class="form-select" style="width: auto;">
          <option v-for="seller in sellers" :key="seller.id" :value="seller.id">{{ seller.name }}</option>
        </select>
      </div>

      <!-- IconSelect Button to fetch contacts -->
      <div class="col-auto">
        <IconSelect @click="fetchSellers"></IconSelect>
      </div>
    </div>
    <div class="bottom-div">
      Citas agendadas
      <Month/>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Month from "@/components/Month.vue";
import IconSelect from "@/components/icons/IconSelect.vue";

// Define reactive data properties
let selectedSellerId = null;
let sellers = [];

// Function to fetch sellers from the backend
const fetchSellers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/sellers/all?id=1');
    sellers = response.data;
    if (sellers.length > 0) {
      selectedSellerId = sellers[0].id; // Set the default selected seller
    }
  } catch (error) {
    console.error('Error fetching sellers:', error);
  }
};

// Call the fetchSellers function on component load
fetchSellers();
</script>
<style scoped>
.container {
  width: 100%;
  position: relative; /* Ensure positioning context for absolute positioning */
}

.top-div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Take full width of container */
  padding: 20px;
}

.bottom-div {
  margin-top: 50px; /* Add some space so the top div doesn't overlap completely */
  padding: 20px;
  width: 800px;
}
</style>
