<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Book an Appointment</h2>
      <form @submit.prevent="bookAppointment">
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" v-model="appointment.date" id="date" required>
        </div>
        <div class="form-group">
          <label for="hour">Hour:</label>
          <input type="time" v-model="appointment.hour" id="hour" required>
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <select v-model="appointment.address" id="address">
            <option v-for="address in addresses" :key="address.id" :value="address.id">{{ address.name }}</option>
            <option value="">Other</option>
          </select>
          <input v-if="appointment.address === ''" type="text" v-model="appointment.otherAddress" placeholder="Enter address">
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="appointment.description" id="description" required></textarea>
        </div>
        <div class="modal-buttons">
          <button type="button" @click="closeModal" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Book</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    showModal: Boolean,
    contactId: String
  },
  data() {
    return {
      addresses: [],
      appointment: {
        date: '',
        hour: '',
        address: '',
        otherAddress: '',
        description: ''
      }
    };
  },
  watch: {
    showModal(newVal) {
      if (newVal) {
        this.fetchAddresses();
      }
    }
  },
  methods: {
    fetchAddresses() {
      // Fetch the addresses
      axios.get('http://localhost:8080/addresses') // Adjust URL as necessary
          .then(response => {
            this.addresses = response.data;
          })
          .catch(error => {
            console.error("There was an error fetching the addresses:", error);
          });
    },
    closeModal() {
      this.$emit('update:showModal', false);
    },
    bookAppointment() {
      // Handle booking logic here
      console.log('Appointment booked:', this.appointment);
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  margin: auto;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close {
  color: #aaa;
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: calc(100% - 20px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-buttons .btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.modal-buttons .btn-primary {
  background-color: #007bff;
  color: #fff;
}

.modal-buttons .btn-primary:hover {
  background-color: #0056b3;
}

.modal-buttons .btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.modal-buttons .btn-secondary:hover {
  background-color: #5a6268;
}
</style>
