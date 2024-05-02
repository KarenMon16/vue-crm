<template>
  <div class="table-container">
    <h2>Contact Details</h2>
    <div v-if="!editing" class="table">
      <p><strong>ID:</strong> {{ contact.id }}</p>
      <p><strong>Name:</strong> {{ contact.name }}</p>
      <p><strong>Phone:</strong> {{ contact.phone }}</p>
      <p><strong>Job:</strong> {{ contact.job }}</p>
      <p><strong>Marital Status:</strong> {{ contact.marital }} </p>
      <p><strong>Address:</strong> {{ contact.address }}</p>
      <p><strong>Description:</strong> {{ contact.description }}</p>
      <p><strong>Last Visit:</strong> {{ contact.lastvisit }}</p>
      <p><strong>Last Call:</strong> {{ contact.lastcall }}</p>
      <div class="buttons">
        <button @click="back" class="btn btn-light">Back</button>
        <button @click="toggleEdit" class="btn btn-info">Edit</button>
      </div>

    </div>
    <div v-else >
      <b> Name: </b> <input type="text" v-model="editedContact.name" placeholder="Name" class="form-control soft-border">
      <br/>
      <b> Phone: </b><input type="text" v-model="editedContact.phone" placeholder="Phone" class="form-control soft-border">
      <br/>
      <b> Job: </b><input type="text" v-model="editedContact.job" placeholder="Job" class="form-control soft-border">
      <br/>
      <b> Marital Status: </b><input type="text" v-model="editedContact.marital" placeholder="Marital Status" class="form-control soft-border">
      <br/>
      <b> Address: </b><input type="text" v-model="editedContact.address" placeholder="Address" class="form-control soft-border">
      <br/>
      <b> Call Description: </b><br><textarea v-model="editedContact.description" placeholder="Description" class="textarea" style="height: 200px;  /* Adjust the height as needed */"></textarea>
      <br/>
      <b> Las Visit: </b><input type="date" v-model="editedContact.lastVisit" placeholder="Last Visit" class="form-control soft-border">
      <br/>
      <b> Lass Call: </b><input type="date" v-model="editedContact.lastCall" placeholder="Last Call" class="form-control soft-border">

      <div class="buttons">
        <button @click="cancelEdit" class="btn btn-light">Cancel</button>
        <button @click="saveChanges" class="btn btn-info">Save</button>
      </div>

    </div>
  </div>
</template>

<script>
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
    toggleEdit() {
      this.editedContact = { ...this.contact };
      this.editing = true;
    },
    saveChanges() {
      this.$router.push('/contacts');
      this.$emit('update-contact', this.editedContact);
      this.editing = false;
    },
    cancelEdit() {
      this.editing = false;
    }
  }
};
</script>

<style>
.table-container {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
.textarea {
  width: 1000px; /* Adjust the width as needed */
  height: 200px; /* Adjust the height as needed */
}
.buttons{
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 20px; /* Space between buttons */
}
</style>
