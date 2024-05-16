<template>
  <div class="bigDiv">
    <contact-information :contact="selectedContact" />
  </div>
</template>

<script>
import ContactInformation from '@/components/TheContact.vue';
import axios from 'axios';

export default {
  components: {
    ContactInformation
  },
  data() {
    return {
      selectedContact: null
    };
  },
  mounted() {
    this.fetchSelectedContact();
  },
  methods: {
    async fetchSelectedContact() {
      try {
        // Make a GET request to your backend endpoint to fetch the selected contact data
        const response = await axios.get('/api/contacts/selected');
        // Assuming your backend returns the contact data in the response.data property
        this.selectedContact = response.data;
      } catch (error) {
        console.error('Error fetching selected contact:', error);
      }
    }
  }
};
</script>

<style>
.bigDiv {
  width: 190%;
  overflow-x: auto;
}
</style>
