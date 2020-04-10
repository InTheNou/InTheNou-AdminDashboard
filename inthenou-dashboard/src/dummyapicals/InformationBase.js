const mocks = {
  '/informationbase/buildings/1/floors/1/rooms': {
    GET: {
      Room: [
        { RID: 1, rCode: 'S100', rFloor: 1, rDescription: 'some text', rOccupancy: 34, rCustodian: 'some email', bName: 'some name' },
        { RID: 2, rCode: 'S101', rFloor: 1, rDescription: 'some text', rOccupancy: 34, rCustodian: 'some email', bName: 'some name' },
        { RID: 3, rCode: 'S102', rFloor: 1, rDescription: 'some text', rOccupancy: 34, rCustodian: 'some email', bName: 'some name' },
        { RID: 4, rCode: 'S103', rFloor: 1, rDescription: 'some text', rOccupancy: 34, rCustodian: 'some email', bName: 'some name' },
        { RID: 5, rCode: 'S104', rFloor: 1, rDescription: 'some text', rOccupancy: 34, rCustodian: 'some email', bName: 'some name' }
      ]
    }
  },
  '/informationbase/buildings': {
    GET: {
      Building: [
        { BID: 1, Name: 'Stefanie', Abbreviation: 'S', NumFloors: 6, CommonName: 'stef', Type: 'no administrativo', bPhoto: 'https://via.placeholder.com/250' },
        { BID: 2, Name: 'Chardon', Abbreviation: 'S', NumFloors: 4, CommonName: 'stef', Type: 'no administrativo', bPhoto: 'https://via.placeholder.com/250' },
        { BID: 3, Name: 'edificio 3', Abbreviation: 'S', NumFloors: 3, CommonName: 'stef', Type: 'no administrativo', bPhoto: 'https://via.placeholder.com/250' },
        { BID: 4, Name: 'edifico 4', Abbreviation: 'S', NumFloors: 2, CommonName: 'stef', Type: 'no administrativo', bPhoto: 'https://via.placeholder.com/250' },
        { BID: 5, Name: 'edificio 5', Abbreviation: 'S', NumFloors: 1, CommonName: 'stef', Type: 'no administrativo', bPhoto: 'https://via.placeholder.com/250' }
      ]
    }
  },
  '/informationbase/buildings/1/floors/1/rooms/1/services': {
    GET: {
      Service: [
        { rid: 56, sdescription: 'Capstone TA Office Hours; Available to answer questions.', sid: 1, sname: 'Office Hours: Victor Lugo', sschedule: 'L, W: 9:30am - 10:30am' },
        { rid: 56, sdescription: 'Capstone TA Office Hours; Available to answer questions.', sid: 2, sname: 'Office Hours: David Riquelme', sschedule: 'M, V: 2:30pm - 3:30pm' },
        { rid: 151, sdescription: 'Office Hours to discuss class topics, and consult with Capstone Team.', sid: 3, sname: 'Office Hours: Fernando Vega', sschedule: 'L: 3:30pm - 4:30pm, W: 1:30pm - 3:30pm' },
        { rid: 134, sdescription: 'Counseling and guidance for students with regards to their academic carreers and progress.', sid: 4, sname: 'ECE Counseling', sschedule: 'L-V: 7:30am-12:30pm, 1:30pm-4:30pm' }
      ]
    }
  }
}

const infobaseApiCall = ({ url, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mocks[url][method])
        // console.log(`Mocked '${url}' - ${method}`)
        // console.log('response: ', mocks[url][method])
      } catch (err) {
        reject(new Error(err + '\n Path not found:' + url))
      }
    }, 100)
  })

export { infobaseApiCall }
