import Vue from 'vue'
import VueRouter from 'vue-router'
import InformationBase from '../views/InformationBase.vue'
import InformationBaseManagement from '../views/InformationBaseManagement.vue'
import AllcurrentEvents from '../views/AllCurrentEvents.vue'
import MyEvents from '../views/MyEvents.vue'
import MyEventsArchive from '../views/MyEventsArchive.vue'
import AllEventsArchive from '../views/AllEventsArchive.vue'
import PrivilegeManagement from '../views/PrivilegeManagement.vue'
import BuildingFloors from '../components/BuildingFloors.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: InformationBase
  },
  {
    path: '/informationbasemanagement',
    name: 'information base management',
    component: InformationBaseManagement
  },
  {
    path: '/allcurrentevents',
    name: 'all current events',
    component: AllcurrentEvents
  },
  {
    path: '/alleventsarchive',
    name: 'all events archive',
    component: AllEventsArchive
  },
  {
    path: '/informationbase',
    name: 'InformationBase',
    component: InformationBase

  },
  {
    path: '/privilegemanagement',
    name: 'privilege management',
    component: PrivilegeManagement
  },
  {
    path: '/buildingfloors',
    name: 'building floors',
    component: BuildingFloors
  },
  {
    path: '/myevents',
    name: 'my events',
    component: MyEvents
  },
  {
    path: '/myeventsarchive',
    name: 'my events archive',
    component: MyEventsArchive
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



