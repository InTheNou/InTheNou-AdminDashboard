import Vue from 'vue'
import Vuex from 'vuex'
import { authenticationApiCall } from '../dummyapicals/authentication.js'
Vue.use(Vuex)

export default new Vuex.Store({
  // state of the application contains all the properties our application has and share with all components
  state: {
  // set for test purposes of the login component
    token: localStorage.getItem('login-token') || '',
    status: '',
    hasLoadedOnce: false
  },
  // use to make centralized methods for access of  the store state variables
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  actions: {
    AUTH_REQUEST: ({ commit, state }, user) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST') // invoke mutation handler to update status vairable
        authenticationApiCall({ url: 'auth', data: user, method: 'POST' })
          .then(response => {
            localStorage.setItem('login-token', response.token) //  passed a key name and value, will add that key to the given Storage object, or update that key's value if it already exists.
            commit('AUTH_SUCCESS', response.token) // cals AUTH_SUCCESS mutation with parameter(payload) equal to the receive token from the promise
            resolve(response.token) // returns promise when resolved with the token value
          })
          .catch(err => {
            commit('AUTH_ERROR', err) // invoke mutation handler to update status vairable with a payload
            localStorage.removeItem('login-token')
            reject(err)
          })
      })
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise(resolve => {
        commit('AUTH_LOGOUT')
        localStorage.removeItem('login-token')
        resolve()
      })
    }
  },
  // use to make centralized methods for access of  the store state variables and change its state
  mutations: {
    AUTH_REQUEST: (state) => {
      state.status = 'loading' // updates the status state variable
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = 'success' // updates the status state variable
      state.token = token
    },
    AUTH_ERROR: (state) => {
      state.status = 'error' // updates the status state variable
    },
    AUTH_LOGOUT: state => {
      state.token = '' // updates the status state variable
    }
  }
})
