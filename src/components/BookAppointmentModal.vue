<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h2>Book Appointment</h2>
      <form @submit.prevent="saveAppointment">
        <label for="date">Date:</label>
        <input type="date" v-model="appointment.date" required />

        <label for="hour">Hour:</label>
        <input type="time" v-model="appointment.hour" required />

        <label for="address">Address:</label>
        <textarea v-model="appointment.address"></textarea>
        <label for="comment">Comment:</label>
        <textarea v-model="appointment.comment"></textarea>

        <div class="modal-buttons">
          <button type="submit" class="btn-primary">Save</button>
          <button type="button" class="btn-secondary" @click="confirmCancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isVisible: Boolean,
    selectedSellerId:Number,
    contactId: Number,
    operatorId: Number,
    initialComment: String
  },
  data() {
    return {
      appointment: {
        date: '',
        hour: '',
        address: '',
        comment: ''
      },
      addresses: []
    };
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.fetchContactDetails();
        this.appointment.comment = this.initialComment;
      }
    }
  },
  methods: {
    fetchContactDetails() {
      axios.get(`http://localhost:8080/addresses?contactId=${this.contactId}`)
          .then(response => {
            this.addresses = response.data;
          })
          .catch(error => {
            console.error('Error fetching addresses:', error);
          });
    },
    saveAppointment() {
      const visitDate = new Date(`${this.appointment.date}T${this.appointment.hour}`).getTime();
      const newAppointment = {
        id_seller: this.selectedSellerId,
        id_operator: 1,
        id_contact: this.contactId,
        visit_date: visitDate,
        address: this.appointment.address,
        summary: this.appointment.comment
      };
      axios.post('http://localhost:8080/appointments', newAppointment)
          .then(() => {
            this.$emit('close');
          })
          .catch(error => {
            console.error('Error saving appointment:', error);
          });
    },
    confirmCancel() {
      if (confirm('Are you sure you want to cancel?')) {
        this.$emit('close');
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
}

label {
  display: block;
  margin: 10px 0 5px;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
