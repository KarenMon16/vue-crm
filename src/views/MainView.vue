<template>
  <div>
    <h1>Campaigns</h1>
    <div class="card-container">
      <CardComponent v-for="campaign in campaigns" :key="campaign.id" :campaign="campaign" class="card" />
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue';

export default {
  components: {
    CardComponent
  },
  data() {
    return {
      campaigns: [
        { id: 1, name: 'Royal Prestige New York SR', description: 'Representative Simon Romero from Royal Prestige is based in NY, available from 8:00 AM to 5:00 PM EST and able to drive to any city in NY' },
        { id: 2, name: 'Royal Prestige Tennesse SL', description: 'Representative Sasha Leblanch from Royal Prestige is based in Tennesse, available from 10:00 AM to 4:00 PM EST and able to drive to any city in TN. ONLY BOOK FAMILIES' },
        { id: 3, name: 'Financial Aid TX', description: 'Company Financial Aid promotes their services to any small companies in Texas, assesments, free consultation, negotiation of debts' },
        { id: 4, name: 'Trihealth agilizer', description: 'Maria Lili offers help to guide non english speaker to fill a trihealth application' }
        // Add more campaigns as needed
      ]
    }
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: 900px;
  margin: 10px;
}
</style>