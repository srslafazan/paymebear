import Grid from '@material-ui/core/Grid'

import App from '../components/App'
import Header from '../components/Header'
import Account from '../components/Account'
import GetMoreBears from '../components/GetMoreBears'
import ActionButtons from '../components/ActionButtons'
import Footer from '../components/Footer'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))


export default ({}) => {
  const classes = useStyles()

  return (
    <App>
      <Grid container spacing={0} justify="center">
        <Grid className={classes.paper} item xs={11}><Header /></Grid>
        <Grid className={classes.paper} item xs={11}><Account /></Grid>
        <Grid className={classes.paper} item xs={11}><GetMoreBears /></Grid>
        <Grid className={classes.paper} item xs={11}><ActionButtons /></Grid>
        <Footer />
      </Grid>
    </App>
  )
}
