<template>
  <div class="bigDiv">
    <contact-information :contact="selectedContact" />
  </div>

</template>

<script>
import ContactInformation from '../../components/TheContact.vue';
import App from "@/App.vue";

export default {
  components: {
    App,
    ContactInformation
  },
  data() {
    return {
      selectedContact: {
        id: '256300',
        name: 'Erwin Roberts',
        phone: '631-671-5755',
        job: 'Unknown',
        marital: 'Married, Julia Smith',
        products:'Stove, paella, water filter',
        address:'17 Oakland Ave Bay Shore NY 11706-8006',
        description:'Mr. Erwin works from Monday to Friday, he’s married and Miss Julia is the one ' +
            'who chooses what products to buy and he pays. She works too and can decide on her own, her days off ' + 'are on the weekend. Sometimes they go out on the weekends in the mornings and are back by the evening.' +
            ' The address on file it’s their own house and they prefer the visits to be done only there.  ' +'Their sales representative is Mr. Simon. Their products don’t require any maintenance and are ' +
            'satisfied with them. They are preferential clients and have received the $ 200 bonus before',
        lastvisit:'September 9, 2013. Ms. Julia received representative Simon on her day off. The representative ' +
            'was punctual but had to wait on the front door 30 minutes because she was running an errand before ' +
            'getting home. She didn’t buy anything but was interested on pressure stoves but said she’s unable ' +
            'to buy anything at the moment. She’ll consider it when they pay off the paella. Representative Simon ' +
            'cleaned the paella and adjusted the water filter.',
        lastcall:'January  9, 2013. Mr. Erwin was busy at work and couldn’t speak much but they are going on a trip ' +
            'in the weekend and refused the visit.  The water filter needs a replacement for the goose and would ' +
            'like to get the paella and stove cleaned.\n' +
            'The  paella was paid off the a few months ago and are interested on buying new products.'
      }
    };
  }
};
</script>

<style>
.bigDiv{
  width: 250%;
  overflow-x: auto;
}
</style>
