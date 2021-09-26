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
        </v-card-actions>
      </v-card>


    </v-dialog>
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