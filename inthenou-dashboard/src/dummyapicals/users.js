const mocks = {
  // this is a mock test for users with level 2 (moderator privilege)
  '/users/2': {
    GET: {
      Users: [{ UID: 0, Email: 'user.email1@gmail.com', SupEmail: 'user2.email@gmail.com' },
        { UID: 1, Email: 'user.email2@gmail.com', SupEmail: 'user2.email@gmail.com' },
        { UID: 2, Email: 'user.email3@gmail.com', SupEmail: 'user2.email@gmail.com' }
      ]
    }
  },
  '/users/3': {
    GET: {
      Users: [{ UID: 3, Email: 'user.email13@gmail.com', SupEmail: 'user.email1@gmail.com' },
        { UID: 4, Email: 'user.email32@gmail.com', SupEmail: 'user.email2@gmail.com' },
        { UID: 5, Email: 'user.email33@gmail.com', SupEmail: 'user.email3@gmail.com' }
      ]
    }
  },
  '/supervees/0': {
    GET: {
      Users: [
        { UID: 3, Email: 'user.email13@gmail.com', SupEmail: 'user.email1@gmail.com' },
        { UID: 5, Email: 'user.email33@gmail.com', SupEmail: 'user.email3@gmail.com' }
      ]
    }
  }
}

const userApiCall = ({ url, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mocks[url][method])
        console.log(`Mocked '${url}' - ${method}`)
        console.log('response: ', mocks[url][method])
      } catch (err) {
        reject(new Error(err + '\n Path not found:' + url))
      }
    }, 100)
  })

export { userApiCall }
