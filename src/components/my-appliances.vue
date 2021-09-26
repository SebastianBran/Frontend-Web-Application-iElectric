<template>

  <v-layout row wrap align-center>
    <v-flex xs8 offset-md2>
      <h1>My Appliances</h1>
      <div v-for="appliance in appliances" :key="appliance.id">
        <v-card-text>{{appliance.name}}</v-card-text>
      </div>
    </v-flex>
  </v-layout>


</template>

<script>

import AppliancesApiService from "../core/services/appliances-api.service"

export default {
  name: "my-appliances",
  data: () => ({
    appliances:[],
    currentAppliance: null,
    currentIndex: -1
  }),
  methods: {
    getDisplayAppliance(appliance){
      return {
        id: appliance.id,
        name: appliance.name,
        model: appliance.model,
        description: appliance.description
      }
    },

    retrieveAppliances(){
      AppliancesApiService.getAll()
      .then(response =>{
        this.appliances = response.data.map(this.getDisplayAppliance);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    },

    refreshList(){
      this.retrieveAppliances();
      this.currentAppliance = null;
      this.currentIndex = -1;
    }


  },
  mounted(){
    this.retrieveAppliances();
  }
}
</script>

<style scoped>

</style>