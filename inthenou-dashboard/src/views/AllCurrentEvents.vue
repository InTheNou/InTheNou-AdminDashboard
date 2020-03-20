<template>
  <v-card
    class="d-flex pa-2"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="event in events"
          :key="event.EID"
          :cols="6"
        >
          <v-card >
            <v-card-title class="headline blue darken-4 white--text">Title: {{event.Title}}
              <v-spacer></v-spacer>
              <v-btn large text color="grey">
                  <v-icon large right>mdi-delete-forever</v-icon>
              </v-btn>  
            </v-card-title>
            <v-card-subtitle class="pt-0 pb-0  ma-0">Description: {{event.Description}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Time: {{event.StartTimeDate}}-{{event.EndTimeDate}} </v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Created: {{event.CreationDate}}</v-card-subtitle>
            <v-card-subtitle class="pt-0 pb-0 ma-0">Location: {{event.Room}}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<script>
  export default {
    data: () => ({
      events: [
        { EID: 'E1',Title: "IEE", Description: "Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros",StarTimeDate:"1:00 pm, abril 15", EndTimeDate:"2:00pm, abril 15", CreationDate:"04 10 2020", Status:"true", StatusDate:"true",Room:"S-128"},
        { EID: 'E2',Title: "IEE", Description: "Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros",StarTimeDate:"1:00 pm, abril 15", EndTimeDate:"2:00pm, abril 15", CreationDate:"04 10 2020", Status:"true", StatusDate:"true",Room:"S-128"},      
        { EID: 'E3',Title: "IEE", Description: "Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros",StarTimeDate:"1:00 pm, abril 15", EndTimeDate:"2:00pm, abril 15", CreationDate:"04 10 2020", Status:"true", StatusDate:"true",Room:"S-128"},
        { EID: 'E4',Title: "IEE", Description: "Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros",StarTimeDate:"1:00 pm, abril 15", EndTimeDate:"2:00pm, abril 15", CreationDate:"04 10 2020", Status:"true", StatusDate:"true",Room:"S-128"},
        { EID: 'E5',Title: "IEE", Description: "Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros",StarTimeDate:"1:00 pm, abril 15", EndTimeDate:"2:00pm, abril 15", CreationDate:"04 10 2020", Status:"true", StatusDate:"true",Room:"S-128"},
        { EID: 'E6',Title: "IEE", Description: "Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros",StarTimeDate:"1:00 pm, abril 15", EndTimeDate:"2:00pm, abril 15", CreationDate:"04 10 2020", Status:"true", StatusDate:"true",Room:"S-128"},
        { EID: 'E7',Title: "IEE", Description: "Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros",StarTimeDate:"1:00 pm, abril 15", EndTimeDate:"2:00pm, abril 15", CreationDate:"04 10 2020", Status:"true", StatusDate:"true",Room:"S-128"},      
        { EID: 'E8',Title: "IEE", Description: "Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros",StarTimeDate:"1:00 pm, abril 15", EndTimeDate:"2:00pm, abril 15", CreationDate:"04 10 2020", Status:"true", StatusDate:"true",Room:"S-128"},
        { EID: 'E9',Title: "IEE", Description: "Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros",StarTimeDate:"1:00 pm, abril 15", EndTimeDate:"2:00pm, abril 15", CreationDate:"04 10 2020", Status:"true", StatusDate:"true",Room:"S-128"},
        { EID: 'E10',Title: "IEE", Description: "Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros",StarTimeDate:"1:00 pm, abril 15", EndTimeDate:"2:00pm, abril 15", CreationDate:"04 10 2020", Status:"true", StatusDate:"true",Room:"S-128"}
      ]
  }),
  }
</script>
