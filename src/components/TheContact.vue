<template>
  <div>
    <h2>Contact Details</h2>
    <div v-if="!editing">
      <p><strong>ID:</strong> {{ contact.id }}</p>
      <p><strong>Name:</strong> {{ contact.name }}</p>
      <p><strong>Phone:</strong> {{ contact.phone }}</p>
      <p><strong>Job:</strong> {{ contact.job }}</p>
      <p><strong>Marital Status:</strong> {{ contact.marital }}</p>
      <p><strong>Address:</strong> {{ contact.address }}</p>
      <p><strong>Description:</strong> {{ contact.description }}</p>
      <p><strong>Last Visit:</strong> {{ contact.lastvisit }}</p>
      <p><strong>Last Call:</strong> {{ contact.lastcall }}</p>
      <div>
        <button class="btn btn-light">Back</button>
        <button @click="toggleEdit" class="btn btn-info">Edit</button>
      </div>

    </div>
    <div v-else>
      <input type="text" v-model="editedContact.name" placeholder="Name">
      <input type="text" v-model="editedContact.phone" placeholder="Phone">
      <input type="text" v-model="editedContact.job" placeholder="Job">
      <input type="text" v-model="editedContact.marital" placeholder="Marital Status">
      <input type="text" v-model="editedContact.address" placeholder="Address">
      <textarea v-model="editedContact.description" placeholder="Description"></textarea>
      <input type="text" v-model="editedContact.lastVisit" placeholder="Last Visit">
      <input type="text" v-model="editedContact.lastCall" placeholder="Last Call">
      <div>
        <button @click="saveChanges" class="btn btn-info">Save</button>
        <button @click="cancelEdit" class="btn btn-light">Cancel</button>
      </div>

    </div>
  </div>
</template>

<script>
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
      this.$emit('update-contact', this.editedContact);
      this.editing = false;
    },
    cancelEdit() {
      this.editing = false;
    }
  }
};
</script>

<style scoped>
/* Add component-specific styles here */
textarea {
  width: 100%;
  height: 100px;
}
</style>
