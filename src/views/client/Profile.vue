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
            <v-card-title id="name"><b>{{profileItem.names +" "+ profileItem.lastNames}}</b></v-card-title>
          </div>
          <div id="info">              
              <v-card-text class="data-info">Adress:
               <v-card-text class="data-info">{{profileItem.address}}</v-card-text>
              </v-card-text>
            <v-spacer class="space"></v-spacer>
              <v-card-text class="data-info">Cellphone:
                <v-card-text class="data-info">{{profileItem.cellphoneNumber}}</v-card-text>
              </v-card-text>
              <v-btn 
               class="btn-edit1" 
               color="primary"
               @click="openClientProfileDialog({})"
               >Edit <span class="material-icons"></span> 
              </v-btn>        
          </div>

        </v-card>
      </div>
      
      <nav id="my">Account</nav>
      <div id="div-sesion">
        <v-card class="profilecard2" color="rgba(3,64,120,0.19)">
          <div id="info">
            <v-card-text class="data-info">Email:
              <v-card-text class="data-info"> {{sesionItem.email}}</v-card-text>
            </v-card-text>
              <v-spacer class="space"></v-spacer>
            <v-card-text class="data-info">Password:
              <v-card-text class="data-info">{{sesionItem.password}}</v-card-text>
            </v-card-text>
           <v-btn 
             class="btn-edit2" 
             color="primary"
             @click="openClientSesionDialog({})"
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
      <ClientSesionDialog
      v-bind:dialog="dialog2"
      v-bind:edit="editSesion"
      v-bind:title="editSesion ? 'Editar' : 'Nueva cuenta'"
      v-bind:item="sesionItem"
      v-on:close-dialog="closeClientSesionDialog"
      v-on:client-sesion-information="saveInformationsesionClientDialog"
      />
    </v-container>
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
      dialog: false,
      dialog2: false,
      editProfile: false,
      editSesion: false,
      profileItem: {},
      sesionItem: {},
    }
  },
  components: {
    ClientProfileDialog,
    ClientSesionDialog
  },
   methods: {
    getId(clients) {
      return {
        id: clients.id,
        names: clients.names,
        lastNames: clients.lastNames,
        cellphoneNumber: clients.cellphoneNumber,
        address: clients.address,
        email: clients.email,
        password: clients.password
      }
    },
    openClientProfileDialog(item) {
      this.profileItem = Object.assign({}, item);
      this.dialog = true;
      this.editProfile = !!item.id;
    },
    closeClientProfileDialog() {
      this.dialog = false;
    },
    openClientSesionDialog(item) {
      this.sesionItem = Object.assign({}, item);
      this.dialog2 = true;
      this.editSesion = !!item.id;
    },
    closeClientSesionDialog() {
      this.dialog2 = false;
    },
    async retrieveClient() {
      let clientId = localStorage.getItem("userId");
      await ClientsApiService.getById(clientId)
        .then(response => {
         this.profileItem = response.data
         this.sesionItem = response.data
        })
        .catch(e => {
          console.log(e);
        });   
    },
    updateProfile(clientInformation) {
    const clientId = {
        id: clientInformation.id,
        names: clientInformation.names,
        lastNames: clientInformation.lastNames,
        cellphoneNumber: clientInformation.cellphoneNumber,
        address: clientInformation.address
      }
    
      ClientsApiService.update(clientId.id, clientId)
        .then(response => {
          this.profileItem = response.data
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateSesion(clientInformation) {
    const clientId = {
        id: clientInformation.id,
        email: clientInformation.email,
        password: clientInformation.password
      }
      console.log(clientId)
      ClientsApiService.update(clientId.id, clientId)
        .then(response => {
          this.sesionItem = response.data
        })
        .catch(e => {
          console.log(e);
        });
    },
    async saveInformationClientDialog(clientInformation) {
      this.editProfile
        await this.updateProfile(clientInformation);

      this.closeClientProfileDialog();
    },
    async saveInformationsesionClientDialog(clientInformation) {
      this.editSesion
        await this.updateSesion(clientInformation);

      this.closeClientSesionDialog();
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
  height: 800px;
  width: 100%;
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
  height: 500px;
  width: 100%;
}
#div-sesion {
  display: flex;
  justify-content: center; /*centra horizontal*/
  align-items: center;
  height: 200px;
  width: 100%;
}
.profilecard {
  width: 400px;
  height: 470px;
  border-radius: 25px;
}
.profilecard2 {
  width: 400px;
  height: 150px;
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
.data-info2 {
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

.btn-edit1{
  float: right;
right: 20px;
bottom: 30px;
}
.btn-edit2{
  float: right;
right: 20px;
bottom: 40px;
}
</style>