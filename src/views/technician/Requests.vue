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
                label="Description"
                clearable
            ></v-text-field>

            <v-text-field
                v-model="formNewSpareRequest.date"
                ref="textField"
                label="Date"
                clearable
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="registerRequest"
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
        v-model="openReport"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> Report </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <span class="text-h6">Name of technician</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.fullName }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Observation</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.observation }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Diagnostic</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.diagnosis }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Description of reparation</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.repairDescription }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Date</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.date }}</span>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="openReport = false"
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
import {v4 as uuidv4} from "uuid";
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
        technicianId: "",
        date:"",
        imagePath:"",
        appointmentId: ""
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

      for (let technician of this.technicians) {
        await SpareRequestsApiService.getAllByTechnicianId(technician.id)
            .then(response => {
              const newRequests = response.data.map(request => {
                const technicianFullName = {
                  fullName: `${technician.names} ${technician.lastnames}`
                }
                return Object.assign(request, technicianFullName);
              });

              this.requests = this.requests.concat(newRequests);
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    seeRequest(item) {
      this.editItem = Object.assign({}, item);
      this.openRequest = true;
    },
    addNewRequest(){
      this.newRequest=true;
    },
    async registerRequest(){
      const newRequest={
        id:uuidv4(),
        description:this.formNewSpareRequest.description,
        date:this.formNewSpareRequest.date,
        imagePath: "image.png",
        appointmentId: "1",
        technicianId: "1"
      }
      await SpareRequestsApiService.create(newRequest)
          .then(response=>{
            console.log(response);
            this.newRequest=false;
            this.$refs.form.reset();
          })
          .catch(e=>{
            console.log(e);
          });
    },
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