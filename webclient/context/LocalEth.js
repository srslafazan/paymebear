import React, { createContext, useContext, useReducer, useEffect } from 'react'
import {
  getNetworkName,
  getContractAddressForAsset,
} from '../utils'
import constructERC20Contract from '../constructors/constructERC20Contract'
import supportedTokens from '../constants/supportedTokens'

export const LocalEthContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateEthereumEnabled': return { ...state, ethereumEnabled: action.payload }
    case 'updateLocalEthAccount': return { ...state, account: action.payload }
    case 'updateBalance': return { ...state, [action.token]: action.balance }
    case 'updateNetworkName': return { ...state, networkName: action.payload }
    case 'updateNetworkId': return { ...state, networkId: action.payload }
    default:
      return state
  }
}

async function fetchAddressInfo(address, dispatch = () => {}) {
  /* Get Address enabled */
  const enabled = await ethereum.enable()
  dispatch({ type: 'updateEthereumEnabled', payload: Boolean(enabled) })
  if (!enabled) return
  /* Handle fetch ETH balance */
  web3.eth.getBalance(address, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
    const balance = web3.fromWei(res.toString())
    return dispatch({ type: 'updateBalance', token: 'ETH', balance })
  })
  /* Handle fetch token balances */
  supportedTokens.forEach(token => {
    if (!address) {
      return dispatch({ type: 'updateBalance', token, balance: 0 })
    } else {
      const contract = constructERC20Contract(getContractAddressForAsset(token))
      contract.balanceOf(address, (err, res) => {
        console.log('DAI balance: ', res)
        if (err) {
          console.error(err)
          return
        }
        return dispatch({ type: 'updateBalance', token, balance: res.toString() })
      })
    }
  })
  /* Update network */
  dispatch({ type: 'updateNetworkId', payload: ethereum.networkVersion })
  dispatch({ type: 'updateNetworkName', payload: getNetworkName(ethereum.networkVersion) })
}


export const LocalEthProvider = ({ initialState = { selectedAddress: null }, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (window.localStorage) {
      const account = JSON.parse(localStorage.getItem('eth'))
      dispatch({ type: 'updateLocalEthAccount', payload: account }) /* Async */
      fetchAddressInfo(account.address, dispatch) /* Async */
    }
  }, [typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'])

  return (
    <LocalEthContext.Provider value={[state, dispatch]}>
      {children}
    </LocalEthContext.Provider>
  )
}

export const useLocalEthValue = () => useContext(LocalEthContext)
