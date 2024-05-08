<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ campaign.name }}</h5>
      <p class="card-text">{{ campaign.description }}</p>
      <button @click="redirectToMoreInfo" class="btn btn-light">See More</button>
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
      window.location.href = '/more-info/' + this.campaign.id;
    }
  }
}
</script>