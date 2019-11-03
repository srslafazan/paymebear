import { useState } from 'react'
import { path, pathOr } from 'ramda'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import Zabo from 'zabo-sdk-js'
import zabo from '../constructors/zabo'
import { shortenToDisplayAddress } from '../utils'


function hours12(date) { return (date.getHours() + 24) % 12 || 12; }


export default ({}) => {
  const date = new Date()
  return (
    <Paper style={{ backgroundColor: 'rgb(212, 239, 211)'}}>
      <Grid container>
        <Grid item xs={4}>
          <img src={'/paymebear.png'} style={{ maxWidth: '30vw' }} />
        </Grid>
        <Grid item xs={8}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{'$1,024.00'}</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{`as of ${hours12(date)}:${date.getMinutes()}`}</div>
        </Grid>
      </Grid>
    </Paper>
  )
}
