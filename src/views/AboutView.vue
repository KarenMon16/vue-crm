<template>
  <div class="about">
  <TheContact contact=""/>
  </div>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script setup>
import Dashboard from "@/App.vue";
import TheContact from "@/components/TheContact.vue";
</script>