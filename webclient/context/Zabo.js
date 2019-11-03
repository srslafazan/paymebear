import React, { createContext, useContext, useReducer, useEffect } from 'react'

export const ZaboContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateAccount': return { ...state, account: action.payload }
    default:
      return state
  }
}

export const ZaboProvider = ({ initialState = { account: null }, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ZaboContext.Provider value={[state, dispatch]}>
      {children}
    </ZaboContext.Provider>
  )
}

export const useZaboValue = () => useContext(ZaboContext)
