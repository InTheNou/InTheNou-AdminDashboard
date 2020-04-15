
function onScroll (e) {
  this.offsetTop = e.target.scrollTop
}
//  /Dashboard/Events/offset=<int:offset>/limit=<int:limit>
async function getEvents () {
  var newList
  console.log(this.path + '/offset=' + this.offset + '/limit=' + this.limit)
  await fetch(this.path + '/offset=' + this.offset + '/limit=' + this.limit)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      newList = data.events
    })
  return newList
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
  console.log(this.path)
  if ((this.offset - this.limit) >= 0) {
    if (this.disablenext === true) {
      this.disablenext = false
    }
    this.offset -= this.limit
    this.listofevents = this.getEvents(this.path, this.offset, this.limit)
  }
}

async function next (path) {
  this.offset += this.limit
  console.log(path)
  var newList = await this.getEvents(path, this.offset, this.limit)
  console.log('list length: ' + newList.length)

  this.listofevents = (newList !== null && newList.length > 0 ? newList : this.listofevents)
  if (newList.length === 0 || newList === null) {
    this.disablenext = true
  }
}

function formatDate (date) {
  var day = date.substring(8, 10)
  var month = date.substring(5, 7)
  var year = date.substring(0, 4)
  var hour = (date.substring(10, 13) < 12 ? date.substring(10, 13) + ':' + date.substring(14, 16) + ' AM' : (date.substring(10, 13) % 12 || 12) + ':' + date.substring(14, 16) + ' PM')

  return (' ' + day + '/' + month + '/' + year + ', ' + hour)
}

export { onScroll, getEvents, previous, next, deleteEvent, formatDate }
