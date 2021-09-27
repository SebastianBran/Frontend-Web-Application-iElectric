<template>
  <v-card flat>
    <v-card-title class="mb-6">
      Mi ruta
    </v-card-title>
    <v-timeline dense>
      <v-timeline-item
          v-for="appointment in appointments"
          :key=appointment.hour
      >
        <v-row justify="space-between">
          <v-col>
           {{appointment.address}}
          </v-col>
          <v-col
          class="text-right"
          >
            {{appointment.hour}}
          </v-col>
          <v-col cols="1">
            <template>
              <v-icon
                  @click="seeReport(appointment)"
              >
                mdi-eye
              </v-icon>
            </template>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>


    <v-dialog
        v-model="openReport"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> Cita </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <span class="text-h6">Direccion</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.address}}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Fecha</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.date }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Hora</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.hour }}</span>
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
  name: "Routes",
  data() {
    return {
      headers: [
        { text: 'Direccion del cliente', align: 'start', sortable: false, value: 'address' },
        { text: 'Hora', value: 'hour'},
        { text: 'Fecha', value: 'date' }
      ],
      technicians: [],
      appointments: [],
      search: '',
      openReport: false,
      editItem: {
        address: "",
        applianceModelsId: "",
        date: "",
        clientId: "",
        hour: "",
        id: "",
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
        await TechnicianApiService.getAppointments(technician.id)
            .then(response => {
              const newAppointments = response.data.map(appointment => {
                const technicianFullName = {
                  fullName: `${technician.names} ${technician.lastnames}`,
                }
                return Object.assign(appointment, technicianFullName);
              });

              this.appointments = this.appointments.concat(newAppointments);
            })
            .catch(e => {
              console.log(e);
            });
      }
      this.appointments.sortArray("hour");
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