import InformationBase from '../views/InformationBase.vue'
import InformationBaseManagement from '../views/InformationBaseManagement.vue'
import AllcurrentEvents from '../views/AllCurrentEvents.vue'
import MyEvents from '../views/MyEvents.vue'
import MyEventsArchive from '../views/MyEventsArchive.vue'
import AllEventsArchive from '../views/AllEventsArchive.vue'
import PrivilegeManagement from '../views/PrivilegeManagement.vue'
import BuildingFloors from '../components/informationbase/BuildingFloors.vue'
import UserEvents from '../components/eventsmanagement/UserEvents.vue'
import Supervees from '../views/Supervees.vue'
import FloorRooms from '../components/informationbase/FloorRooms.vue'

export const routes = [
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
    name: 'myevents',
    component: MyEvents
  },
  {
    path: '/alleventsarchive',
    name: 'all events archive',
    component: AllEventsArchive
  },
  {
    path: '/myeventsarchive',
    name: 'myeventsarchive',
    component: MyEventsArchive
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
    path: '/informationbase/buildings/:bid/floors',
    name: 'building floors',
    component: BuildingFloors
  },
  {
    path: '/informationbase/buildings/:bid/floors/:fid/rooms',
    name: 'room',
    component: FloorRooms

  },
  {
    path: '/informationbasemanagement',
    name: 'information base management',
    component: InformationBaseManagement
  },
  {
    path: '/userevents/:uid',
    name: 'userevents',
    component: UserEvents
  },
  {
    path: '/supervees/:modid',
    name: 'supervees',
    component: Supervees
  }

]
