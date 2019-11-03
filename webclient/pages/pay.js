import Grid from '@material-ui/core/Grid'

import App from '../components/App'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Pay from '../components/Pay'
import useCommonStyles from '../constructors/useCommonStyles'

export default ({}) => {
  const classes = useCommonStyles()
  return (
    <App>
      <Grid container className={classes.root} justify="center">
        <Grid className={classes.paper} item xs={12}><Header /></Grid>
        <Grid className={classes.paper} item xs={12}><Pay /></Grid>
        <Footer />
      </Grid>
    </App>
  )
}
