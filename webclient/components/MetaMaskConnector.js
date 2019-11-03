import { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import {
  getNetworkName,
} from '../utils'
import constructERC20Contract from '../constructors/constructERC20Contract'
import supportedTokens from '../constants/supportedTokens'
import { useMetaMaskValue } from '../context/MetaMask';

function metaMaskAvailable() {
  return (typeof web3 !== 'undefined' && typeof ethereum !== 'undefined')
}

function getNetworkDisplayName(networkName) {
  return (metaMaskAvailable() && networkName) || ''
}


const MetaMaskConnector = ({}) => {
  const [metaMaskContext, dispatch] = useMetaMaskValue()

  const { selectedAddress, networkName, ...rest } = metaMaskContext

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CheckCircleIcon style={{ color: (selectedAddress ? green[500] : 'initial'), marginRight: '5px' }} /> {getNetworkDisplayName(networkName)}
      </span>
      <Button
        children={
          (selectedAddress && (selectedAddress.substring(0, 10) + '...'))
          || 'Connect Wallet'
        }
        variant="contained"
        color="primary"
        style={{ marginLeft: '10px' }}
        onClick={async () => {
          if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            const accounts = await ethereum.enable()
          }
        }}
      />
      {/*<div>
        Balances:
        <ul>
          {supportedTokens.map(token => <li key={token}>{token}: {metaMaskContext[token]}</li>)}
        </ul>
      </div>*/}
    </div>
  )
}

export default MetaMaskConnector
