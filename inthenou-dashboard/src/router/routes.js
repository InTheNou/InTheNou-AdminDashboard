
import Login from '../components/auth/login.vue'
import InformationBase from '../views/InformationBase.vue'
import serviceManagement from '../views/ServiceManagement.vue'
import Events from '../views/Events.vue'
import PrivilegeManagement from '../views/PrivilegeManagement.vue'
import Moderators from '../views/Moderators.vue'
import EventCreators from '../views/EventCreators.vue'
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
import LoginFail from '../components/auth/Fail.vue'
import PageNotFound from '../components/utils/PageNotFound.vue'

export const routes = [
  {
    path: '/',
    name: 'login',
    component: Login

  },
  {
    path: '/login/failed',
    name: 'login failed',
    component: LoginFail
  },
  {
    path: '/events/:eventtype',
    name: 'events',
    component: Events
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
    path: '/informationbase/buildings/:bid',
    name: 'building details',
    component: BuildingDetails
  },
  {
    path: '/informationbase/buildings/:bid/floors/:fid/rooms',
    name: 'room',
    component: FloorRooms
  },
  {
    path: '/informationbase/buildings/:bid/floors/:fid/rooms/:rid/services',
    name: 'room services',
    component: RoomServices
  },
  {
    path: '/servicemanagement',
    name: 'service management',
    component: serviceManagement
  },
  {
    path: '/delegatedusers/:modid',
    name: 'delegated users',
    component: DelegatedUsers
  },
  {
    path: '/userevents/:uid',
    name: 'user events',
    component: UserEvents
  },
  {
    path: '/search/:searchtype/:keyword',
    name: 'search',
    component: Search
  },
  {
    path: '/informationbase/servicedetails/:sid',
    name: 'service',
    component: ServiceDetail
  },
  {
    path: '/tagsmanagement',
    name: 'tags',
    component: TagsManagement
  },
  {
    path: '/roomscoordinatesmanagement',
    name: 'room coordinates management',
    component: RoomsCoordinatesManagement
  },
  {
    path: '/eventsmanagement/eventdetails/:eventtype/event/:eid',
    name: 'event details',
    component: EventDetails
  },
  {
    path: '/privilegemanagement/moderators',
    name: 'moderators',
    component: Moderators
  },
  {
    path: '/privilegemanagement/eventcreators',
    name: 'event creators',
    component: EventCreators
  },
  {
    path: '*',
    component: PageNotFound
  }
]
