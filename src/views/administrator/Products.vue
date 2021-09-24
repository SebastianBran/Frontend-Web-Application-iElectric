<template>
  <v-container>
    <v-app-bar
        class="mb-6"
        color="white"
        flat
        height="90px"
    >
      <v-btn
          color="accent"
          @click="openAppliancesBrandDialog({})"
      >
        Crear
      </v-btn>

      <ApplianceDialog
          v-bind:dialog="dialog"
          v-bind:edit="editBrand"
          v-bind:title="editBrand ? 'Editar' : 'Nueva Marca'"
          v-bind:item="applianceBrandItem"
          v-on:close-dialog="closeAppliancesBrandDialog"
          v-on:brand-information="saveInformationBrandDialog"
          v-on:delete-brand="deleteBrand"
      />

      <v-col cols="12" sm="6" class="ml-auto">
        <v-text-field
            outlined
            dense
            class="mt-4"
            append-icon="mdi-magnify"
            label="Buscar"
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

              <v-img
                  v-bind:src="require(`../../../src/assets/img/appliance-logos/${appliance.imagePath}`)"
                  aspect-ratio="1.5"
              ></v-img>

              <v-card-title>
                {{ appliance.name }}
              </v-card-title>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-container>
</template>

<script>
import AppliancesApiService from "../../core/services/appliances-api-service";
import ApplianceDialog from "../../components/administrator/Appliance-dialog";

export default {
  name: "Products",
  data: () => ({
    appliances: [],
    dialog: false,
    editBrand: false,
    applianceBrandItem: {},
  }),
  components: {
    ApplianceDialog
  },
  methods: {
    getAppliance(appliance) {
      return {
        id: appliance.id,
        name: appliance.name,
        imagePath: appliance.imagePath
      }
    },
    retrieveAppliances() {
      AppliancesApiService.getAll()
        .then(response => {
          this.appliances = response.data.map(this.getAppliance);
          console.log(this.appliances);
        })
        .catch(e => {
          console.log(e);
        });
    },
    openAppliancesBrandDialog(item) {
      this.applianceBrandItem = Object.assign({}, item);
      this.dialog = true;
      this.editBrand = !!item.id;
    },
    closeAppliancesBrandDialog() {
      this.dialog = false;
    },
    async saveInformationBrandDialog(brandInformation) {
      if (this.editBrand) {
        await AppliancesApiService.update(brandInformation.id, brandInformation)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }
      else {
        await AppliancesApiService.create(brandInformation)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }
      this.retrieveAppliances();
      this.closeAppliancesBrandDialog();
    },
    async deleteBrand(id) {
      await AppliancesApiService.getModels(id)
          .then(response => {
            console.log(response.data);
          });
      await AppliancesApiService.delete(id)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      this.retrieveAppliances();
      this.closeAppliancesBrandDialog();
    }
  },
  mounted() {
    this.retrieveAppliances();
  }
}
</script>

<style scoped>

</style>