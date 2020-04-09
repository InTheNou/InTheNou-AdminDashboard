import Login from '../components/auth/login.vue'
import InformationBase from '../views/InformationBase.vue'
import InformationBaseManagement from '../views/InformationBaseManagement.vue'
import AllcurrentEvents from '../views/AllCurrentEvents.vue'
import MyEvents from '../views/MyEvents.vue'
import MyEventsArchive from '../views/MyEventsArchive.vue'
import AllEventsArchive from '../views/AllEventsArchive.vue'
import PrivilegeManagement from '../views/PrivilegeManagement.vue'
import BuildingFloors from '../views/BuildingFloors.vue'
import FloorRooms from '../views/FloorRooms.vue'
import RoomServices from '../views/RoomServices.vue'
import DelegatedUsers from '../views/DelegatedUsers.vue'
import UserEvents from '../views/UserEvents.vue'
import store from '../store/Store.js'

const ifIsNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
  }
  next('/')
}
const ifIsAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}
export const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: ifIsNotAuthenticated
  },
  {
    path: '/allcurrentevents',
    name: 'all current events',
    component: AllcurrentEvents,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/myevents',
    name: 'myevents',
    component: MyEvents,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/alleventsarchive',
    name: 'all events archive',
    component: AllEventsArchive,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/myeventsarchive',
    name: 'myeventsarchive',
    component: MyEventsArchive,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/privilegemanagement',
    name: 'privilege management',
    component: PrivilegeManagement,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/informationbase',
    name: 'InformationBase',
    component: InformationBase,
    beforeEnter: ifIsAuthenticated

  },
  {
    path: '/informationbase/buildings/:bid/floors/:numfloors',
    name: 'building floors',
    component: BuildingFloors,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/informationbase/buildings/:bid/floors/:fid/rooms',
    name: 'room',
    component: FloorRooms,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/informationbase/buildings/:bid/floors/:fid/rooms/:rid/services',
    name: 'room',
    component: RoomServices,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/informationbasemanagement',
    name: 'information base management',
    component: InformationBaseManagement,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/delegatedusers/:modid',
    name: 'delegated users',
    component: DelegatedUsers,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/userevents/:uid',
    name: 'user events',
    component: UserEvents,
    beforeEnter: ifIsAuthenticated
  }

]
