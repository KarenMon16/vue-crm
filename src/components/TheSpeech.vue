<!-- TheSpeech.vue -->
<template>
  <div class="speech-card">
    <h4>{{ description }}</h4>
    <p class="speech">{{ speech  }}</p>
  </div>
</template>

<script>
export default {
  props: {
    description: String,
    speech: String
  }
}
</script>

<style scoped>
.speech-card {
  background-color: #ffffff;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 1000px;
}

.speech {
  font-size: 16px;
  line-height: 1.6;
  color: #333333;
}
</style>
