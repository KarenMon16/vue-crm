<template>
  <h2>Addresses</h2>
  <button @click="addNewAddress" class="btn-secondary">Add New Address</button>
  <br>
  <div class="address-section">
      <div v-for="address in addresses" :key="address.id" class="address-card">
        <div class="address-info">
          <p><strong>Address:</strong> {{ address.address }}</p>
          <p><strong>Zip Code:</strong> {{ address.zip_code }}</p>
          <p><strong>Type:</strong> {{ address.type }}</p>
        </div>
        <div class="button-group">

          <IconEdit style = "color:#050f1a;" @click="editAddress(address)">Edit</IconEdit>
          <IconTrash  @click="deleteAddress(address.id)"> </IconTrash>
          <!--
          <button @click="editAddress(address)" class="btn-primary">Edit</button>
          <button @click="deleteAddress(address.id)" class="btn-secondary">Delete</button>
          -->
        </div>
    </div>

    <!-- Address Form Modal -->
    <div v-if="editingAddress || addingAddress" class="modal">
      <div class="modal-content">
        <h3>{{ editingAddress ? 'Edit Address' : 'Add New Address' }}</h3>
        <div class="form-group">
          <label>Address:</label>
          <input type="text" v-model="currentAddress.address" class="form-control">
        </div>
        <div class="form-group">
          <label>Zip Code:</label>
          <input type="text" v-model="currentAddress.zip_code" class="form-control">
        </div>
        <div class="form-group">
          <label>Type:</label>
          <input type="text" v-model="currentAddress.type" class="form-control">
        </div>
        <div class="button-group">
          <button @click="saveAddress" class="btn-primary">Save</button>
          <button @click="cancelEditAddress" class="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import IconTrash from "@/components/icons/IconTrash.vue";
import IconEdit from "@/components/icons/IconEdit.vue";

export default {
  components: {IconEdit, IconTrash},
  props: {
    contactId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      addresses: [],
      editingAddress: false,
      addingAddress: false,
      currentAddress: { id: null, address: '', zip_code: '', type: '' }
    };
  },
  created() {
    this.fetchAddresses();
  },
  methods: {
    fetchAddresses() {
      axios.get(`http://localhost:8080/addresses/all?id=${this.contactId}`)
          .then(response => {
            this.addresses = response.data;
          })
          .catch(error => {
            console.error("There was an error fetching the addresses:", error);
          });
    },
    editAddress(address) {
      this.currentAddress = { ...address };
      this.editingAddress = true;
      this.addingAddress = false;
    },
    addNewAddress() {
      this.currentAddress = { id: null, id_contact: this.contactId,address: '', zip_code: '',type: '' };
      this.editingAddress = false;
      this.addingAddress = true;
    },
    saveAddress() {
      const payload = {
        ...this.currentAddress,
        contact_id: this.contactId,
      };

      // Ensure id is an integer or null
      if (payload.id !== null) {
        payload.id = parseInt(payload.id, 10);
      }

      if (this.editingAddress) {
        axios.put(`http://localhost:8080/addresses/${payload.id}`, payload)
            .then(() => {
              this.fetchAddresses();
              this.editingAddress = false;
            })
            .catch(error => {
              console.error("There was an error updating the address:", error);
            });
      } else if (this.addingAddress) {
        // Remove id from payload when adding a new address
        delete payload.id;
        axios.post('http://localhost:8080/addresses', payload)
            .then(() => {
              this.fetchAddresses();
              this.addingAddress = false;
            })
            .catch(error => {
              console.error("There was an error adding the address:", error);
            });
      }
    },
    cancelEditAddress() {
      this.editingAddress = false;
      this.addingAddress = false;
    },
    deleteAddress(id) {
      if (confirm("Are you sure you want to delete this address?")) {
        axios.delete(`http://localhost:8080/addresses?id=`+id)
            .then(() => {
              this.fetchAddresses();
            })
            .catch(error => {
              console.error("There was an error deleting the address:", error);
            });
      }
    }
  }
};
</script>

<style scoped>
.address-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 10px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}
.address-card {
  border: 1px solid #ddd;
  border-radius: 4px;
}
.address-info {
  padding: 10px;
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
  gap: 10px;
}

.button-group button {
  flex: 1;
}
.btn-primary, .btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #333;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>
