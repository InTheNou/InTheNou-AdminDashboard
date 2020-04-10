<template>
  <v-container class="grey lighten-5 mb-6" >
    <v-card class="pa-2" outlined tile >
    <v-card class="justify-center" >
      <v-img src="https://image.flaticon.com/icons/svg/1946/1946422.svg" aspect-ratio="1.7" contain></v-img>
      <v-card-title class="headline justify-center" >Tags</v-card-title>
      <v-dialog v-model="editTagDialog" persistent max-width="900px">
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
                <v-text-field v-model="tagFormInput" :counter="10" :rules="[ v => !!v || 'Tag is required', v => (v && v.length <= 10) || 'Tag must be less than 10 characters' ]" label="Tag" filled required ></v-text-field>
              </v-col>
              <v-col>
                <v-btn @click="addTagToList()" color="primary mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
                <v-btn @click="removeTagFromList()" color="red mb-0 mt-3 pa-0 " dark  class="mx-2" fab>
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="tagList" label="Tag List" filled readonly ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-btn color="success" class="mr-4" @click="editTagDialog = false" >
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
    valid: true,
    tagFormInput: null,
    editTagDialog: null,
    tags: [],
    tagList: []
  }),
  methods: {
    addTagToList: function () {
      var contains = false
      for (var i = 0; i < this.websites.length; i++) {
        // console.log(this.tagList[i].URL)
        if (this.tagList[i].Tag === this.tagFormInput) contains = true
        else contains = false
      }
      // regex for ###-###-#### or ###-###-####,####
      if (this.tagFormInput != null && this.tagFormInput.length < 10 && !contains) {
        var tag = {}
        tag.URL = this.tagFormInput.toString()
        this.tagList.push(tag)
        this.tagList = JSON.stringify(this.tagList)
      } else {
        alert('1.The entered number must be valid \n 2.A type must be selected ')
      }
    },
    removeTagFromList: function () {
      if (this.websites.length > 0) {
        this.websites.pop()
        this.websitesList = JSON.stringify(this.websites)
      }
    },
    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>
