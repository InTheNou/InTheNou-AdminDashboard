
async function getEvents() {
    var newList
    await fetch(this.eventsApiPath)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            newList = data.events
        })
    return newList
}

async function deleteEvent() {
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
            console.log(response)
            // response.headers.forEach(console.log)
            return response.json()
        })
        .then(data => {
        })
    this.listofevents = await this.getEvents()
    this.dialog = false
}

async function previous() {
    if ((this.offset - this.limit) >= 0) {
        if (this.disablenext) this.disablenext = !this.disablenext
        this.offset -= this.limit
        this.listofevents = await this.getEvents()
    } else {
        this.disableprev = !this.disableprev
    }
}

async function next() {
    this.offset += this.limit
    var newList = await this.getEvents()
    if (newList == null || newList.length <= 0) {
        this.offset -= this.limit
        this.disablenext = !this.disablenext
    } else {
        this.disableprev = (this.disableprev ? !this.disableprev : this.disableprev)
        this.listofevents = newList
    }
}

function formatDate(date) {
    var day = date.substring(8, 10)
    var month = date.substring(5, 7)
    var year = date.substring(0, 4)
    var hour = (date.substring(10, 13) < 12 ? (date.substring(10, 13) % 12 || 12) + ':' + date.substring(14, 16) + ' AM' : (date.substring(10, 13) % 12 || 12) + ':' + date.substring(14, 16) + ' PM')

    return (' ' + day + '/' + month + '/' + year + ', ' + hour)
}

export { getEvents, previous, next, deleteEvent, formatDate }
