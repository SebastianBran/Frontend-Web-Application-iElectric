<template>
  <v-container>
    <v-app-bar
        color="white"
        flat
        class="mb-6"
    >
      <v-app-bar-title>
        My Appliances
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
          color="accent"
          @click="openClientApplianceDialog({})"
      >
        Add
      </v-btn>
    </v-app-bar>

    <v-item-group active-class="primary">
      <v-row>
        <v-col
            v-for="brand in appliances"
            :key="brand.id"
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
                    @click="openClientApplianceDialog(brand)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-app-bar>

              <v-card
                  fluid
                  flat
                  elevation="0"
                  :to="`appliances/${brand.id}/models`">
                <v-img
                    :src="brand.imgPath"
                    aspect-ratio="1.5"
                ></v-img>
              </v-card>

              <v-card-title>
                {{ brand.name }}
              </v-card-title>

              <v-card-subtitle>
                {{ brand.model }}
                <v-spacer></v-spacer>
                {{ brand.brandName }}
              </v-card-subtitle>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <ClientApplianceDialog
      v-bind:dialog="dialog"
      v-bind:edit="editAppliance"
      v-bind:title="editAppliance ? 'Edit' : 'New appliance'"
      v-bind:item="applianceItem"
      v-bind:brandsWithModels="brandsWithModels"
      v-on:close-dialog="closeClientApplianceDialog"
      v-on:client-appliance-information="saveInformationApplianceDialog"
      v-on:delete-client-appliance="deleteAppliance"
    />
  </v-container>
</template>

<script>
import ApplianceBrandsApiService from "../../core/services/appliance-brands-api-service";
import ClientApplianceDialog from "../../components/client/Client-appliance-dialog";

export default {
  name: "Appliance-models",
  components: {ClientApplianceDialog},
  data() {
    return {
      applianceId: this.$route.params.applianceId,
      applianceModels: [],
      brandName: '',
      dialog: false,
      editModel: false,
      applianceModelItem: {}
    }
  },
  methods: {
    getAppliance(appliance) {
      return {
        id: appliance.id,
        name: appliance.name,
        model: appliance.model,
        imgPath: appliance.imgPath,
        applianceBrandId: appliance.applianceBrandId
      }
    },
    async retrieveAppliancesBrands() {
      await ApplianceBrandsApiService.getAll()
        .then(response => {
          this.applianceBrands = response.data.map(this.getAppliance);
          console.log(this.applianceBrands);
        })
        .catch(e => {
          console.log(e);
        });
    },
    openApplianceModelsDialog(item) {
      this.applianceModelItem = Object.assign({}, item);
      this.dialog = true;
      this.editModel = !!item.id;
    },
    closeAppliancesModelsDialog() {
      this.dialog = false;
    },
    async updateApplianceModel(modelInformation) {
      await ApplianceBrandsApiService.update(modelInformation.id, modelInformation)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async createApplianceModel(modelInformation) {
      await ApplianceBrandsApiService.create(modelInformation)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async saveInformationModelDialog(modelInformation) {
      if (this.editModel) {
        await this.updateApplianceModel(modelInformation);
      }
      else {
        await this.createApplianceModel(modelInformation);
      }
      await this.retrieveApplianceModels();
      this.closeAppliancesModelsDialog();
    },
    async deleteModel(id) {
      await ApplianceBrandsApiService.delete(id)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
      await this.retrieveAppliancesBrands();
      this.closeAppliancesModelsDialog();
    }
  },
  mounted() {
    this.retrieveAppliancesBrands();
  }
}
</script>

<style scoped>

</style>