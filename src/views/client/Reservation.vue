:root{
  --date_atention-text:"5"
}
<template>
  <v-container>
    <v-app-bar
        class="mb-6"
        color="white"
        flat
        height="90px"
    >
    <v-card-title>
               Repair reserves
              </v-card-title>
      <v-col cols="12" sm="6" class="ml-auto">
        <v-text-field
            outlined
            dense
            class="mt-4"
            append-icon="mdi-magnify"
            label="Search"
        >
        </v-text-field>
      </v-col>
    </v-app-bar>

    <v-item-group active-class="primary">
      <v-row> 
        <v-col
            cols="12"
            xl="2"
            lg="3"
            md="4"
            sm="6"
        >     
          <v-item>
            <v-card>
              <v-app-bar flat dense class="white">
                <v-btn
                    color="black"
                    icon
                    class="ml-auto"
                    @click="openReserveDialog()"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-app-bar>
              <v-card
                  fluid
                  flat
                  elevation="0"
                  >
               <v-img
                    v-bind:src="require(`../../../src/assets/img/appliance-models/${applianceReserveItem.imagePath}`)"
                    aspect-ratio="1.5"
                ></v-img>
              </v-card>
              <v-card-title>
                {{ applianceReserveItem.name }}
                </v-card-title>
                <v-spacer class="space"></v-spacer>
              <v-card-text class="data-info">Model:
               <v-card-text class="data-info">{{applianceReserveItem.model}}</v-card-text>
              </v-card-text>
              <v-spacer class="space"></v-spacer>
              <v-card-text class="data-info">Hour:
               <v-card-text class="data-info">{{applianceReserveItem.hour}}</v-card-text>
              </v-card-text>
              <v-spacer class="space"></v-spacer>
              <v-card-text class="data-info">Reserve date:
               <v-card-text class="data-info">{{applianceReserveItem.dateReserve}}</v-card-text>
              </v-card-text>
              <v-spacer class="space"></v-spacer>
            <v-card-text class="data-info">Attention date:
               <v-card-text class="data-info">{{applianceReserveItem.dateAttention}}</v-card-text>
              </v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <ReserveDialog
        v-bind:dialog="dialog"
        v-bind:title="'Edit Reserve'"
        v-bind:item="applianceReserveItem"
        v-on:close-dialog="closeReserveDialog"
        v-on:reserve-information="updateApplianceBrand"
        v-on:delete-reserve="deleteReserve"
    />
  </v-container>
</template>

<script>

import ApplianceModelsService from "../../core/services/appliance-models-api-service";
import AppointmentsApiService from "../../core/services/appointments-api-service";
import ReserveDialog from "../../components/client/reserve-dialog";

export default {
  name: "Reservation",
  data() {
    return {
      dialog: false,
      applianceReserveItem: {},
    }
  },
  components: {
    ReserveDialog
  },
  methods: {
    getAppointments(applianceReserveItem){
      return {
        id: applianceReserveItem.id,
        hour: applianceReserveItem.hour,
        dateAttention: applianceReserveItem.dateAttention,
        dateReserve: applianceReserveItem.dateReserve
      };
    },
    openReserveDialog() {
      this.dialog = true;
    },
    closeReserveDialog() {  
      this.dialog = false;
    },
     async retrieveAppliances() {
      let AppliancesId = localStorage.getItem("userId");
      await ApplianceModelsService.getById(AppliancesId)
        .then(response => {
         this.applianceReserveItem = response.data
        })
        .catch(e => {
          console.log(e);
        }); 
    },
     async retrieveAppointments() {
      await this.retrieveAppliances();
      let AppointmentsId = localStorage.getItem("userId");
      await AppointmentsApiService.getById(AppointmentsId)
        .then(response => {
         this.applianceReserveItem = response.data(this.getAppointments);
        })
        .catch(e => {
          console.log(e);
        });   
    },    
     
    updateApplianceBrand(applianceReserveItem) {
      console.log(this.applianceReserveItem, "reserve");
      this.applianceReserveItem = Object.assign(applianceReserveItem, this.applianceReserveItem);
      AppointmentsApiService.update(applianceReserveItem.id, applianceReserveItem)
          .then(response => {
             this.applianceReserveItem = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    },
    async deleteReserve(applianceReserveItem) {
      console.log(this.applianceReserveItem, "reserve");
      this.applianceReserveItem = Object.assign(applianceReserveItem, this.applianceReserveItem);
      AppointmentsApiService.delete(applianceReserveItem.id, applianceReserveItem)
          .then(response => {
            this.applianceReserveItem = response.data;
          })
          .catch(e => {
            console.log(e);
          });
          
      this.retrieveAppointments();
      this.closeReserveDialog();
    },
  },
  async mounted() {
    this.retrieveAppliances();
    this.retrieveAppointments();
  }
}
</script>

<style scoped>
.space {
  margin-top: -20px;
}
.data-info {
  margin-top: -15px;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 21px;
  letter-spacing: 0em;
  color: black;
}
</style>