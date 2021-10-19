<template>
  <v-card flat>
    <v-card-title class="mb-6">
      My reports
    </v-card-title>
    <v-card
        v-for="(report,index) in reports"
        :key="index"
        @click="seeReport(report)"
    >
      <v-container fluid>

        <v-row dense>
          <v-col>
            <v-row class="text-h6">
              {{report.observation}}
            </v-row>
            <v-row >
              {{report.diagnosis}}
            </v-row>
          </v-col>
          <v-col cols="1">
            {{report.date}}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div class="btn-add" >
      <v-btn
          class="primary"
          fab
          dark
          @click="addNewReport()"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <!-- New Report -->
    <v-dialog
        v-model="newReport"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> New Report</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
          >
            <v-text-field
                v-model="formNewReport.observation"
                ref="textField"
                label="Observation"
                clearable
            ></v-text-field>

            <v-text-field
                v-model="formNewReport.diagnosis"
                ref="textField"
                label="Diagnosis"
                clearable
            ></v-text-field>

            <v-text-field
                v-model="formNewReport.repairDescription"
                ref="textField"
                clearable
                label="Repair Description"
            ></v-text-field>
            <v-text-field
            v-model="formNewReport.date"
            ref="textField"
            clearable
            label="Date"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="registerReport"
          >
            Submit
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="newReport = false"
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
import ReportsApiService from "../../core/services/reports-api-service";
import {v4 as uuidv4} from "uuid";
export default {
  name: "Reports",
  data() {
    return {
      technicians: [],
      reports: [],
      search: '',
      openReport: false,
      newReport:false,
      e6:1,
      editItem: {
        appointmentId: "",
        date: "",
        diagnosis: "",
        fullName: "",
        id: "",
        imagePath: "",
        observation: "",
        repairDescription: "",
        technicianId: ""
      },
      formNewReport:{
        observation:"",
        diagnosis:"",
        repairDescription: "",
        date:""
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
    async retrieveReports() {
      await TechnicianApiService.getAll()
          .then(response => {
            this.technicians = response.data.map(this.getTechnician);
          })
          .catch(e => {
            console.log(e);
          });

      for (let technician of this.technicians) {
        await TechnicianApiService.getReports(technician.id)
            .then(response => {
              const newReports = response.data.map(report => {
                const technicianFullName = {
                  fullName: `${technician.names} ${technician.lastnames}`
                }
                return Object.assign(report, technicianFullName);
              });

              this.reports = this.reports.concat(newReports);
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    seeReport(item) {
      this.editItem = Object.assign({}, item);
      this.openReport = true;
    },
    addNewReport(){
      this.newReport=true;
    },
    async registerReport(){
      const newReport={
        id:uuidv4(),
        observation:this.formNewReport.observation,
        diagnosis:this.formNewReport.diagnosis,
        repairDescription:this.formNewReport.repairDescription,
        date:this.formNewReport.date,
        imagePath: "image.png",
        appointmentId: "1",
        technicianId: "1"
      }
      await ReportsApiService.create(newReport)
          .then(response=>{
            console.log(response);
            this.newReport=false;
            this.$refs.form.reset();
          })
          .catch(e=>{
          console.log(e);
          });
    },
  },
  mounted() {
    this.retrieveReports();
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