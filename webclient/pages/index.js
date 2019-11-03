import Grid from '@material-ui/core/Grid'

import App from '../components/App'
import Header from '../components/Header'
import Account from '../components/Account'
import GetMoreBears from '../components/GetMoreBears'
import ActionButtons from '../components/ActionButtons'
import Footer from '../components/Footer'

import useCommonStyles from '../constructors/useCommonStyles'


export default ({}) => {
  const classes = useCommonStyles()

  return (
    <App>
      <Grid container className={classes.root} spacing={0} justify="center">
        <Grid className={classes.paper} item xs={11}><Header /></Grid>
        <Grid className={classes.paper} item xs={11}><Account /></Grid>
        <Grid className={classes.paper} item xs={11}><GetMoreBears /></Grid>
        <Grid className={classes.paper} item xs={11}><ActionButtons /></Grid>
        <Footer />
      </Grid>
    </App>
  )
}
