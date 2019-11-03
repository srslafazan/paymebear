import { useState } from 'react'
import { path, pathOr } from 'ramda'

import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'

import Zabo from 'zabo-sdk-js'
import zabo from '../constructors/zabo'


export default ({}) => {
  return (
    <Card>
      <h2>Collect more bears</h2>
      <span style={{ color: 'blue' }}>See all</span>
      <p>Win a new one-of-a-kind crypto bear for FREE when you spend $100 or more on Payme Bear!</p>
    </Card>
  )
}
