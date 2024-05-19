<template>
  <div class="phone-section">
    <h2>Phone Numbers</h2>
    <button @click="addNewPhone" class="btn-secondary">Add New Phone</button>
    <div class="phone-list">
      <div v-for="phone in phones" :key="phone.id" class="phone-card">
        <div class="phone-info">
          <p><strong>Number:</strong> {{ phone.number }}</p>
          <p><strong>Description:</strong> {{ phone.type }}</p>
        </div>
        <div class="button-group">
          <button @click="editPhone(phone)" class="btn-primary">Edit</button>
          <button @click="deletePhone(phone.id)" class="btn-secondary">Delete</button>
        </div>
      </div>
    </div>

    <!-- Phone Form Modal -->
    <div v-if="editingPhone || addingPhone" class="modal">
      <div class="modal-content">
        <h3>{{ editingPhone ? 'Edit Phone' : 'Add New Phone' }}</h3>
        <div class="form-group">
          <label>Number:</label>
          <input type="text" v-model="currentPhone.number" class="form-control">
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input type="text" v-model="currentPhone.type" class="form-control">
        </div>
        <div class="button-group">
          <button @click="savePhone" class="btn-primary">Save</button>
          <button @click="cancelEditPhone" class="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  props: {
    contactId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      phones: [],
      editingPhone: false,
      addingPhone: false,
      currentPhone: { id: null, number: '', type: '' }
    };
  },
  created() {
    this.fetchPhones();
  },
  methods: {
    fetchPhones() {
      axios.get(`http://localhost:8080/phone/all?id=${this.contactId}`)
          .then(response => {
            this.phones = response.data;
          })
          .catch(error => {
            console.error("There was an error fetching the phone numbers:", error);
          });
    },
    editPhone(phone) {
      this.currentPhone = { ...phone };
      this.editingPhone = true;
      this.addingPhone = false;
    },
    addNewPhone() {
      this.currentPhone = {id: null, id_contact: this.contactId, number: '', type: '' };
      this.editingPhone = false;
      this.addingPhone = true;
    },
    savePhone() {
      const payload = {
        ...this.currentPhone,
        contact_id: this.contactId,
      };

      if (payload.id !== null) {
        payload.id = parseInt(payload.id, 10);
      }

      if (this.editingPhone) {
        axios.put(`http://localhost:8080/phone/${payload.id}`, payload)
            .then(() => {
              this.fetchPhones();
              this.editingPhone = false;
            })
            .catch(error => {
              console.error("There was an error updating the phone:", error);
            });
      } else if (this.addingPhone) {
        delete payload.id;
        axios.post('http://localhost:8080/phone', payload)
            .then(() => {
              this.fetchPhones();
              this.addingPhone = false;
            })
            .catch(error => {
              console.error("There was an error adding the phone:", error);
            });
      }
    },
    cancelEditPhone() {
      this.editingPhone = false;
      this.addingPhone = false;
    },
    deletePhone(id) {
      if (confirm("Are you sure you want to delete this phone number?")) {
        axios.delete(`http://localhost:8080/phone?id=${id}`)
            .then(() => {
              this.fetchPhones();
            })
            .catch(error => {
              console.error("There was an error deleting the phone number:", error);
            });
      }
    }
  }
};
</script>
<style scoped>
.phone-section {
  padding: 20px;
  border-radius: 8px;
}

h2 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.phone-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.phone-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.phone-info {
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.btn-primary, .btn-secondary {
  flex: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
