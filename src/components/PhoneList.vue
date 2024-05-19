<template>
  <div class="phone-section">
    <h2>Phone Numbers</h2>
    <div v-for="phone in phones" :key="phone.id" class="phone-card">
      <p><strong>Number:</strong> {{ phone.number }}</p>
      <p><strong>Description:</strong> {{ phone.type }}</p>
      <button @click="editPhone(phone)" class="btn-primary">Edit</button>
    </div>
    <button @click="addNewPhone" class="btn-secondary">Add New Phone</button>

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
      currentPhone: { id: null, number: '', description: '' }
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
      this.currentPhone = { id: null,id_contact: this.contactId, number: '', description: '' };
      this.editingPhone = false;
      this.addingPhone = true;
    },
    savePhone() {
      if (this.editingPhone) {
        axios.put(`http://localhost:8080/phone/${this.currentPhone.id}`, this.currentPhone)
            .then(response => {
              this.fetchPhones();
              this.editingPhone = false;
            })
            .catch(error => {
              console.error("There was an error updating the phone:", error);
            });
      } else if (this.addingPhone) {
        axios.post('http://localhost:8080/phone', { ...this.currentPhone, contact_id: this.contactId })
            .then(response => {
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
    }
  }
};
</script>

<style scoped>
.phone-section {
  margin-bottom: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.phone-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 10px;
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
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  max-width: 500px;
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

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn-primary, .btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>
