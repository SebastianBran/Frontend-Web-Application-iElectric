<template>




    <v-container fluid>
      <div style="align-content: center; margin: auto">
        <v-col style="align-content: center" align="center" fluid
               v-for="appliance in appliances" :key="appliance.id"
               :rows="appliance.flex"
        >

            <v-card width="25%" align="center" height="100%">
              <v-img
                  :src="appliance.photoUrl"
                  class="white--text align-end"
                  width="50%"
                  height="200px"
              ></v-img>
              <v-card-title v-text="appliance.name"></v-card-title>
              <v-card-text v-text="appliance.description"></v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-note-edit</v-icon>
                </v-btn>

              </v-card-actions>
            </v-card>

        </v-col>
      </div>

    </v-container>


</template>

<script>

import AppliancesApiService from "../core/services/appliances-api.service"

export default {
  name: "my-appliances",
  data: () => ({
    appliances:[],
    clientId: 1,
    currentAppliance: null,
    currentIndex: -1
  }),
  methods: {
    getDisplayAppliance(appliance){
      return {
        id: appliance.id,
        name: appliance.name,
        model: appliance.model,
        photoUrl: appliance.photoUrl,
        description: appliance.description
      }
    },

    retrieveAppliances(){
      AppliancesApiService.getAppliances(1)
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