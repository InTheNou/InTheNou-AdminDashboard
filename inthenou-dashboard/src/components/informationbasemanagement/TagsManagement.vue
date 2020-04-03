<template>
  <v-container class="grey lighten-5 mb-6" >
    <v-card class="pa-2" outlined tile >
    <v-card class="justify-center" >
      <v-img src="https://image.flaticon.com/icons/svg/1946/1946422.svg" aspect-ratio="1.7" contain></v-img>
      <v-card-title class="headline justify-center" >Tags</v-card-title>
      <v-dialog v-model="editServiceDialog" persistent max-width="900px">
        <template v-slot:activator="{ on }">
          <v-row  justify="center">
            <v-btn color="primary mb-5 pa-0" dark v-on="on" class="mx-2" fab>
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-row>
        </template>
        <v-card>
          <v-card-title>New Tag Form</v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation class="ma-6" >
            <v-row>
              <v-col cols="4">
                <v-text-field v-model="name" :counter="10" :rules="[ v => !!v || 'Tag is required', v => (v && v.length <= 10) || 'Tag must be less than 10 characters' ]" label="Tag" filled required ></v-text-field>
              </v-col>
              <v-col>
                <v-btn @click="addWebsiteToList()" color="primary mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
                <v-btn @click="removeWebsiteFromList()" color="red mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="websitesList" label="Tag List" filled readonly ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-btn color="success" class="mr-4" @click="editServiceDialog = false" >
                  Cancel
                </v-btn>
                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                  Create
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-dialog>
    </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    editServiceDialog: null,
    valid: true,
    name: null,
    description: null,
    schedule: null,
    website: null,
    websites: [],
    websitesList: [],
    phoneNumber: null,
    phoneType: null,
    phoneNumbers: [],
    phoneNumbersList: [],
    buildingID: [],
    floor: null,
    roomID: null
  }),
  methods: {
    createService: function () {

    },
    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>
