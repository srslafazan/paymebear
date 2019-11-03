import { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import { getNetworkName } from '../utils'

import Zabo from 'zabo-sdk-js'
import { useZaboValue } from '../context/Zabo'
import { shortenToDisplayAddress } from '../utils'



const ZaboConnector = ({}) => {

  const [zaboContext, dispatch] = useZaboValue()

  const { account, ...rest } = zaboContext
  console.log('account', account)
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
            dispatch({ type: 'updateAccount', payload: account})
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
