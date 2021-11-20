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
               <n>Repair reserves</n>
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
            v-for="appliance in appliances"
            :key="appliance.id"
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
                    @click="openAppliancesBrandDialog(appliance)"
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
                    v-bind:src="require(`../../../src/assets/img/appliance-models/${appliance.imagePath}`)"
                    aspect-ratio="1.5"
                ></v-img>
              </v-card>
              <v-card-title>
                {{ appliance.name }}
              </v-card-title>
              <v-lable>
              <n style="padding:16px; color:gray;"> {{ appliance.status }}</n><br>
              </v-lable>
              <v-lable >
               <n style="padding:16px; color:gray;"> Reserve data :</n><br>
              </v-lable>
              <v-lable>
              <n style="padding:16px; color:gray;"> {{ appliance.date_reserve }}</n><br>
              </v-lable>
            <v-lable>
               <n style="padding:16px; color:gray;"> Attention date :</n><br>
              </v-lable>
              <v-lable>
              <n style="padding:16px; color:gray;"> {{ appliance.date_atention }}</n><br>
              </v-lable>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <ReserveDialog
        v-bind:dialog="dialog"
        v-bind:edit="editReserve"
        v-bind:title="editReserve ? 'Reserve' : 'New Brand'"
        v-bind:item="applianceReserveItem"
        v-on:close-dialog="closeAppliancesReserveDialog"
        v-on:brand-information="saveInformationReserveDialog"
        v-on:delete-brand="/*deleteReserve*/"
    />
  </v-container>
</template>

<script>
//import ReserveApiService from "../../core/services/reserve-api-service";
import ReserveDialog from "../../components/client/reserve-dialog";

export default {
  name: "Reservation",
  data() {
    return {
      appliances: [],
      dialog: false,
      editReserve: false,
      applianceReserveItem: {}
    }
  },
  components: {
    ReserveDialog
  },
  methods: {
    getAppliance(appliance) {
      return {
        id: appliance.id,
        name: appliance.name,
        imagePath: appliance.imagePath,
        status: appliance.status,
        date_reserve: appliance.date_reserve,
        date_atention: appliance.date_atention
      }
    },
    retrieveAppliances() {
      /*ReserveApiService.getAll()
        .then(response => {
          this.appliances = response.data.map(this.getAppliance);
          console.log(this.appliances);
        })
        .catch(e => {
          console.log(e);
        });*/
    },
    openAppliancesBrandDialog(item) {
      this.applianceReserveItem = Object.assign({}, item);
      this.dialog = true;
      this.editReserve = !!item.id;
    },
    closeAppliancesReserveDialog() {
      this.dialog = false;
    },
    /*updateApplianceBrand(brandInformation) {
      ReserveApiService.update(brandInformation.id, brandInformation)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    },
    createApplianceBrand(brandInformation) {
      ReserveApiService.create(brandInformation)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    },*/
    async saveInformationReserveDialog(brandInformation) {
      if (this.editReserve) {
        await this.updateApplianceBrand(brandInformation);
      }
      else {
        await this.createApplianceBrand(brandInformation);
      }
      this.retrieveAppliances();
      this.closeAppliancesReserveDialog();
    },
    /*async deleteReserve(id) {
      await ReserveApiService.delete(id)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      this.retrieveAppliances();
      this.closeAppliancesReserveDialog();
    }*/
  },
  mounted() {
    this.retrieveAppliances();
  }
}
</script>

<style scoped>

</style>