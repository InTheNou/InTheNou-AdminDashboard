/* eslint-disable */
import Login from '../components/auth/login.vue'
import InformationBase from '../views/InformationBase.vue'
import serviceManagement from '../views/ServiceManagement.vue'
import Events from '../views/Events.vue'
import PrivilegeManagement from '../views/PrivilegeManagement.vue'
import BuildingDetails from '../views/BuildingDetails.vue'
import FloorRooms from '../views/FloorRooms.vue'
import RoomServices from '../views/RoomServices.vue'
import DelegatedUsers from '../views/DelegatedUsers.vue'
import UserEvents from '../views/UserEvents.vue'
import Search from '../views/Search.vue'
import ServiceDetail from '../views/ServiceDetail.vue'
import TagsManagement from '../views/TagsManagement.vue'
import RoomsCoordinatesManagement from '../views/RoomsCoordinatesManagement.vue'
import EventDetails from '../views/EventDetails.vue'
import store from '../store/Store.js'

const ifIsNotAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next('/allcurrentevents')
  } else if (from.path !== '/' && to.path !== '/') {
    next('/')
  }
}
const ifIsAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
  } else {
    next('/')
  }
}
export const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    // beforeEnter: ifIsNotAuthenticated
  },
  {
    path: '/events/:eventtype',
    name: 'events',
    component: Events,
    // beforeEnter: ifIsAuthenticated
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
    path: '/informationbase/buildings/:bid',
    name: 'building details',
    component: BuildingDetails,
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
    name: 'room services',
    component: RoomServices,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/servicemanagement',
    name: 'service management',
    component: serviceManagement,
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
  },
  {
    path: '/search/:searchtype/:keyword',
    name: 'search',
    component: Search,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/informationbase/servicedetails/:sid',
    name: 'service',
    component: ServiceDetail,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/tagsmanagement',
    name: 'tags',
    component: TagsManagement,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/roomscoordinatesmanagement',
    name: 'room coordinates management',
    component: RoomsCoordinatesManagement,
    beforeEnter: ifIsAuthenticated
  },
  {
    path: '/eventsmanagement/eventdetails/:eventtype/event/:eid',
    name: 'event details',
    component: EventDetails,
    beforeEnter: ifIsAuthenticated
  }
]
/* eslint-enable */
