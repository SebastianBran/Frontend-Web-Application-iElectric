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
        <v-col cols="12">
                <v-text-field
                    label="Fecha de atencion*"
                    required
                    outlined
                    v-model="item.date_atention"
                ></v-text-field>
              </v-col>
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
              color="green darken-1"
              text
              @click="Dialogpost= true"
          >
            Posponer
          </v-btn>
          <v-btn
              v-if="edit"
              color="red darken-1"
              text
              @click="dialogDelete = true"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-dialog
          v-model="dialogDelete"
          persistent
          max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Cancelar reserva
          </v-card-title>
          <v-card-text>¿Está seguro de cancelar la reserva?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="dialogDelete = false"
            >
              Cerrar
            </v-btn>
            <v-btn
                color="red darken-1"
                text
                @click="deleteBrand"
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-dialog
          v-model="Dialogpost"
          persistent
          max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Posponer reserva
          </v-card-title>
          <v-card-text>¿Está seguro de posponer la reserva?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="Dialogpost = false"
            >
              Cerrar
            </v-btn>
            <v-btn
                color="red darken-1"
                text
                @click="postreserve"
            >
              Posponer
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
  name: "Reserve-dialog",
  props: {
    dialog: Boolean,
    edit: Boolean,
    title: String,
    item: Object
  },
  data() {
    return {
      dialogDelete: false,
      Dialogpost: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    postreserve() {
      if (!this.edit) {
        this.item.id = uuidv4();
        this.item.date_atention = "date_atention";
      }

      this.$emit("brand-information", this.item);
    },
    deleteBrand() {
      this.$emit("delete-brand", this.item.id);
      this.dialogDelete = false;
    },
  }
}
</script>

<style scoped>

</style>