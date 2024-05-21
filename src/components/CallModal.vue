<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Register a Call</h2>
      <form @submit.prevent="saveCall">
        <div class="form-group">
          <label>Date and Time:</label>
          <p>{{ formattedDate }}</p>
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="description" id="description" required></textarea>
        </div>
        <div class="modal-buttons">
          <button type="submit" class="btn btn-primary">Save</button>
          <button type="button" @click="bookAppointment" class="btn btn-success">Book</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    contactId: String
  },
  data() {
    return {
      description: '',
      currentDate: new Date()
    };
  },
  computed: {
    formattedDate() {
      return this.currentDate.toLocaleString();
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:showModal', false);
    },
    saveCall() {
      // Handle saving the call log
      const callDetails = {
        contactId: this.contactId,
        date: this.currentDate,
        description: this.description
      };
      console.log('Call saved:', callDetails);
      this.closeModal();
    },
    bookAppointment() {
      // Redirect to the CalendarView
      this.$router.push('/calendar');
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

.form-group p {
  font-size: 16px;
  color: #333;
}

.form-group textarea {
  width: calc(100% - 20px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
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

.modal-buttons .btn-success {
  background-color: #28a745;
  color: #fff;
}

.modal-buttons .btn-success:hover {
  background-color: #218838;
}
</style>
