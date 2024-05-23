<template>
  <div>
    <h2>{{ selectedContact ? selectedContact.name : 'Loading...' }}</h2>
    <div class="bigDiv">
      <details open>
        <summary>Personal Information</summary>
        <PersonalInfo :person="selectedContact"/>
      </details>
      <details>
        <summary>Address List</summary>
        <AddressList :contact-id="id"/>
      </details>
      <details open>
        <summary>Phone List</summary>
        <PhoneList :contact-id="id"/>
      </details>
      <details>
        <summary>Call History</summary>
        <CallList :contact-id="id"/>
      </details>
      <div class="button-group">
        <button @click="back" class="btn btn-dark">Back</button>
        <IconEdit @click="openModal" />
        <button @click="openCallHistory" class="btn btn-success">Call</button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PersonalInfo from "@/components/PersonalInfo.vue";
import AddressList from "@/components/AddressList.vue";
import PhoneList from "@/components/PhoneList.vue";
import CallModal from "@/components/CallModal.vue";
import CallList from "@/components/CallList.vue";

export default {
  components: {
    CallList,
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
    }
  }
};
</script>

<style scoped>
.bigDiv {
  width: 1200px; /* Set a static width */
  overflow-x: auto;
  position: relative;
  margin: auto; /* Center the div */
  border: 1px solid #fcfcfc; /* Optional: add a border */
  border-radius: 8px; /* Optional: add rounded corners */
  padding: 20px; /* Optional: add padding */
}

details {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

summary {
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
}

.button-group {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.button-group .btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.button-group .btn-dark {
  background-color: #343a40;
  color: #fff;
}

.button-group .btn-dark:hover {
  background-color: #23272b;
}
</style>
