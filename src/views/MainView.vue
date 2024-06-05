<template>
  <div class="container">
    <h1>Campaigns</h1>
    <div class="card-container">
      <CardComponent v-for="campaign in campaigns" :key="campaign.id" :campaign="campaign" class="card" />
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/CampaingCard.vue';
import axios from 'axios'; // Import Axios for HTTP requests
const id_operator=1;
export default {
  components: {
    CardComponent
  },
  data() {
    return {
      campaigns: []
    }
  },
  async mounted() {
    try {
      // Fetch campaigns from the backend
      const response = await axios.get('http://localhost:8080/sellers/all?id='+id_operator);
      // Assign the fetched campaigns to the data property
      this.campaigns = response.data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  }
}
</script>

<style scoped>


.container {
  padding-left: 100px;
  width: 1600px; /* Set a static width */
  position: relative; /* Ensure positioning context for absolute positioning */
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: 900px;
  margin: 10px;
}
</style>
