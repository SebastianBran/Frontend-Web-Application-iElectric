<template>
  <v-card flat>
    <v-card-title class="mb-6">
      Historial de reportes
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="reports"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            @click="seeReport(item)"
        >
            mdi-eye
        </v-icon>
      </template>
    </v-data-table>

    <!-- Dialgo see report -->
    <v-dialog
        v-model="openReport"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> Reporte </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <span class="text-h6">Nombre del técnico</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.fullName }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Observación</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.observation }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Diagnostico</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.diagnosis }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Descripción de reparación</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.repairDescription }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Fecha</span>
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
            cerrar
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
      headers: [
        { text: 'Nombre de técnico', align: 'start', sortable: false, value: 'fullName' },
        { text: 'Observación', value: 'observation', sortable: false },
        { text: 'Fecha', value: 'date' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
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