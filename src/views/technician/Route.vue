<template>
  <v-card flat>
    <v-card-title class="mb-6">
      My route
    </v-card-title>
    <v-timeline dense>
      <v-timeline-item
          v-for="appointment in appointments"
          :key=appointment.hour
      >
        <v-row justify="space-between">
          <v-col>
            {{appointment.hour}}
          </v-col>
          <v-col
          class="text-center"
          >
            {{appointment.address}}
          </v-col>
          <v-col
              class="text-right"
          >
            {{appointment.dateAttention}}
          </v-col>
          <v-col cols="1">
            <template>
              <v-icon
                  @click="seeAppointment(appointment)"
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
          <span class="text-h5"> Appointment </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <span class="text-h6">Address</span>
            </v-row>
            <v-row class="mb-3">
              <span ref="address"> {{ editItem.address }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Date</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ editItem.dateAttention }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Hour</span>
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
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-card>
</template>

<script>
import TechnicianApiService from "../../core/services/technicians-api-service";
import ClientApiService from "../../core/services/clients-api-service";

export default {
  name: "Routes",
  data() {
    return {
      appointments: [],
      search: '',
      openReport: false,
      editItem: {
        id: "",
        dateReserve: "",
        dateAttention: "",
        hour: "",
        clientId: "",
        technicianId: "",
        applianceId: "",
        done: Boolean,
        address: ""
      },
    }
  },
  methods: {
    getAppointments(appointment) {
      return {
        id: appointment.id,
        dateReserve: appointment.dateReserve,
        dateAttention: appointment.dateAttention,
        hour: appointment.hour,
        clientId: appointment.clientId,
        technicianId: appointment.technicianId,
        applianceId: appointment.applianceId,
        done: appointment.done
      }
    },
    async retrieveAppointments() {
      let technicianId = localStorage.getItem("userId");

      let newAppointments = [];

      await TechnicianApiService.getAppointments(technicianId)
        .then(response => {
          newAppointments = response.data.map(this.getAppointments);
        })
        .catch(e => {
          console.log(e);
        });

      for (let i = 0; i < newAppointments.length; i++) {
        await ClientApiService.getById(newAppointments[i].clientId)
            .then(response => {
              newAppointments[i] = Object.assign(
                  { address: response.data.address },
                  newAppointments[i]
              );
            })
            .catch(e => {
              console.log(e);
            });
      }

      this.appointments = newAppointments;
    },
    seeAppointment(item) {
      this.editItem = Object.assign({}, item);
      this.openReport = true;
    }
  },
  mounted() {
    this.retrieveAppointments();
  }
}
</script>

<style scoped>

</style>