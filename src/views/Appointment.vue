<template>
  <div>
    <button @click="openModal">Open Modal</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close">New appointment</span>

        <!-- Form fields -->
        <div class="form-group">
          <label>Name:</label>
          <br/>
          <input type="text" v-model="formData.name" class="form-control soft-border">
        </div>
        <div class="form-group">
          <label>Address:</label><br/>
          <input type="text" v-model="formData.address" class="form-control soft-border">
        </div>
        <div class="form-group">
          <label>Phone:</label><br/>
          <input type="text" v-model="formData.phone" class="form-control soft-border">
        </div>
        <div class="form-group">
          <label>Description:</label><br/>
          <textarea v-model="formData.description" class="form-control soft-border"></textarea>
        </div>
        <div class="form-group">
          <label>Call Details:</label><br/>
          <textarea v-model="formData.callDetails" class="form-control soft-border"></textarea>
        </div>

        <!-- Buttons -->
        <div class="modal-buttons">
          <button @click="closeModal" class="btn btn-light">Cancel</button>
          <button @click="book" class="btn btn-info">Book </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      formData: {
        name: '',
        address: '',
        phone: '',
        job: '',
        maritalStatus: '',
        description: '',
        callDetails: ''
      }
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    book() {
      // Handle booking action, e.g., submit form data
      console.log('Form Data:', this.formData);
      // Reset form data
      this.formData = {
        name: '',
        address: '',
        phone: '',
        job: '',
        maritalStatus: '',
        description: '',
        callDetails: ''
      };
      // Close modal
      this.closeModal();
    }
  }
};
</script>

<style scoped>
/* Modal styling */
.modal {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

/* Form group styling */
.form-group {
  margin-bottom: 1rem;
}

/* Modal buttons */
.modal-buttons {
  text-align: right;
  margin-top: 1rem;
}

.modal-buttons button {
  margin-left: 1rem;
}
</style>
