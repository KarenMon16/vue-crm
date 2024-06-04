<template>
  <div class="info-section">
    <div v-if="editing" class="info-edit" >
      <div class="form-group">
        <label>ID:</label>
        <input type="text" v-model="currentPerson.id" class="form-control" readonly>
      </div>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" v-model="currentPerson.name" class="form-control">
      </div>
      <div class="form-group">
        <label>City:</label>
        <input type="text" v-model="currentPerson.city" class="form-control">
      </div>
      <div class="form-group">
        <label>Civil Status :</label>
        <input type="text" v-model="currentPerson.civil" class="form-control">
      </div>
      <div class="form-group">
        <label>Job:</label>
        <input type="text" v-model="currentPerson.job" class="form-control">
      </div>
      <div class="button-group">
        <IconSave @click="savePerson"></IconSave>
        <IconCancel @click="cancelEdit"></IconCancel>
        <!--
        <button @click="cancelEdit" class="btn-secondary">Cancel</button>
        <button @click="savePerson" class="btn-primary">Save</button>
        -->
      </div>
    </div>
    <div v-else class="info-display">
      <p><strong>ID:</strong> {{ person.id }}</p>
      <p><strong>Name:</strong> {{ person.name }}</p>
      <p><strong>City:</strong> {{ person.city }}</p>
      <p><strong>Job:</strong> {{ person.job }}</p>
      <p><strong>Civil Status:</strong> {{ person.civil }}</p>
      <IconEdit @click="editPerson">Edit</IconEdit>
      <!--
      <button @click="editPerson" class="btn-primary">Edit</button>
      -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import IconEdit from "@/components/icons/IconEdit.vue";
import IconSave from "@/components/icons/IconSave.vue";
import IconCancel from "@/components/icons/IconCancel.vue";

export default {
  components: {IconCancel, IconSave, IconEdit},
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      currentPerson: { ...this.person }
    };
  },
  methods: {
    editPerson() {
      this.currentPerson = {...this.person};
      this.editing = true;
    },
    savePerson() {
      axios.put(`http://localhost:8080/contacts/${this.person.id}`, this.currentPerson)
          .then(response => {
            // Update the person object directly to reflect changes immediately
            Object.assign(this.person, response.data);
            this.editing = false;
          })
          .catch(error => {
            console.error("There was an error updating the personal info:", error);
          });
    },
    cancelEdit() {
      this.editing = false;
    }
  }
};
</script>

<style scoped>
.info-section {
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

.info-display p {
  margin: 10px 0;
}

.info-edit .form-group {
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
