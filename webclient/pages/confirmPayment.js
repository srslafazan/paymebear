import Link from 'next/link'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import App from '../components/App'
import Header from '../components/Header'
import Account from '../components/Account'
import GetMoreBears from '../components/GetMoreBears'
import ActionButtons from '../components/ActionButtons'
import Footer from '../components/Footer'
import Pay from '../components/Pay'

export default ({}) => {
  const total = '5.80'
  return (
    <App>
      <Grid container>
        <Grid item xs={12}><Header /></Grid>
        <Grid item xs={12}>
          <Link children={<a>Back</a>} href={'/'} />
          <h2>Confirm payment</h2>

          <div>... Merchant info ...</div>
          <div>
            Subtotal: ${total}
            Fees: ${total}
            Total: ${total}
          </div>
          <Button
            children={`Pay Now ${total}`}
          />
        </Grid>
        <Footer />
      </Grid>
    </App>
  )
}
