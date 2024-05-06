<template>
  <div class="container">
    <div class="top-div">
      <a>Top Div</a>
    </div>
    <div class="bottom-div">
      Bottom Div
      <Month/>
    </div>
  </div>
</template>
<script setup>

import 'bootstrap/dist/css/bootstrap.min.css';
import Month from "@/components/Month.vue";
</script>
<style scoped>
.container {
  width: 100%;
  position: relative; /* Ensure positioning context for absolute positioning */
}

.top-div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Take full width of container */
  padding: 20px;
}

.bottom-div {
  margin-top: 50px; /* Add some space so the top div doesn't overlap completely */
  padding: 20px;
  width: 800px;
}
</style>