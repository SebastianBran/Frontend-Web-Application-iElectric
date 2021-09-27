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
export default {
  name: "Reports",
  data() {
    return {
      technicians: [],
      reports: [],
      search: '',
      openReport: false,
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
    }
  },
  mounted() {
    this.retrieveReports();
  }
}
</script>

<style scoped>

</style>