
async function fetchEvents () {
  var newList
  await fetch(this.eventsApiPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      if (data.events === null) {
        newList = []
      } else {
        newList = newList = data.events
      }
    })
  return newList
}

async function deleteEvent () {
  await fetch(
    this.deleteEventApiPath,
    {
      method: 'POST',
      mode: 'cors',
      credential: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .catch()
    .then(response => {
    //   console.log(response)
    //   // response.headers.forEach(console.log)
      return response.json()
    })
    .then(data => {
    })
  this.listofevents = await this.fetchEvents()
  this.dialog = false
}

async function previous () {
  if ((this.offset - this.limit) >= 0) {
    if (this.disablenext) this.disablenext = !this.disablenext
    this.offset -= this.limit
    this.listofevents = await this.fetchEvents()
  } else {
    this.disableprev = !this.disableprev
  }
}

async function next () {
  this.offset += this.limit
  var newList = await this.fetchEvents()
  if (newList == null || newList.length <= 0) {
    this.offset -= this.limit
    this.disablenext = !this.disablenext
  } else {
    this.disableprev = (this.disableprev ? !this.disableprev : this.disableprev)
    this.listofevents = newList
  }
}

function formatDate (date) {
  if (date !== undefined && date !== null) {
    const utcDate = new Date(date.substring(0, 10) + 'T' + date.substring(11, 19) + 'Z')
    var time = (utcDate.toString().substring(16, 18) < 12 ? (utcDate.toString().substring(16, 18) % 12 || 12) + ':' + utcDate.toString().substring(19, 21) + ' AM' : (utcDate.toString().substring(16, 18) % 12 || 12) + ':' + utcDate.toString().substring(19, 21) + ' PM')
    return (utcDate.toUTCString().substring(0, 16) + ' ' + time)
  } else return date
}

function isPastDate (date) {
  if (date !== undefined && date !== null) {
    const utcDate = new Date(date.substring(0, 10) + 'T' + date.substring(11, 19) + 'Z')
    const utcDate2 = new Date()
    return (utcDate < utcDate2)
  } else return date
}
export { fetchEvents, previous, next, deleteEvent, formatDate, isPastDate }
