<script setup>
import { RouterView } from 'vue-router';
import Dashboard from "@/components/Dashboard.vue";
</script>

<template>
  <div class="layout">
    <div class="dashboard-container">
      <Dashboard />
    </div>
    <div class="view-container">
      <RouterView />
    </div>
  </div>
</template>
<style scoped>
.layout {
  display: flex;
  height: calc(100vh - 10px); /* Make the layout take full viewport height minus the top space */
  padding-top: 20px; /* Add space on top */
}


.view-container {
  flex-grow: 1; /* Make the view container take the remaining space */
  padding: 20px; /* Add padding around the view container */
  overflow-y: auto; /* Allow scrolling if the content is taller than the viewport */
}
</style>
