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
                    label="Nombre*"
                    required
                    outlined
                    v-model="item.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                    accept="image/*"
                    label="File input"
                    prepend-icon="mdi-camera"
                    outlined
                ></v-file-input>
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
              v-if="edit"
              color="red darken-1"
              text
              @click="dialogDelete = true"
          >
            Eliminar
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

    <!-- Delete Bran Dialog -->
    <v-row>
      <v-dialog
          v-model="dialogDelete"
          persistent
          max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Eliminar marca
          </v-card-title>
          <v-card-text>¿Está seguro de eliminar la marca?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="dialogDelete = false"
            >
              Cancelar
            </v-btn>
            <v-btn
                color="red darken-1"
                text
                @click="deleteBrand"
            >
              Eliminar
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
  name: "Appliance-dialog",
  props: {
    dialog: Boolean,
    edit: Boolean,
    title: String,
    item: Object
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
        this.item.imagePath = "image.png";
      }

      this.$emit("brand-information", this.item);
    },
    deleteBrand() {
      this.$emit("delete-brand", this.item.id);
      this.dialogDelete = false;
    }
  }
}
</script>

<style scoped>

</style>