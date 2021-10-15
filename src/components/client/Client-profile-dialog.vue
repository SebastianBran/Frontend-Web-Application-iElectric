<template>
  <v-row>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                
              <v-col cols="12">
                <v-text-field
                    label="Firstname*"
                    required
                    outlined
                    v-model="item.names"
                ></v-text-field>
              </v-col>
            <v-col cols="12">
                <v-text-field
                    label="Lastname*"
                    required
                    outlined
                    v-model="item.lastNames"
                ></v-text-field>
              </v-col>
              <v-col cols="12"> 
                <v-text-field
                    label="Adress*"
                    required
                    outlined
                    v-model="item.address"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Cellphone*"
                    required
                    outlined
                    v-model="item.cellphoneNumber"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Email*"
                    required
                    outlined
                    v-model="item.email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="closeDialog"
          >
            Cerrar
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="saveInformation"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Client-profile-dialog",
  props: {
    dialog: Boolean,
    edit: Boolean,
    title: String,
    item: Object,
    states: Array,
  },
  data() {
    return {
      dialogDelete: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    saveInformation() {
      if (!this.edit) {
        this.item.id = uuidv4();
      }

      this.$emit("client-profile-information", this.item);
    },
  },
}
</script>

<style scoped>

</style>