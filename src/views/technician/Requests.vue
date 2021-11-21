<template>
  <v-card flat>
    <v-card-title class="mb-6">
      My requests
    </v-card-title>
    <v-card
        v-for="(request,index) in requests"
        :key="index"
        @click="seeRequest(request)"
    >
      <v-container fluid>
        <v-row dense>
          <v-col>
            <v-row class="text-h6">
              {{request.description}}
            </v-row>
          </v-col>
          <v-col cols="1">
            {{request.date}}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div class="btn-add" >
      <v-btn
          class="primary"
          fab
          dark
          @click="addNewRequest()"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <!-- New Report -->
    <v-dialog
        v-model="newRequest"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> New Request</span>
        </v-card-title>
        <v-card-text>
          <v-form
              ref="form"
          >
            <v-text-field
                v-model="formNewSpareRequest.description"
                ref="textField"
                outlined
                label="Description*"
                clearable
            ></v-text-field>
            <v-text-field
                v-model="formNewSpareRequest.imagePath"
                ref="textField"
                outlined
                label="Image Path*"
                clearable
            ></v-text-field>
            <v-text-field
                v-model="formNewSpareRequest.date"
                ref="textField"
                outlined
                label="Date*"
                clearable
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="registerRequest(formNewSpareRequest)"
          >
            Submit
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="newRequest = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Dialgo see report -->
    <v-dialog
        v-model="openRequest"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> Request </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-text-field
                v-model="editItem.description"
                ref="textField"
                outlined
                label="Description*"
                clearable
            ></v-text-field>
            <v-text-field
                v-model="editItem.imagePath"
                ref="textField"
                outlined
                label="Image Path*"
                clearable
            ></v-text-field>
            <v-text-field
                v-model="editItem.date"
                ref="textField"
                outlined
                label="Date*"
                clearable
            ></v-text-field>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1"
              text
              @click="deleteRequest(editItem.id)"
          >
            Delete
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="updateRequest(editItem.id,editItem)"
          >
            Save
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="openRequest = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import TechnicianApiService from "../../core/services/technicians-api-service";
import SpareRequestsApiService from "../../core/services/spare-requests-api-service";
export default {
  name: "Requests",
  data() {
    return {
      technicians: [],
      requests: [],
      search: '',
      openRequest: false,
      newRequest:false,
      e6:1,
      editItem: {
        id:"",
        description:"",
        technicianId: "",
        date:"",
        imagePath:"",
        appointmentId: ""
      },
      formNewSpareRequest:{
        description:"",
        technicianId: 2,
        date:"",
        imagePath:"",
        appointmentId: 4
      }
    }
  },
  methods: {
    getTechnician(technician) {
      return {
        id: technician.id,
        names: technician.names,
        lastnames: technician.lastnames,
        cellphoneNumber: technician.cellphoneNumber,
        address: technician.address,
        email: technician.email,
        birthday: technician.birthday
      }
    },
    async retrieveRequests() {
      await TechnicianApiService.getAll()
          .then(response => {
            this.technicians = response.data.map(this.getTechnician);
          })
          .catch(e => {
            console.log(e);
          });
      await SpareRequestsApiService.getAll()
          .then(response => {
            this.requests=response.data;
          })
          .catch(e => {
            console.log(e);
          });

    },
    seeRequest(item) {
      this.editItem = Object.assign({}, item);
      this.openRequest = true;
    },
    addNewRequest(){
      this.newRequest=true;
    },
    async registerRequest(newRequest){
      await SpareRequestsApiService.create(newRequest)
          .then(response=>{
            console.log(response);
            this.newRequest=false;
            this.$refs.form.reset();
          })
          .catch(e=>{
            console.log(e);
          });
      await this.retrieveRequests();
    },
    async deleteRequest(requestId){
      await SpareRequestsApiService.delete(requestId)
          .then(response=>{
            console.log(response);
            this.openRequest=false;
          })
          .catch(e=>{
            console.log(e);
          });
      await this.retrieveRequests();
    },
    async updateRequest(requestId,data){
      await SpareRequestsApiService.update(requestId,data)
          .then(response=>{
            console.log(response);
            this.openRequest=false;
          })
          .catch(e=>{
            console.log(e);
          });
      await this.retrieveRequests();
    }
  },
  mounted() {
    this.retrieveRequests();
  }
}
</script>

<style scoped>
.btn-add{
  display: flex;
  min-height: 80px;
  align-items: center;
  justify-content: center;
}
</style>