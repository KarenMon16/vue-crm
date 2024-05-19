<template>
  <div class="table-container">
    <h2>Contact Details</h2>
    <div v-if="!editing" class="table">
      <p><strong>ID:</strong> {{ contact.id }}</p>
      <p><strong>Name:</strong> {{ contact.name }}</p>
      <p><strong>Address:</strong> {{ contact.address }}</p>
      <p><strong>Phone:</strong> {{ contact.phone }}</p>
      <p><strong>Job:</strong> {{ contact.job }}</p>
      <p><strong>Marital Status:</strong> {{ contact.civil }}</p>
      <p><strong>Last Visit:</strong> {{ contact.last_visit }}</p>
      <p><strong>Last Call:</strong> {{ contact.last_call }}</p>
      <div class="buttons">
        <button @click="back" class="btn btn-secondary">Back</button>
        <button @click="toggleEdit" class="btn btn-primary">Edit</button>
      </div>
    </div>
    <div v-else class="edit-form">
      <div class="form-group">
        <label><b>Name:</b></label>
        <input type="text" v-model="editedContact.name" placeholder="Name" class="form-control">
      </div>
      <div class="form-group">
        <label><b>Address:</b></label>
        <input type="text" v-model="editedContact.address" placeholder="Address" class="form-control">
      </div>
      <div class="form-group">
        <label><b>Phone:</b></label>
        <input type="text" v-model="editedContact.phone" placeholder="Phone" class="form-control">
      </div>
      <div class="form-group">
        <label><b>Job:</b></label>
        <input type="text" v-model="editedContact.job" placeholder="Job" class="form-control">
      </div>
      <div class="form-group">
        <label><b>Marital Status:</b></label>
        <input type="text" v-model="editedContact.civil" placeholder="Marital Status" class="form-control">
      </div>
      <div class="form-group">
        <label><b>Last Visit:</b></label>
        <input type="date" v-model="editedContact.last_visit" class="form-control">
      </div>
      <div class="form-group">
        <label><b>Last Call:</b></label>
        <input type="date" v-model="editedContact.last_call" class="form-control">
      </div>
      <div class="buttons">
        <button @click="cancelEdit" class="btn btn-secondary">Cancel</button>
        <button @click="saveChanges" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      editedContact: { ...this.contact }
    };
  },
  methods: {
    back() {
      this.$router.push('/contacts');
    },
    toggleEdit() {
      this.editedContact = { ...this.contact };
      this.editing = true;
    },
    cancelEdit() {
      this.editing = false;
      this.$router.push('/contact/' + id);
    },
    saveChanges() {
      axios.put(`http://localhost:8080/contacts/${this.contact.id}`, this.editedContact)
          .then(response => {
            alert('Contact updated successfully!');
            this.$router.push(`/contacts/${this.contact.id}`);
          })
          .catch(error => {
            console.error("There was an error updating the contact:", error);
            alert('Failed to update contact.');
          });
    }
  }
};
</script>
<style>
.table-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.contact-info p, .edit-form .form-group {
  margin: 10px 0;
  font-size: 16px;
}

.edit-form .form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.edit-form .form-group input, .edit-form .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.edit-form .form-group textarea {
  resize: vertical;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
