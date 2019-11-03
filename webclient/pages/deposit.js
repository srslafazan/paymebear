import Link from 'next/link'

import Grid from '@material-ui/core/Grid'

import App from '../components/App'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Deposit from '../components/Deposit'

export default ({}) => {
  return (
    <App>
      <Grid container>
        <Grid item xs={12}><Header /></Grid>
        <Grid item xs={12}>
          <Deposit />
        </Grid>
        <Footer />
      </Grid>
    </App>
  )
}
