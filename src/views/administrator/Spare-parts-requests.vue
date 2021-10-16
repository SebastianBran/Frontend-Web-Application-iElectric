<template>
  <v-card flat>
    <v-card-title class="mb-6">
      Spare requests
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="spareRequests"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            @click="seeSpareRequest(item)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>

    <!-- Dialog see report -->
    <v-dialog
        v-model="openSpareRequest"
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
              <span> {{ spareRequest.fullName }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Description</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ spareRequest.description }}</span>
            </v-row>
            <v-row>
              <span class="text-h6">Date</span>
            </v-row>
            <v-row class="mb-3">
              <span> {{ spareRequest.date }}</span>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="openSpareRequest = false"
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
  name: "Spare-parts-requests",
  data() {
    return {
      headers: [
        { text: 'Name of technician', align: 'start', sortable: false, value: 'fullName' },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      spareRequests: [],
      search: '',
      openSpareRequest: false,
      spareRequest: {
        fullName: "",
        description: "",
        technicianId: "",
        date: ""
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
    async retrieveTechnicians() {
      let technicians = [];
      await TechnicianApiService.getAll()
          .then(response => {
            technicians = response.data.map(this.getTechnician);
          })
          .catch(e => {
            console.log(e);
          });
      return technicians;
    },
    async retrieveSpareRequests() {
      let technicians = await this.retrieveTechnicians();

      for (let technician of technicians) {
        await TechnicianApiService.getSpareRequests(technician.id)
          .then(response => {
            const spareRequestsOfTechnician = response.data.map(spareRequest => {
              const technicianFullName = {
                fullName: `${technician.names} ${technician.lastnames}`
              }
              return Object.assign(spareRequest, technicianFullName);
            })

            this.spareRequests = this.spareRequests.concat(spareRequestsOfTechnician);
          })
          .catch(e => {
            console.log(e);
          });
      }

      console.log(this.spareRequests);
    },
    seeSpareRequest(item) {
      this.spareRequest = Object.assign({}, item);
      this.openSpareRequest = true;
    }
  },
  mounted() {
    this.retrieveSpareRequests();
  }
}
</script>

<style scoped>

</style>