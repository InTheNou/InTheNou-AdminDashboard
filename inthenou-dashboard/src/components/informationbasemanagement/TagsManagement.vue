<template>
<v-container class="grey lighten-5 mb-6" style="max-width: 600px;">
      <v-text-field
            v-model="search"
            label="Search"
            class="mb-5"
            prepend-inner-icon="mdi-magnify"
            flat
            single-line
            hide-details
          ></v-text-field>
    <v-card class="justify-center" >
        <v-card >
            <v-data-table
              :headers="headers"
              :items="tagObjectsList"
              :search="search"
              class="elevation-1"
              max-heigth="500px"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Rooms</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-form
                    ref="form"
                    v-model="valid"
                    class="ma-6"
                  >
                  <v-dialog persistent v-model="dialog" max-width="400px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="#39b54a" dark class="mb-2" v-on="on">New Tag</v-btn>
                    </template>
                    <v-card >
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field v-model="editedTagObject.tname"
                              label="Tag name"
                              :counter="10"
                              :rules="[ v => !!v || 'Tag name is required', v => (v && v.length <= 10) || 'Name must be less than 10 characters' ]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#ff3e4c" text @click="close">Cancel</v-btn>
                        <v-btn color="#24324f" text :disabled="!valid"  @click="save">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-form>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editTagObject(item)"
                >
                  mdi-pencil
                </v-icon>
              </template>
            </v-data-table>
        </v-card>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    search: '',
    valid: false,
    dialog: false,

    headers: [
      { text: 'Tags', align: 'start', sortable: true, value: 'tname' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    tagObjectsList: [],
    editedTagObjectIndex: -1,
    editedTagObject: {
      tid: 0,
      tname: ''
    },
    defaultTagObject: {
      tid: 0,
      tname: ''
    }
  }),
  /**
   *
   */
  async created () {
    await this.fetchTags()
  },
  computed: {
    /**
     *
     */
    formTitle () {
      return this.editedTagObjectIndex === -1 ? 'New Tag' : 'Edit Tag'
    }
  },
  watch: {
    /**
     *
     */
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    /**
     *
     */
    validate: function () {
      this.$refs.form.validate()
      // if (this.valid) {
      //   this.save()
      // }
    },
    /**
     *
     */
    fetchTags: async function () {
      await fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_GET_TAGS)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.tagObjectsList = data.tags
        })
    },
    /**
     *
     */
    editTagObject (item) {
      this.editedTagObjectIndex = this.tagObjectsList.indexOf(item)
      this.editedTagObject = Object.assign({}, item)
      this.dialog = true
    },
    /**
     *
     */
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedTagObject = Object.assign({}, this.defaultTagObject)
        this.editedTagObjectIndex = -1
      })
    },
    /**
     *
     */
    save: async function () {
      if (this.editedTagObjectIndex > -1) {
        // the existing tag was edited
        this.editedTagObject.tname = this.editedTagObject.tname.toUpperCase()
        Object.assign(this.tagObjectsList[this.editedTagObjectIndex], this.editedTagObject)
        await fetch(
          process.env.VUE_APP_API_HOST + process.env.VUE_APP_EDIT_TAG_1 + this.editedTagObject.tid + process.env.VUE_APP_EDIT_TAG_2,
          {
            method: 'POST',
            mode: 'cors',
            credential: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tname: this.editedTagObject.tname })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error)
          })
      } else {
        // a new tag was created
        this.defaultTagObject.tname = this.defaultTagObject.tname.toUpperCase()
        this.tagObjectsList.push(this.editedTagObject)
        await fetch(
          process.env.VUE_APP_API_HOST + process.env.VUE_APP_CREATE_TAG,
          {
            method: 'POST',
            mode: 'cors',
            credential: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Tags: [{ tname: this.editedTagObject.tname }] })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then(data => {
            // this.editedTagObject.tid = data.tid // update to new websites urls
          })
          .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error)
          })
      }
      this.close()
    }
  }
}
</script>
