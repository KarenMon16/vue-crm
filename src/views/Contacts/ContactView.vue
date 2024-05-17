<template>
  <div class="bigDiv">
    <contact-information :contact="selectedContact" />
  </div>

</template>

<script>
import axios from 'axios';
import ContactInformation from '@/components/TheContact.vue';
import App from "@/App.vue";

export default {
  components: {
    App,
    ContactInformation
  },
  props: ['id'],
  data() {
    return {
      selectedContact: null
    };
  },
  created() {
    // Fetch the contact information from the backend using the id prop
    axios.get(`http://localhost:8080/contacts?id=${this.id}`)
        .then(response => {
          this.selectedContact = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the contact information:", error);
        });
  }
};
</script>

<style>
.bigDiv{
  width: 190%;
  overflow-x: auto;
}
</style>