<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ campaign.company_name }}: {{ campaign.name }}</h5>
      <p class="card-text">{{ campaign.overview }}</p>
      <button @click="redirectToMoreInfo" class="btn btn-light">See Speeches</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    campaign: Object
  },
  methods: {
    redirectToMoreInfo() {
      // Redirect to somewhere, replace the URL with your desired destination
      this.$router.push('/campaingDetail');
    },
    updateIdSeller(newId) {
      // Emit an event to update id_seller
      this.$root.$emit('id_seller', newId);
      alert(`id_seller is now ${newId}`); // Show an alert with the new value
    }
  }
}
</script>
