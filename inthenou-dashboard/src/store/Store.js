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
    status: localStorage.getItem('status') || ''
  },
  // use to make centralized methods for access of  the store state variables
  getters: {
    isAuthenticated: state => { return state.status === 'success' },
    isNotAuthenticated: state => { return state.status === 'error' },
    authStatus: state => state.status,
    uid: state => { return state.uid },
    roleid: state => { return state.roleid },
    status: state => { return state.status }
  },
  actions: {
    AUTH_REQUEST: async ({ commit, state }, userid) => {
      return new Promise((resolve, reject) => {
        // console.log('entered store for auth request')
        commit('AUTH_REQUEST') // invoke mutation handler to update status vairable
        fetch(process.env.VUE_APP_API_HOST + process.env.VUE_APP_GET_USER + userid)
          .then(response => {
            if (response.status === 404) {
              alert('You need to Log in')
              console.log('error')
              alert('You need to be registered')
              commit('AUTH_ERROR') // invoke mutation handler to update status vairable with a payload
              return resolve(response.status)
            } else if (response.status === 402) {
              alert('You do not have administrator or moderator privileges')
              commit('AUTH_LOGOUT')
              return resolve(response.status)
            } else if (response.status === 401) {
              alert('You need to Log in')
              commit('AUTH_LOGOUT')
              return resolve(response.status)
            }
            return response.json()// returns promise when resolved with the token value
          })
          .then(userprofile => {
            if (userprofile.uid === undefined) {
              commit('AUTH_ERROR')
              return reject(new Error('undefined user'))
            } else {
              commit('AUTH_SUCCESS', userprofile)
              return resolve(200)
            } // call AUTH_SUCCESS mutation with parameter(payload) equal to the receive token from the promise
          })
      })
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise(resolve => {
        commit('AUTH_LOGOUT')
        resolve()
      })
    },
    AUTH_UNREGISTERED: ({ commit }) => {
      return new Promise(resolve => {
        commit('AUTH_UNREGISTERED')
        resolve()
      })
    },
    AUTH_CLEAN: ({ commit }) => {
      return new Promise(resolve => {
        commit('AUTH_CLEAN')
        resolve()
      })
    }
  },
  // use to make centralized methods for access of  the store state variables and change its state
  mutations: {
    AUTH_REQUEST: (state) => {
      localStorage.setItem('status', 'loading') // updates the status state variable
    },
    AUTH_SUCCESS: (state, userprofile) => {
      state.display_name = userprofile.display_name
      state.email = userprofile.email
      state.roleid = userprofile.roleid
      state.type = userprofile.type
      state.uid = userprofile.uid
      localStorage.setItem('inthenou-user-name', userprofile.display_name)
      localStorage.setItem('inthenou-user-email', userprofile.email)
      localStorage.setItem('inthenou-role-id', userprofile.roleid)
      localStorage.setItem('inthenou-type', userprofile.type)
      localStorage.setItem('inthenou-uid', userprofile.uid)
      localStorage.setItem('status', 'success')
      // updates the status state variable
    },
    AUTH_ERROR: (state) => {
      localStorage.setItem('status', 'error')
      // updates the status state variable
      localStorage.removeItem('inthenou-user-name')
      localStorage.removeItem('inthenou-user-email')
      localStorage.removeItem('inthenou-role-id')
      localStorage.removeItem('inthenou-type')
      localStorage.removeItem('inthenou-uid')
    },
    AUTH_LOGOUT: state => {
      localStorage.removeItem('inthenou-user-name')
      localStorage.removeItem('inthenou-user-email')
      localStorage.removeItem('inthenou-role-id')
      localStorage.removeItem('inthenou-type')
      localStorage.removeItem('inthenou-uid')
      localStorage.removeItem('status')
    },
    AUTH_UNREGISTERED: state => {
      localStorage.setItem('status', 'unregistered')
    },
    AUTH_CLEAN: state => {
      localStorage.setItem('status', '')
    }
  }
})
