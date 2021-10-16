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
                v-model="item.email"
                :rules="[rules.required, rules.email]"
                label="Email"
                outlined
                ></v-text-field>
              </v-col>

             <v-col cols="12">
               <v-text-field
                v-model="item.password"
                :rules="[rules.required, rules.password, rules.passwordLength]"
                name="input-password"
                label="Password"
                outlined
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
      Saveprofile: false,
      showPassword: false,
      rules: {
        required: v => !!v || 'Required',
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || 'Invalid e-mail.';
        },
        password: v => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
          return pattern.test(v) || 'The password must have at least one capital letter and one number';
        },
        cellphoneNumber: v => {
          const pattern = /^(9)([0-9]){8}$/
          return pattern.test(v) || 'Wrong number';
        },
        passwordLength: v => v.length >= 8 || 'Min 8 characters',
        maxLength30: v => v.length <= 30 || 'Max 30 characters',
        maxLength50: v => v.length <= 50 || 'Max 50 characters'
      }
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
  },
}
</script>

<style scoped>

</style>