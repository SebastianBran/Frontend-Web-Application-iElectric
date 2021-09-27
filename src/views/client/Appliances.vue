<template>
  <v-container>
    <v-app-bar
        color="white"
        flat
        class="mb-6"
    >
      <v-app-bar-title>
        Mis electrodomésticos
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
          color="accent"
          @click="openClientApplianceDialog({})"
      >
        Añadir
      </v-btn>
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
                    @click="openClientApplianceDialog(appliance)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-app-bar>

              <v-img
                  v-bind:src="require(`../../../src/assets/img/appliance-models/${appliance.imagePath}`)"
                  aspect-ratio="1.5"
              ></v-img>

              <v-card-title>
                {{ appliance.name }}
              </v-card-title>

              <v-card-subtitle>
                {{ appliance.model }}
                <v-spacer></v-spacer>
                {{ appliance.brandName }}
              </v-card-subtitle>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <ClientApplianceDialog
      v-bind:dialog="dialog"
      v-bind:edit="editAppliance"
      v-bind:title="editAppliance ? 'Editar' : 'Nuevo electrodoméstico'"
      v-bind:item="applianceItem"
      v-bind:brandsWithModels="brandsWithModels"
      v-on:close-dialog="closeClientApplianceDialog"
      v-on:client-appliance-information="saveInformationApplianceDialog"
      v-on:delete-client-appliance="deleteAppliance"
    />
  </v-container>
</template>

<script>
import ClientApplianceDialog from "../../components/client/Client-appliance-dialog";
import ClientsApiService from "../../core/services/clients-api-service";
import ApplianceModelsApiService from "../../core/services/appliance-models-api-service";
import AppliancesApiService from "../../core/services/appliances-api-service";
import ApplianceClientsApiService from "../../core/services/appliance-clients-api-service";

export default {
  name: "Appliances",
  data() {
    return {
      appliances: [],
      brandsWithModels: [],
      dialog: false,
      editAppliance: false,
      applianceItem: {},
      currentClientId: "1",
    }
  },
  components: {
    ClientApplianceDialog
  },
  methods: {
    getApplianceModelId(appliance) {
      return {
        id: appliance.id,
        applianceModelId: appliance.applianceModelId,
        purchaseDate: appliance.purchaseDate
      }
    },
    async retrieveBrandWithModel() {
      let brands = [];

      await AppliancesApiService.getAll()
          .then(response => {
            brands = response.data;
          })
          .catch(e => {
            console.log(e);
          });

      for (let brand of brands) {
        await AppliancesApiService.getModels(brand.id)
            .then(response => {
              brand.models = response.data;
            });
      }

      this.brandsWithModels = brands;
    },
    async retrieveAppliances() {
      await this.retrieveBrandWithModel();

      let appliancesIds = [];
      await ClientsApiService.getAppliances(this.currentClientId)
        .then(response => {
          appliancesIds = response.data.map(this.getApplianceModelId);
        })
        .catch(e => {
          console.log(e);
        });

      this.appliances = [];
      for (let id of appliancesIds) {
        await ApplianceModelsApiService.getById(id.applianceModelId)
          .then(response => {
            let brandN = "";
            for (let model of this.brandsWithModels) {
              if ((response.data).applianceBrandId === model.id) {
                brandN = model.name;
                break
              }
            }

            response.data.id = id.id;
            this.appliances = this.appliances
                .concat(Object.assign({ brandName: brandN, purchaseDate: id.purchaseDate, applianceModelId: id.applianceModelId }, response.data));
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    openClientApplianceDialog(item) {
      this.applianceItem = Object.assign({}, item);
      this.dialog = true;
      this.editAppliance = !!item.id;
    },
    closeClientApplianceDialog() {
      this.dialog = false;
    },
    updateAppliance(applianceInformation) {
      const appliance = {
        id: applianceInformation.id,
        applianceModelId: applianceInformation.applianceModelId,
        clientId: this.currentClientId,
        purchaseDate: parseInt(applianceInformation.purchaseDate)
      }

      ApplianceClientsApiService.update(appliance.id, appliance)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    createAppliance(applianceInformation) {
      const appliance = {
        id: applianceInformation.id,
        applianceModelId: applianceInformation.model.id,
        clientId: this.currentClientId,
        purchaseDate: parseInt(applianceInformation.purchaseDate)
      }

      ApplianceClientsApiService.create(appliance)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    },
    async saveInformationApplianceDialog(applianceInformation) {
      if (this.editAppliance) {
        await this.updateAppliance(applianceInformation);
      }
      else {
        await this.createAppliance(applianceInformation);
      }

      await this.retrieveAppliances();
      this.closeClientApplianceDialog();
    },
    async deleteAppliance(id) {
      await ApplianceClientsApiService.delete(id)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });

      await this.retrieveAppliances();
      this.closeClientApplianceDialog();
    }
  },
  mounted() {
    this.retrieveAppliances();
  }
}
</script>

<style scoped>

</style>