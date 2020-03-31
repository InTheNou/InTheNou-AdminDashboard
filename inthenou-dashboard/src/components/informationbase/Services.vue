<template>
<div>
  <v-container
      class="grey lighten-5 mb-6"
    >
      <v-row
        align ="center"
        justify="center"
        no-gutters
        style="height: 150px;"
      >
        <v-col cols="4" >
          <v-card
            class="pa-2"
            outlined
            tile
          >
           <v-card class="justify-center" >
            <v-img src="https://image.flaticon.com/icons/svg/950/950299.svg" aspect-ratio="1.7" contain></v-img>
            <v-card-title class="headline justify-center" >Service</v-card-title>
              <v-card-actions>
                <v-col cols="12">
                  <v-dialog v-model="editServiceDialog" persistent max-width="900px">
                    <template v-slot:activator="{ on }">
                        <div class="text-right">
                        <v-btn color="primary mb-0 pa-0" dark v-on="on" class="mx-2" fab>
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                        </div>
                    </template>
                    <v-card>
                      <v-card-title>New Service Form</v-card-title>
                        <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                          class="ma-6"
                        >
                        <v-row>
                          <v-col cols="4">
                            <v-text-field
                              v-model="name"
                              :counter="10"
                              :rules="[ v => !!v || 'Name is required', v => (v && v.length <= 10) || 'Name must be less than 10 characters' ]"
                              label="Name"
                              filled
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              v-model="schedule"
                              :counter="10"
                              :rules="[ v => !!v || 'Schedule is required', v => (v && v.length <= 10) || 'Schedule must be less than 10 characters' ]"
                              label="Schedule"
                              filled
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="5">
                            <v-text-field
                              v-model="phoneNumber"
                              :rules="[ ]"
                              label="Phone"
                              hint=" phone number: ###-###-####   phone with extentions: ###-###-####, ####"
                              filled
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-select
                            v-model="phoneType"
                            :items="['extension','mobile','frame']"
                            :rules="[v => !!v || 'Item is required']"
                            label="Item"
                            filled
                            required
                            ></v-select>
                          </v-col>
                          <v-btn @click="addNumberToList" color="primary mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                             <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                          <v-btn @click="removeNumberFromList" color="red mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                             <v-icon dark>mdi-minus</v-icon>
                          </v-btn>
                         <v-col cols="6">
                          <v-textarea
                              v-model="phoneNumbersList"
                              label="Phone List"
                              filled
                              readonly
                            ></v-textarea>
                          </v-col>
                        </v-row>
                         <v-row>
                          <v-col cols="9">
                            <v-text-field
                              v-model="website"
                              label="Website"
                              hint=" www.abc.uprm.edu"
                              filled
                            ></v-text-field>
                          </v-col>
                          <v-btn @click="addWebsiteToList()" color="primary mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                             <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                          <v-btn @click="removeWebsiteFromList()" color="red mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                             <v-icon dark>mdi-minus</v-icon>
                          </v-btn>
                         <v-col cols="12">
                          <v-textarea
                              v-model="websitesList"
                              label="Websites List"
                              filled
                              readonly
                            ></v-textarea>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-textarea
                            v-model="description"
                            :rules="[ v => !!v || 'Description is required', v => (v && v.length <= 400) || 'Description must be less than 400 characters' ]"
                            label="Description"
                            filled
                            required
                          ></v-textarea>
                        </v-row>
                          <v-btn
                            color="success"
                            class="mr-4"
                            @click="editServiceDialog = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4"
                            @click="validate"
                          >
                            Create
                          </v-btn>
                        </v-form>
                    </v-card>
                  </v-dialog>
                </v-col>
             </v-card-actions>
          </v-card>
          </v-card>

        </v-col>
      </v-row>
    </v-container>

 </div>
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
    },
    addNumberToList: function () {
      var contains = false
      for (var i = 0; i < this.phoneNumbers.length; i++) {
        if (this.phoneNumbers[i].Number === this.phoneNumber) contains = true
        else contains = false
      }
      // regex for ###-###-#### or ###-###-####,####
      if (this.phoneNumber != null && ((this.phoneNumber.match(/^(\d{3})[-](\d{3})[-](\d{4})$/) && this.phoneType === 'mobile') || (this.phoneNumber.match(/^(\d{3})[-](\d{3})[-](\d{4})$/) && this.phoneType === 'frame') || (this.phoneNumber.match(/^(\d{3})[-](\d{3})[-](\d{4})([,](\d{4}))$/) && this.phoneType === 'extension')) && this.phoneNumbers.length < 10 && !contains) {
        var phone = {}
        phone.Number = this.phoneNumber.toString()
        phone.Type = this.phoneType
        this.phoneNumbers.push(phone)
        this.phoneNumbersList = JSON.stringify(this.phoneNumbers)
      }
    },
    removeNumberFromList: function () {
      if (this.phoneNumbers.length > 0) {
        this.phoneNumbers.pop()
        this.phoneNumbersList = JSON.stringify(this.phoneNumbers)
      }
    },
    addWebsiteToList: function () {
      var contains = false
      for (var i = 0; i < this.websites.length; i++) {
        console.log(this.websites[i].URL)
        if (this.websites[i].URL === this.website) contains = true
        else contains = false
      }
      // regex for ###-###-#### or ###-###-####,####
      if (this.website != null && (this.website.match(/^(((https:\/\/)|(http:\/\/))[a-zA-z]*[.]?(uprm.edu)(.*))$/)) && this.websites.length < 10 && !contains) {
        var website = {}
        website.URL = this.website.toString()
        this.websites.push(website)
        this.websitesList = JSON.stringify(this.websites)
      }
    },
    removeWebsiteFromList: function () {
      if (this.websites.length > 0) {
        this.websites.pop()
        this.websitesList = JSON.stringify(this.websites)
      }
    }
  }
}
</script>
