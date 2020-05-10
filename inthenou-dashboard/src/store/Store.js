import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const DISPLAY_NAME = 'inthenou-user-name'
const EMAIL = 'inthenou-user-email'
const ROLE_ID = 'inthenou-role-id'
const TYPE = 'inthenou-type'
const UID = 'inthenou-uid'

export default new Vuex.Store({
  // state of the application contains all the properties our application has and share with all components
  state: {
  // set for test purposes of the login component
    // token: localStorage.getItem('login-token') || '',
    display_name: localStorage.getItem(DISPLAY_NAME) || '',
    email: localStorage.getItem(EMAIL) || '',
    roleid: localStorage.getItem(ROLE_ID),
    type: localStorage.getItem(TYPE) || '',
    uid: localStorage.getItem(UID) || '',
    status: ''
  },
  // use to make centralized methods for access of  the store state variables
  getters: {
    isAuthenticated: state => !!state.roleid,
    authStatus: state => state.status,
    uid: state => { return state.uid },
    roleid: state => { return state.roleid },
    status: state => { return state.status}
  },
  actions: {
    AUTH_REQUEST: ({ commit, state }, userid) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST') // invoke mutation handler to update status vairable
        fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_GET_USER + userid)
          .catch(err => {
            commit('AUTH_ERROR', err) // invoke mutation handler to update status vairable with a payload
            // localStorage.removeItem('login-token')
            reject(err)
          })
          .then(response => {
            // localStorage.setItem('login-token', response.token) //  passed a key name and value, will add that key to the given Storage object, or update that key's value if it already exists.
            // resolve(console.log(response))
            return response.json()// returns promise when resolved with the token value
          })
          .then(userprofile => {
            // console.log('fetch data')
            localStorage.setItem('inthenou-user-name', userprofile.display_name)
            localStorage.setItem('inthenou-user-email', userprofile.email)
            localStorage.setItem('inthenou-role-id', userprofile.roleid)
            localStorage.setItem('inthenou-type', userprofile.type)
            localStorage.setItem('inthenou-uid', userprofile.uid)
            commit('AUTH_SUCCESS', userprofile) // call AUTH_SUCCESS mutation with parameter(payload) equal to the receive token from the promise
            resolve()
          })
      })
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise(resolve => {
        commit('AUTH_LOGOUT')
        resolve()
      })
    }
  },
  // use to make centralized methods for access of  the store state variables and change its state
  mutations: {
    AUTH_REQUEST: (state) => {
      state.status = 'loading' // updates the status state variable
    },
    AUTH_SUCCESS: (state, userprofile) => {
      state.display_name = userprofile.display_name
      state.email = userprofile.email
      state.roleid = userprofile.roleid
      state.type = userprofile.type
      state.uid = userprofile.uid
      state.status = 'success' // updates the status state variable
    },
    AUTH_ERROR: (state) => {
      state.status = 'error' // updates the status state variable
    },
    AUTH_LOGOUT: state => {
      localStorage.removeItem('inthenou-user-name')
      localStorage.removeItem('inthenou-user-email')
      localStorage.removeItem('inthenou-role-id')
      localStorage.removeItem('inthenou-type')
      localStorage.removeItem('inthenou-uid')
    }
  }
})
