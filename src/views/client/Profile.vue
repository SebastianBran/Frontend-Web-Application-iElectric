<template>
  <v-card height="850px" class="pa-2">
    <h1 class="text-center mb-2">Profile</h1>

    <v-card class="mx-auto pa-2" max-width="500px" color="rgba(3,64,120,0.19)">
      <v-img
          src="../../assets/img/user.png"
          max-width="200px"
          alt="user image"
          class="mx-auto mt-3"
      ></v-img>

      <v-card-title><b>{{profileItem.names +" "+ profileItem.lastNames}}</b></v-card-title>

      <v-card-text>
        <h3>Address</h3>
        <p>{{profileItem.address}}</p>

        <h3>Cellphone</h3>
        <p>{{profileItem.cellphoneNumber}}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            @click="openPersonalInformationDialog()"
        >Edit</v-btn>
      </v-card-actions>
    </v-card>

    <ClientProfileDialog
        v-bind:dialog="personalInformationDialog"
        v-bind:title="'Edit person information'"
        v-bind:item="profileItem"
        v-on:close-dialog="closePersonalInformationDialog"
        v-on:client-profile-information="updatePersonalInformation"
    />
    <ClientSesionDialog
        v-bind:dialog="emailAndPasswordDialog"
        v-bind:title="'Edit email and password'"
        v-bind:item="profileItem"
        v-on:close-dialog="closeEmailAndPasswordDialog"
        v-on:client-sesion-information="updateEmailAndPassword"
    />
  </v-card>
</template>

<script>
import ClientsApiService from "../../core/services/clients-api-service";
import ClientProfileDialog from "../../components/client/Client-profile-dialog";
import ClientSesionDialog from "../../components/client/Client-sesion-dialog";

export default {
  name: "Profile",
   data() {
    return {
      personalInformationDialog: false,
      emailAndPasswordDialog: false,
      profileItem: {},
    }
  },
  components: {
    ClientProfileDialog,
    ClientSesionDialog
  },
   methods: {
    openPersonalInformationDialog() {
      this.personalInformationDialog = true;
    },
    closePersonalInformationDialog() {
      this.personalInformationDialog = false;
    },
    openEmailAndPasswordDialog() {
      this.emailAndPasswordDialog = true;
    },
    closeEmailAndPasswordDialog() {
      this.emailAndPasswordDialog = false;
    },
    async retrieveClient() {
      let clientId = localStorage.getItem("userId");

      await ClientsApiService.getById(clientId)
        .then(response => {
          this.profileItem = response.data
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePersonalInformation(profileItem) {
      this.profileItem = Object.assign(profileItem, this.profileItem);

      ClientsApiService.update(this.profileItem.id, this.profileItem)
        .then(response => {
          this.profileItem = response.data;
        })
        .catch(e => {
          console.log(e);
        });

      this.closePersonalInformationDialog();
    },
    updateEmailAndPassword(profileItem) {
      ClientsApiService.update(profileItem.id, profileItem)
        .then(response => {
          this.profileItem = response.data
        })
        .catch(e => {
          console.log(e);
        });

      this.closeEmailAndPasswordDialog();
    },
  },
  mounted() {
    this.retrieveClient();
  }
}
</script>

<style scoped>
</style>