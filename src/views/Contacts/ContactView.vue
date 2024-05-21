<template>
  <div class="bigDiv">
    <PersonalInfo :person="selectedContact"/>
    <AddressList :contact-id="id"/>
    <PhoneList :contact-id="id"/>
    <div class="button-group">
      <button @click="back" class="btn btn-dark">Back</button>
      <button @click="openModal" class="btn btn-success">Call</button>
    </div>

    <!-- Call Modal Component -->
    <CallModal :showModal.sync="showModal" :contactId="id"/>
  </div>
</template>

<script>
import axios from 'axios';
import PersonalInfo from "@/components/PersonalInfo.vue";
import AddressList from "@/components/AddressList.vue";
import PhoneList from "@/components/PhoneList.vue";
import CallModal from "@/components/CallModal.vue";

export default {
  components: {
    PhoneList,
    AddressList,
    PersonalInfo,
    CallModal
  },
  props: ['id'],
  data() {
    return {
      selectedContact: null,
      showModal: false
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
  },
  methods: {
    back() {
      this.$router.push('/contacts');
    },
    openModal() {
      this.showModal = true;
    }
  }
};
</script>

<style scoped>
.bigDiv {
  width: 300%;
  overflow-x: auto;
  position: relative;
}

.button-group {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}
</style>
