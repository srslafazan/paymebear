import { useState } from 'react'

import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'


const mobileFooter = () => {
  const [value, setValue] = useState(0)
  return (
    <Grid item xs={12}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, boxShadow: '0px 0px 3px 1px rgb(200, 200, 200)' }}
      >
        <BottomNavigationAction label="Bears" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Order" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Gift" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Stores" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Me" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Grid>
  )
}

const desktopFooter = () => {
  return (
    <div>
      <ul>
        <li>Bears</li>
        <li>Order</li>
        <li>Gift</li>
        <li>Stores</li>
        <li>Me</li>
      </ul>
    </div>
  )
}

export default ({}) => (
  <div>
    <Hidden only="xs">{desktopFooter()}</Hidden>
    <Hidden smUp>{mobileFooter()}</Hidden>
  </div>
)
