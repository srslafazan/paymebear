import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  account: null,
}

export const actionTypes = {
  updateAccount: 'updateAccount',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateAccount:
      return Object.assign({}, state, {
        account: action.payload,
      })
    default:
      return state
  }
}

// // ACTIONS
// export const serverRenderClock = isServer => dispatch => {
//   return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
// }

// export const startClock = () => dispatch => {
//   return setInterval(
//     () => dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() }),
//     800
//   )
// }

// export const addCount = () => dispatch => {
//   return dispatch({ type: actionTypes.ADD })
// }

export const initStore = (state = initialState) => {
  return createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
