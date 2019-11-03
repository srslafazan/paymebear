import { useState } from 'react'
import { path, pathOr } from 'ramda'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import Zabo from 'zabo-sdk-js'
import zabo from '../constructors/zabo'
import { shortenToDisplayAddress } from '../utils'
import { useLocalEthValue } from '../context/LocalEth'

function hours12(date) { return (date.getHours() + 24) % 12 || 12; }


export default ({}) => {
  const [{ account, DAI }] = useLocalEthValue()
  const date = new Date()
  const hours = hours12(date)
  const mins = date.getMinutes().toString()

  console.log('local account: ', account)

  return (
    <Paper style={{ backgroundColor: 'rgb(212, 239, 211)'}}>
      <Grid container>
        <Grid item xs={4}>
          <img src={'/paymebear.png'} style={{ maxWidth: '30vw' }} />
        </Grid>
        <Grid item xs={8}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>${typeof web3 !== 'undefined' && web3.fromWei(DAI) || '0.00'}</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{`as of ${hours}:${mins.length < 2 ? `0${mins}` : mins }${hours > 11 ? 'pm' : 'am'}`}</div>
        </Grid>
      </Grid>
    </Paper>
  )
}
