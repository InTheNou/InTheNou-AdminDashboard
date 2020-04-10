const mocks = {
  auth: { POST: { token: '8460967687' } },
  '/auth': { GET: { UID: '1', role: 'Admin' } }
}

const authenticationApiCall = ({ url, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mocks[url][method || 'GET'])
        // console.log(`Mocked '${url}' - ${method || 'GET'}`)
        // console.log('response: ', mocks[url][method || 'GET'])
      } catch (err) {
        reject(new Error(err))
      }
    }, 1000)
  })

export { authenticationApiCall }
