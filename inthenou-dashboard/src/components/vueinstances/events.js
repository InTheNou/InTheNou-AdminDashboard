var uid = null
var offsetTop = 0
var eidtoremove = null
var etitletoremove = null
var offset = 0
var limit = 5
var dialog = false
var listofevents = []
var remotedummyeventlist = [
  { EID: 'E1', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
  { EID: 'E2', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1574170609519-d1d8d4b71f60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
  { EID: 'E3', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
  { EID: 'E4', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
  { EID: 'E5', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
  { EID: 'E6', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
  { EID: 'E7', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
  { EID: 'E8', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
  { EID: 'E9', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' },
  { EID: 'E10', eTitle: 'IEE', eDescription: 'Ven y visitanos para saber mas sobre la IEE y como ser parte de nosostros', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://images.unsplash.com/photo-1585291945460-aa3222b4bc44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' }
]

function onScroll (e) {
  this.offsetTop = e.target.scrollTop
}

function getEvents (offset, limit) {
  // Route: /Events/{IgnoreFirst:INT}/{GetRows:INT}
  var listtoreturn = []
  for (var i = offset; (i < offset + limit) && (i < this.remotedummyeventlist.length); i++) {
    if (this.remotedummyeventlist[i] != null) listtoreturn.push(this.remotedummyeventlist[i])
  }
  return listtoreturn
}

function getNumberOfEvents () {
  return this.remotedummyeventlist.length
}

function previous () {
  //
  if ((this.offset - this.limit) >= 0) this.offset -= this.limit
  if ((this.offset - this.limit) > 0) this.offset -= this.limit
  this.listofevents = this.getEvents(this.offset, this.limit)
}

function next () {
  //
  console.log('here offset = ' + this.offset)
  console.log('offset + limit' + this.offset + this.limit)
  console.log(this.listofevents)
  console.log('thisgetNumberOfEvents' + this.getNumberOfEvents())
  if ((this.offset + this.limit) < this.getNumberOfEvents()) this.offset += this.limit
  console.log('updated offset = ' + this.offset)
  console.log('limit = ' + this.limit)
  console.log(this.getEvents(this.offset, this.limit))
  this.listofevents = this.getEvents(this.offset, this.limit)
}

export { onScroll, getEvents, getNumberOfEvents, previous, next, uid, offsetTop, eidtoremove, etitletoremove, offset, limit, dialog, listofevents, remotedummyeventlist }
