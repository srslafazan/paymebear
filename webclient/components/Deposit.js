import { useState } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'


const Deposit = ({ router }) => {
  const [wallet, setWallet] = useState('metamask')
  const [currency, setCurrency] = useState('XRP')
  const [reloadAmount, setReloadAmount] = useState('25.00')
  return (
    <div>
      <Link children={<a>Back</a>} href={'/'} />
      <h2>Add money to your bear</h2>
      <Grid container>
        <Grid item xs={12}>
          Current Balance <br />
          $10,024.00
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Wallet</InputLabel>
            <Select
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              inputProps={{
                name: 'Select Wallet',
                id: 'SelectWallet',
              }}
            >
              {[
                { name: 'MetaMask', key: 'metamask' },
              ].map((val, i) => <MenuItem key={i} value={val.key}>{val.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Currency</InputLabel>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              inputProps={{
                name: 'Select Currency',
                id: 'SelectCurrency',
              }}
            >
              {[
                { name: 'XRP', key: 'XRP' },
              ].map((val, i) => <MenuItem key={i} value={val.key}>{val.name}</MenuItem>)}
            </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Reload Amount</InputLabel>
            <Select
              value={reloadAmount}
              onChange={(e) => setReloadAmount(e.target.value)}
              inputProps={{
                name: 'Reload Amount',
                id: 'ReloadAmount',
              }}
            >
              {['15.00', '25.00', '50.00'].map((val, i) => <MenuItem key={i} value={val}>${val}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            children={`Add $${reloadAmount}`}
            variant="contained"
            color="primary"
            onClick={() => {
              console.log('deposit')
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(Deposit)
