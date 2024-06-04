<script setup>

import {RouterLink} from "vue-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import IconHome from "@/components/icons/IconHome.vue";
import IconCampaigns from "@/components/icons/IconCampaigns.vue";
import IconContacts from "@/components/icons/IconContacts.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
</script>

<template>
  <div class="msb" id="msb">
    <nav class="container-md">
      <!-- Main Menu -->
      <div class="side-menu-container">
        <ul class="nav navbar-nav">
          <li>Dashboard</li>
          <li><RouterLink to="/">
            <span data-inline="false">
            <IconHome/>
            </span>
            Home</RouterLink>
          </li>
          <li><RouterLink to="/campaings">
            <span data-inline="false">
            <IconCampaigns/>
            </span>
            Campaings</RouterLink>
          </li>
          <li><RouterLink to="/contacts">
            <span data-inline="false">
            <IconContacts/>
            </span>
            Contacts</RouterLink>
          </li>
          <li><RouterLink to="/calendar">
            <span data-inline="false">
            <IconCalendar/>
            </span>
            Calendar</RouterLink></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.msb {

  /* Scoped styles for the dashboard */
  background-color: #f8f9fa;
  padding: 10px;
  box-sizing: border-box;
  /* Ensure there is no additional margin or padding on the outer div */
  margin: 0;
  text-decoration: none;
  align-content: space-between;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: auto;
  min-height: 100%;
  overflow-y: auto;
  white-space: nowrap;
  height: 100%;
  z-index: 1;
  border-right: 1px solid #ddd;
}
.brand-name-wrapper i {
  margin-right: 5px;
}

.navbar-nav {
  width: 100%;
  font-size: 20px;
  padding-top: 20px;
}

.navbar-nav li {
  padding: 20px;
}

.navbar-nav a {
  color: #5f5f5f;
}

@media (min-width: 768px) {
  .msb {
    width: 250px;
  }
}
.side-menu-container{
  padding-top: 35%;
  padding-left: 15%;
}
</style>