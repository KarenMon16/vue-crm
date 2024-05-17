<template>
  <div>
    <h2>Royal Prestige New York SR</h2>
    <br>
    <h4>Description</h4>
    <p>Representative Simon Romero from Royal Prestige is based in NY, available from 8:00 AM to 5:00 PM EST and able to drive to any city in NY</p>
    <br>
    <h4>Scripts</h4>
    <TheSpeech v-for="(speech, index) in speeches" :key="index" :description="speech.title" :speech="speech.speech" />
  </div>
  <div class="back-button-container">
    <button class="btn btn-info" @click="back">Back</button>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios for HTTP requests
import TheSpeech from '@/components/TheSpeech.vue';

export default {
  components: {
    TheSpeech
  },
  data() {
    return {
      speeches: [] // Initialize speeches array to store data from backend
    }
  },
  created() {
    // Fetch data from backend when the component is created
    this.fetchData();
  },
  methods: {
    fetchData() {
      // Make HTTP request to fetch data from backend
      axios.get('http://localhost:8080/speeches/all')
          .then(response => {
            // Process the response data as per your requirements
            this.speeches = response.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    back() {
      // Redirect to /campaigns route
      this.$router.push('/campaings');
    }
  }
}
</script>

<style scoped>
.back-button-container {
  position: fixed;
  bottom: 20px;
  right: 550px;
}
</style>
