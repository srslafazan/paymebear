import { useEffect, useState } from 'react'
import web31 from '../constructors/web31'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import { getNetworkName } from '../utils'

import Zabo from 'zabo-sdk-js'
import { useZaboValue } from '../context/Zabo'
import { shortenToDisplayAddress } from '../utils'


function createAndLocallyStoreEthAccount() {
  const account = web31.eth.accounts.create()
  try {
    window.localStorage.setItem('eth', JSON.stringify(account))
  } catch(e) {
    console.error(e)
  }
  return account
}

function getLocalStorageEthAccount() {
  try {
    return JSON.parse(window.localStorage.getItem('eth'))
  } catch(e) {
    console.error(e)
    return null
  }
}


const ZaboConnector = ({}) => {
  const [zaboContext, dispatch] = useZaboValue()
  const { account, ...rest } = zaboContext
  console.log('zabo account', account)
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CheckCircleIcon style={{ color: (account ? green[500] : 'initial'), marginRight: '5px' }} />
      </span>
      <Button
        children={account && shortenToDisplayAddress(account.address) || 'Connect Wallet'}
        variant="contained"
        color="primary"
        style={{ marginLeft: '10px' }}
        onClick={() => {
          Zabo.connect().onConnection(async (account) => {
            console.log(account)
            dispatch({ type: 'updateZaboAccount', payload: account})
            dispatch({ type: 'updateEthAccount', payload: getLocalStorageEthAccount() || createAndLocallyStoreEthAccount() })
          }).onError(error => {
            console.error('account connection error:', error)
          })
        }}
      />
    </div>
  )
}

export default ZaboConnector

// <Button
//   style={{ margin: '0 0 0 10px' }}
//   variant="contained"
//   color="primary"
//   children={account ? shortenToDisplayAddress(account.address) : 'Connect'}

// />
// {account ? (
//   <div style={{ display: 'flex', flexDirection: 'column' }}>
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <img src={account.wallet_provider.logo} style={{ height: '16px', margin: '0 0 0 10px' }} />
//     </div>
//     Currencies:
//     <ul>
//       {account.currencies && account.currencies.map((curr, i) => (
//         <li key={i}>{curr.balance} {curr.currency}</li>
//       ))}
//     </ul>
//   </div>
// ) : null}
