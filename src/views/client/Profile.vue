<template>
  <v-card class="profile">

    <v-container class="my-profile">
      <nav id="my">Profile</nav>
      <v-spacer class="divide"></v-spacer>

      <div id="div-profile">
        <v-card class="profilecard" color="rgba(3,64,120,0.19)">
          
          <v-img
          src="../../assets/img/user.png"
          max-width="200px"
          alt="user image"
          class="mx-auto mt-10"
          ></v-img>
          
          <div id="title-name-div">
            <v-card-title id="name"><b>{{}}</b></v-card-title>
          </div>

          <div id="info">
            <v-card-text class="data-info">Cellphone:
              <v-card-text class="data-info">{{}}</v-card-text>
            </v-card-text>
            <v-spacer class="space"></v-spacer>
            <v-card-text class="data-info">Email:
              <v-card-text class="data-info"> {{}}</v-card-text>
            </v-card-text>
            <v-spacer class="space"></v-spacer>
            <v-card-text class="data-info">Adress:
              <v-card-text class="data-info">{{}}</v-card-text>
            </v-card-text>
           <v-btn 
           class="btn-edit" 
           color="primary"
           @click="openAppliancesBrandDialog({})"
           > Edit <span class="material-icons"></span> </v-btn>
           
          </div>

        </v-card>
      </div>
      <ClientProfileDialog
      v-bind:dialog="dialog"
      v-bind:edit="editProfile"
      v-bind:title="editProfile ? 'Editar' : 'Nuevo perfil'"
      v-bind:item="profileItem"
      v-on:close-dialog="closeClientProfileDialog"
      v-on:client-profile-information="saveInformationClientDialog"
      />
    </v-container>
  </v-card>
</template>

<script>
import ClientsApiService from "../../core/services/clients-api-service";
import ClientProfileDialog from "../../components/client/Client-profile-dialog";

export default {
  name: "Profile",
   data() {
    return {
      clientprofile: {},
      dialog: false,
      editProfile: false,
      profileItem: {},
      currentClientId: "1",
    }
  },
  components: {
    ClientProfileDialog
  },
   methods: {
    getclientId(clients) {
      return {
        id: clients.id,
        names: clients.names,
        lastName: clients.lastName,
        cellphoneNumber: clients.cellphoneNumber,
        address: clients.address,
        email: clients.email
      }
    },
    openAppliancesBrandDialog(item) {
      this.profileItem = Object.assign({}, item);
      this.dialog = true;
      this.editProfile = !!item.id;
    },
    closeClientProfileDialog() {
      this.dialog = false;
    },
    async retrieveClient() {
      let clientId = localStorage.getItem("clientId");
      await ClientsApiService.getAll(this.currentClientId)
        .then(response => {
          clientId = response.data.map(this.getclientsId);
        })
        .catch(e => {
          console.log(e);
        });

      this.profileItem = [];
      for (let id of clientId) {
        await ClientsApiService.getById(id.clientId)
          .then(response => {
            let clientsId = "";
            

            response.data.id = id.id;
            this.clients = this.clients
                .concat(Object.assign({ names: clientsId, purchaseDate: id.purchaseDate, clientId: id.clientId }, response.data));
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    updateProfile(clientsInformation) {
      const clients = {
        id: clientsInformation.id,
        purchaseDate: parseInt(clientsInformation.purchaseDate)
      }

      ClientsApiService.update(clients.id, clients)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
       createProfile(clientsInformation) {
      const clients = {
        id: clientsInformation.id,
        purchaseDate: parseInt(clientsInformation.purchaseDate)
      }

      ClientsApiService.create(clients)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    },
    async saveInformationClientDialog(clientsInformation) {
      if (this.editProfile) {
        await this.updateProfile(clientsInformation);
      }
      else {
        await this.createProfile(clientsInformation);
      }
      this.closeClientProfileDialog();
    },
  },
   mounted() {
    this.retrieveClient();
  }
}
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}
.profile {
  display: flex;
  height: 100%;
  width: 100%;
}
.divide {
  height: 10px;
}
.my-profile {
  height: 550px;
  width: 80%;
}
#my{
  display: flex;
  justify-content: center; /*centra horizontal*/
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
}
#div-profile {
  display: flex;
  justify-content: center; /*centra horizontal*/
  align-items: center;
  height: 480px;
  width: 100%;
}
.profilecard {
  width: 400px;
  height: 470px;
  border-radius: 25px;
}
#image-div {
  margin-top: 30px;
  width: 100%;
  height: 150px;
  border-radius: 0px;
  display: flex;
  justify-content: center; /*centra horizontal*/
  align-items: center;
}
.img {
  max-height: 150px;
  max-width: 150px;
}
#title-name-div {
  display: flex;
}
#name {
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  margin-left: 20px;
}
#info {
  margin-left: 20px;
  height: 250px;
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
.space {
  margin-top: -40px;
}
.btn-edit{
  float: right;
right: 20px;
bottom: 60px;
}
</style>