<template>
  <v-row justify="center">
    <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
    >

      <v-card ref="form">
        <v-card-text>
          <div>
            <picture-input
                ref="pictureInput"
                @change="onChange"
                width="200"
                height="200"
                margin="16"
                accept="image/jpeg,image/png"
                size="10"
                :removable="true"
                :customStrings="{
        drag: 'Drag or select a photo'
      }">
            </picture-input>
          </div>

          <v-text-field
              ref="appliance"
              v-model="appliance"
              :rules="[() => !!name || 'This field is required']"
              :error-messages="errorMessages"
              label="Appliance name"
              placeholder="Appliance"
              required
          ></v-text-field>
          <v-text-field
              ref="description"
              v-model="description"
              :rules="[
              () => !!description || 'This field is required',
            ]"
              label="Appliance description"
              placeholder="My appliance"
              required
          ></v-text-field>
          <v-text-field
              ref="trademark"
              v-model="trademark"
              :rules="[() => !!trademark || 'This field is required', addressCheck]"
              label="Trademark"
              placeholder="Trademark"
              required
          ></v-text-field>
          <v-text-field
              ref="model"
              v-model="model"
              :rules="[() => !!city || 'This field is required', addressCheck]"
              label="Model"
              placeholder="Model"
              required
          ></v-text-field>
          <v-text-field
              ref="year"
              v-model="year"
              :rules="[
              () => !!year || 'This field is required',
              () => !!year && year.length <= 4 || 'Address must be less than 4 characters',
              () => !!year && year  > 2010  || 'Athe year of purchase must be greater than 2010',
              () => !!year && year  <= 2021  || 'Athe year of purchase must be less than 2021',
              yearCheck
            ]"
              label="Year of purchase"
              required
              placeholder="2020"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
                v-if="formHasErrors"
                left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    class="my-0"
                    v-bind="attrs"
                    @click="resetForm"
                    v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
              class="ma-2 white--text"
              depressed
              color= #607D8B
              @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: "new-appliance",
  components: {
    PictureInput
  },

  methods: {
    onChange () {
      console.log('New picture selected!')
      if (this.$refs.pictureInput.image) {
        console.log('Picture loaded.')
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  }
}




</script>

<style scoped>
</style>
