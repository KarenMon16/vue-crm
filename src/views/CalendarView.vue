<template>
  <div class="container">
    <h1>Citas agendadas</h1>
    <div class="row align-items-center mb3">
      <!-- Seller Selector Dropdown -->
        <select v-model="selectedSellerId" class="form-select" style="width: auto;" @change="onSellerChange">
          <option v-for="seller in sellers" :key="seller.id" :value="seller.id">{{ seller.name }} - {{seller.company_name}}</option>
        </select>
      </div>
    <div class="bottom-div">
      <Month :selectedSellerId="selectedSellerId"/>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Month from "@/components/Month.vue";

// Define reactive data properties
const selectedSellerId = ref(null);
const sellers = ref([]);

// Function to fetch sellers from the backend
const fetchSellers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/sellers/all?id=1');
    sellers.value = response.data;
    if (sellers.value.length > 0) {
      selectedSellerId.value = sellers.value[0].id; // Set the default selected seller
    }
  } catch (error) {
    console.error('Error fetching sellers:', error);
  }
};

// Call the fetchSellers function on component load
onMounted(() => {
  fetchSellers();
});

const onSellerChange = () => {
  // This function can be used to handle any logic needed when the selected seller changes
};
</script>

<style scoped>
.container {
  padding-left: 150px;
  width: 1600px; /* Set a static width */
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
