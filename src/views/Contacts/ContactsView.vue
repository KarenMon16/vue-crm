
<template>
  <div class="bigDiv">
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Phone</th>
        <th>City</th>
        <th>Last Visit</th>
        <th>Option</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.city }}</td>
        <td>{{ item.lastvisit }}</td>
        <td><button @click="handleButtonClick(item)" class="btn btn-light">...</button></td> <!-- Button Column -->
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  data() {
    return {
      items: [
        { id: 256300, name: 'Erwin Roberts', phone: '631-671-5755', city:'Bay Shore, NY 11706',lastvisit:'September 9, 2013'},
        { id: 526801, name: 'Mary Anne Watson', phone: '516-800-6819', city:'Westbury NY 11590-4477',lastvisit:'August 2, 2013'},
        // Add more items as needed
      ]
    };
  },
  methods: {
    handleButtonClick(item) {
      console.log('Button clicked for item:', item);
    }
  }
};
</script>

<style>
.bigDiv{
  padding-left: 111px;
  text-align-all: center;
  width: 75%;
}
/* You can add custom styling for the table here if needed */
</style>
