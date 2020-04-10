import { eventsApiCall } from '../../dummyapicals/events.js'

var uid = null
var offsetTop = 0
var eidtoremove = null
var etitletoremove = null
var offset = 0
var limit = 5
var dialog = false
var listofevents = []
var path = ''
var path1 = ''

function onScroll (e) {
  this.offsetTop = e.target.scrollTop
}

function getEvents (offset, limit) {
  return new Promise((resolve, reject) => {
    eventsApiCall({ url: this.path + '/offset=' + offset + '/limit=' + limit, method: 'GET' })
      .then(response => {
        resolve(this.listofevents = response.Events)
        // console.log(response)
      })
      .catch(err => {
        reject(err)
        alert(err)
      })
  })
}

function getNumberOfEvents () {
  return new Promise((resolve, reject) => {
    // console.log(this.path1)
    eventsApiCall({ url: this.path1, method: 'GET' })
      .then(response => {
        resolve(response.size)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function deleteEvent () {
  // Route: /Events/{EID:INT}/User/{UID:INT}/Delete
  // EID: Id of event to be deleted.
  // UID: id of the user deleting event, save in the central app store when user login.
  for (var i = 0; (i < this.listofevents.length); i++) {
    if (this.listofevents[i].EID === this.eidtoremove) {
      this.listofevents.splice(i, 1)
    }
  }
  this.dialog = false
}

function previous () {
  //
  if ((this.offset - this.limit) >= 0) {
    this.offset -= this.limit
    this.listofevents = this.getEvents(this.offset, this.limit)
  }
}

async function next () {
  //
  if ((this.offset + this.limit) < await this.getNumberOfEvents()) {
    this.offset += this.limit
    this.listofevents = this.getEvents(this.offset, this.limit)
  }
}

export { onScroll, getEvents, getNumberOfEvents, previous, next, uid, offsetTop, eidtoremove, etitletoremove, offset, limit, dialog, listofevents, deleteEvent, path, path1 }
