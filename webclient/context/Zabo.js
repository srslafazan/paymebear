import React, { createContext, useContext, useReducer, useEffect } from 'react'

export const ZaboContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateZaboAccount':
      try {
        localStorage.setItem('zabo', JSON.stringify(action.payload))
      } catch (e) {}
      return { ...state, account: action.payload }
    case 'updateEthAccount': return { ...state, eth: action.payload }
    default:
      return state
  }
}

export const ZaboProvider = ({ initialState = { account: null, eth: null }, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    try {
      dispatch({ type: 'updateZaboAccount', payload: JSON.parse(localStorage.getItem('zabo') )})
    } catch (e) {}
  }, [typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'])


  return (
    <ZaboContext.Provider value={[state, dispatch]}>
      {children}
    </ZaboContext.Provider>
  )
}

export const useZaboValue = () => useContext(ZaboContext)
