import Grid from '@material-ui/core/Grid'

import App from '../components/App'
import Header from '../components/Header'
import Account from '../components/Account'
import GetMoreBears from '../components/GetMoreBears'
import ActionButtons from '../components/ActionButtons'
import Footer from '../components/Footer'
import Pay from '../components/Pay'

export default ({}) => {
  return (
    <App>
      <Grid container>
        <Grid item xs={12}><Header /></Grid>
        <Grid item xs={12}><Pay /></Grid>
        <Footer />
      </Grid>
    </App>
  )
}
