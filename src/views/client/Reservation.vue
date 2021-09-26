<template>
  <v-container>
    <v-app-bar
        class="mb-6"
        color="white"
        flat
        height="90px"
    >
    <label
          color="accent"
      >
        <n>Reserva Pendiente</n>
      </label>
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
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <ReserveDialog
        v-bind:dialog="dialog"
        v-bind:edit="editBrand"
        v-bind:title="editBrand ? 'Reserva' : 'Nueva Marca'"
        v-bind:item="ApplianceItem"
        v-on:close-dialog="closeAppliancesBrandDialog"
        v-on:delete-brand="deleteBrand"
    />
  </v-container>
</template>

<script>
import ReserveApiService from "../../core/services/reserve-api-service";
import ReserveDialog from "../../components/client/reserve-dialog";

export default {
  name: "Products",
  data() {
    return {
      appliances: [],
      dialog: false,
      editBrand: false,
      applianceBrandItem: {}
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
        imagePath: appliance.imagePath
      }
    },
    retrieveAppliances() {
      ReserveApiService.getAll()
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
    updateApplianceBrand(brandInformation) {
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
    },
    async saveInformationBrandDialog(brandInformation) {
      if (this.editBrand) {
        await this.updateApplianceBrand(brandInformation);
      }
      else {
        await this.createApplianceBrand(brandInformation);
      }
      this.retrieveAppliances();
      this.closeAppliancesBrandDialog();
    },
    async deleteBrand(id) {
      await ReserveApiService.delete(id)
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