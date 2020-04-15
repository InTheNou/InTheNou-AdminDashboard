var offset = 0
var limit = 5

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
export { offset, limit, previous, next }
