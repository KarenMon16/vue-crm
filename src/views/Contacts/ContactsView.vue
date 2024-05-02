
<template>
  <div class="bigDiv">
     <input type="text" v-model="input" placeholder="Search contact..." class="form-control soft-border"/><Icon icon="line-md:image-twotone" />
    <br>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Phone</th>
        <th>City</th>
        <th>Last Visit</th>
        <th > Option</th>
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
import { Icon } from '@iconify/vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  data() {
    return {
      items: [
        { id: 256300, name: 'Erwin Roberts', phone: '631-671-5755', city:'Bay Shore, NY 11706',lastvisit:'September 9, 2013'},
        { id: 526801, name: 'Scarlet White', phone: '516-800-6819', city:'Westbury NY 11590-4477',lastvisit:'August 2, 2013'},
        { id: 526801, name: 'Mary Anne Watson', phone: '631-977-9837', city:'East Hampton, NY 11937-2131',lastvisit:'September 24, 2017'},
        { id: 526801, name: 'Esther Howard', phone: '516-244-6196', city:'East Hampton, NY 11937',lastvisit:'December 29, 2012'},
        { id: 526801, name: 'Ronald Richards', phone: '631-855-5553', city:'Brentwood, NY, 11717-1027',lastvisit:'May 20, 2015'},
        { id: 526801, name: 'Albert Flores', phone: '516-800-6819', city:'Uniondale NY 11553-1925',lastvisit:'May 31, 2015'},
        { id: 526801, name: 'Marvin McKinney', phone: '631-974-7040', city:'Bay Shore, NY 11706',lastvisit:'February 29, 2012'},
        { id: 526801, name: 'Floyd Miles', phone: '516-512-2939', city:'Brentwood, NY, 11717',lastvisit:'October 24, 2018'},
        { id: 526801, name: 'Courtney Henry', phone: '516-938-1200', city:'Brentwood, NY, 11717',lastvisit:'November 7, 2017'},
        { id: 526801, name: 'Guy Hawkins', phone: '631-704-0493', city:'Bay Shore, NY 11706',lastvisit:'May 29, 2017'},
        { id: 526801, name: 'Maria Jose  Smith Mendez', phone: '631-455-6823', city:'Mastic Beach, NY 11951-1706',lastvisit:'July 14, 2015'},
        { id: 526801, name: 'Devon Lane', phone: '631-448-2250', city:'Westbury NY 11590',lastvisit:'December 19, 2013'},
        { id: 526801, name: 'Jenny Wilson', phone: '631-449-6838', city:'Westbury NY 11590',lastvisit:'December 2, 2018'},
        // Add more items as needed
      ]
    };
  },
  methods: {
    handleButtonClick(item) {
      this.$router.push('/contact');
      console.log('Button clicked for item:', item);
    }
  }
};
</script>

<style>
.bigDiv{
  width: 250%;
  overflow-x: auto;
}
.table{
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {

  padding: 8px;
}

.table th {
  font-weight: bold;
}
.table tbody tr:nth-child(even) {
}
/* You can add custom styling for the table here if needed */
</style>
