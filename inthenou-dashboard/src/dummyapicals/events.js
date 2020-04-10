const mocks = {
  '/Events/size': {
    GET: { size: 10 }
  },
  // this is a mock test for users with level 2 (moderator privilege)
  '/Events/offset=0/limit=5': {
    GET: {
      Events: [
        { EID: 1, eTitle: 'Evento 1', eDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 2, eTitle: 'Evento 2', eDescription: 'Diam donec adipiscing tristique risus nec feugiat in fermentum. ', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 3, eTitle: 'Evento 3', eDescription: 'In hendrerit gravida rutrum quisque. Id semper risus in hendrerit.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 4, eTitle: 'Evento 4', eDescription: 'Feugiat scelerisque varius morbi enim. Nec ultrices dui sapien eget mi proin sed libero enim.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 5, eTitle: 'Evento 5', eDescription: 'Massa id neque aliquam vestibulum morbi blandit.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' }
      ]
    }
  },
  '/Events/offset=5/limit=5': {
    GET: {
      Events: [
        { EID: 6, eTitle: 'Evento 6', eDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 7, eTitle: 'Evento 7', eDescription: 'In ante metus dictum at. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 8, eTitle: 'Evento 8', eDescription: 'Felis donec et odio pellentesque diam volutpat commodo. Odio ut sem nulla pharetra diam sit amet nisl.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 9, eTitle: 'Evento 9', eDescription: 'Nunc lobortis mattis aliquam faucibus purus in massa. Sagittis orci a scelerisque purus semper eget', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 10, eTitle: 'Evento 10', eDescription: 'Sit amet risus nullam eget felis eget nunc lobortis mattis.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' }
      ]
    }
  },
  '/Events/Past/size': {
    GET: { size: 7 }
  },
  // this is a mock test for users with level 2 (moderator privilege)
  '/Events/Past/offset=0/limit=5': {
    GET: {
      Events: [
        { EID: 1, eTitle: 'Evento 1', eDescription: 'Feugiat in fermentum posuere urna nec tincidunt praesent semper.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 0, eTitle: 'Evento 0', eDescription: 'Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 11, eTitle: 'Evento 11', eDescription: 'Mauris commodo quis imperdiet massa tincidunt nunc.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 12, eTitle: 'Evento 12', eDescription: 'Semper feugiat nibh sed pulvinar proin gravida hendrerit. ', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 13, eTitle: 'Evento 13', eDescription: 'Vehicula ipsum a arcu cursus. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' }
      ]
    }
  },
  '/Events/Past/offset=5/limit=5': {
    GET: {
      Events: [
        { EID: 6, eTitle: 'IEE', eDescription: 'Est velit egestas dui id ornare arcu odio ut sem. ', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 14, eTitle: 'IEE', eDescription: ' Nisi lacus sed viverra tellus. ', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 15, eTitle: 'IEE', eDescription: ' Id volutpat lacus laoreet non curabitur gravida arcu ac tortor.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' }
      ]
    }
  },
  '/Events/Myevents/size': {
    GET: { size: 3 }
  },
  // this is a mock test for users with level 2 (moderator privilege)
  '/Events/Myevents/offset=0/limit=5': {
    GET: {
      Events: [
        { EID: 6, eTitle: 'Evento 6', eDescription: 'Feugiat in fermentum posuere urna nec tincidunt praesent semper.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 7, eTitle: 'Evento 7', eDescription: 'Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 8, eTitle: 'Evento 8', eDescription: 'Mauris commodo quis imperdiet massa tincidunt nunc.', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' }
      ]
    }
  },
  '/Events/Myevents/Past/size': {
    GET: { size: 2 }
  },
  '/Events/Myevents/Past/offset=0/limit=5': {
    GET: {
      Events: [
        { EID: 6, eTitle: 'Event 6', eDescription: 'Est velit egestas dui id ornare arcu odio ut sem. ', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 14, eTitle: 'Event 14', eDescription: ' Nisi lacus sed viverra tellus. ', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' }
      ]
    }
  },
  '/Events/User/0/offset=0/limit=5': {
    GET: {
      Events: [
        { EID: 6, eTitle: 'Event 6', eDescription: 'Est velit egestas dui id ornare arcu odio ut sem. ', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' },
        { EID: 14, eTitle: 'Event 14', eDescription: ' Nisi lacus sed viverra tellus. ', eStartTime: '1:00 pm, abril 15', eEndTime: '2:00pm, abril 15', CreationDate: '04 10 2020', bName: 'LUIS A STEFANI (INGENIERIA)', rCode: '103B', ePhoto: 'https://via.placeholder.com/250' }
      ]
    }
  }
}

const eventsApiCall = ({ url, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // console.log('Event API call:' + mocks + '[' + url + ']' + '[' + method + ']')
        resolve(mocks[url][method])
        // console.log(`Mocked '${url}' - ${method}`)
        // console.log('response: ', mocks[url][method])
      } catch (err) {
        reject(new Error(err + '\n Path not found:' + url))
      }
    }, 100)
  })

export { eventsApiCall }
