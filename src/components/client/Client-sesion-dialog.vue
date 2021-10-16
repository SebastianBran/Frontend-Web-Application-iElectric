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
                    label="Email*"
                    required
                    outlined
                    v-model="item.email"
                ></v-text-field>
              </v-col>

            <v-col cols="12">
                <v-text-field
                    label="Pasword*"
                    required
                    outlined
                    v-model="item.password"
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
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="Saveprofile= true"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-dialog
          v-model="Saveprofile"
          persistent
          max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Edit Sesion
          </v-card-title>
          <v-card-text>Are you sure to change the user information?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="Saveprofile = false"
            >
              Close
            </v-btn>
            <v-btn
                color="red darken-1"
                text
                @click="saveInformation2"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </v-row>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Client-sesion-dialog",
  props: {
    dialog: Boolean,
    edit: Boolean,
    title: String,
    item: Object,
  },
  data() {
    return {
      dialogDelete: false,
      Saveprofile: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    saveInformation2() {
      if (!this.edit) {
        this.item.id = uuidv4();
      }

      this.$emit("client-sesion-information", this.item);
    },
    deleteProfile() {
      this.$emit("delete-client-sesion", this.item.id);
      this.dialogDelete = false;
    }
  },
}
</script>

<style scoped>

</style>