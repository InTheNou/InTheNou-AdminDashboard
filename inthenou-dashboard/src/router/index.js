import Vue from 'vue'
import VueRouter from 'vue-router'
import InformationBase from '../views/InformationBase.vue'
import InformationBaseManagement from '../views/InformationBaseManagement.vue'
import AllcurrentEvents from '../views/AllCurrentEvents.vue'
import MyEvents from '../views/MyEvents.vue'
import MyEventsArchive from '../views/MyEventsArchive.vue'
import AllEventsArchive from '../views/AllEventsArchive.vue'
import PrivilegeManagement from '../views/PrivilegeManagement.vue'
import BuildingFloors from '../components/informationbase/BuildingFloors.vue'
import UserEvents from '../components/eventsmanagement/UserEvents.vue'
import FloorRooms from '../components/informationbase/FloorRooms.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: InformationBase
  },
  {
    path: '/allcurrentevents',
    name: 'all current events',
    component: AllcurrentEvents
  },
  {
    path: '/myevents',
    name: 'my events',
    component: MyEvents
  },
  {
    path: '/alleventsarchive',
    name: 'all events archive',
    component: AllEventsArchive
  },
  {
    path: '/privilegemanagement',
    name: 'privilege management',
    component: PrivilegeManagement
  },
  {
    path: '/informationbase',
    name: 'InformationBase',
    component: InformationBase

  },
  {
    path: '/informationbasemanagement',
    name: 'information base management',
    component: InformationBaseManagement
  },
  {
    path: '/informationbase',
    name: 'home',
    component: InformationBase
  },
  {
    path: '/informationbase/buildings/:bid/floors',
    name: 'building floors',
    component: BuildingFloors
  },
  {
    path: '/myeventsarchive',
    name: 'my events archive',
    component: MyEventsArchive
  },
  {
    path: '/userevents/:uid',
    name: 'user events',
    component: UserEvents,
    props: true

  },
  {
    path: 'informationbase/buildings/:bid/floors',
    name: 'room',
    component: FloorRooms,

  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
