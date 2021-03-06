import React, { Component } from 'react'
import { withRouter } from 'react-router'
import dcLogo from '../../images/digitalcrafts-site-logo.png'

import * as links from '../../../nav_links.js'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import ListItemText from '@material-ui/core/ListItemText'

const NavMenu = (props) => {
  const { currentRoute, routes, user, logout, navigateToAccount, navigateToAlumni } = props

  return (
    <AppBar color='' position='static'>

      <Toolbar style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'none'}}>

        <div style={{display: 'flex', alignItems: 'center'}}><img style={{ margin: 'auto', maxHeight: '40px', width: 'auto', padding: '.5rem', borderRadius: '.2rem' }} src={dcLogo} /><Typography color='primary' style={{textAlign: 'right'}} variant='headline'>Alumni Portal</Typography></div>

        <div><Button variant='text' color={currentRoute !== '/alumni' ? 'secondary' : 'primary'} onClick={(event) => { navigateToAlumni(event) }}>Alumni</Button>
          {user && user.email
            ? <Button variant='text' color={currentRoute !== routes.GRAD_PROFILE && currentRoute !== routes.EMPLOYER_PROFILE ? 'secondary' : 'primary'} onClick={(event) => { navigateToAccount(event) }} >Account</Button> : null
          }
          {user && user.email
            ? <Button variant='text' color='secondary' onClick={(event) => { logout(event) }} >Logout</Button> : null
          }
        </div>

      </Toolbar>

    </AppBar>
  )
}

const MenuDrawer = (props) => {
  const { currentRoute, routes, logout, navigateToAccount, navigateToAlumni, toggleDrawer } = props

  return (
    <Paper>
      <MenuList>
        <MenuItem onClick={(event) => { navigateToAlumni(event) }} selected={currentRoute === '/alumni'}>
          <ListItemText inset primary='Alumni' />
        </MenuItem>
        <Divider />
        {props.user && props.user.email
          ? <MenuItem onClick={(event) => { navigateToAccount(event) }} selected={!!(currentRoute === routes.GRAD_PROFILE || currentRoute === routes.EMPLOYER_PROFILE)} >
            <ListItemText inset primary='Account' />
          </MenuItem> : null}
        <Divider />
        {props.user && props.user.email
          ? <MenuItem onClick={(event) => { logout(event) }}>
            <ListItemText inset primary='Logout' />
          </MenuItem> : null}
      </MenuList>
      <Button variant='outlined' onClick={(event) => { toggleDrawer(event, false) }} size='small' color='inherit'>close</Button>
    </Paper>)
}

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {drawerOpen: false}
  }

  handleLogout (e) {
    e.preventDefault()
    this.props.actions.logout(this.props.history, this.props.user, this.props.routes)
  }

  navigateToAccount (e) {
    if (this.props.user) {
      var user = this.props.user
      if (user.account_type === 'grad') {
        this.props.history.replace(links.GRAD_PROFILE)
      }

      if (user.account_type === 'employer') {
        this.props.history.replace(links.EMPLOYER_PROFILE)
      }
    }
  }

  navigateToAlumni (e) {
    this.props.history.replace('/alumni')
  }

  handleToggleDrawer (e, open) {
    // e.preventDefault()
    this.setState({drawerOpen: open})
  }

  render () {
    const { user, currentRoute, routes } = this.props

    return (
      <div>
        <Hidden mdUp>

          <AppBar position='static'>

            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>

              <IconButton onClick={(event) => { this.handleToggleDrawer(event, true) }} color='inherit' aria-label='Menu'>
                <MenuIcon />
              </IconButton>
              <div style={{display: 'flex', alignItems: 'center'}}><img style={{ margin: 'auto', maxHeight: '40px', width: 'auto', padding: '.5rem', borderRadius: '.2rem' }} src={dcLogo} /><Typography color='secondary' style={{textAlign: 'right'}} variant='headline'>Alumni Portal</Typography></div>
            </Toolbar>
          </AppBar>

          <Drawer
            variant='temporary'
            anchor={'left'}
            open={this.state.drawerOpen}
            onClose={(event) => { this.handleToggleDrawer(event, false) }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <MenuDrawer routes={routes} currentRoute={currentRoute} user={user} toggleDrawer={this.handleToggleDrawer.bind(this)} logout={this.handleLogout.bind(this)} navigateToAlumni={this.navigateToAlumni.bind(this)} navigateToAccount={this.navigateToAccount.bind(this)} history={this.props.history} />
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <NavMenu routes={routes} currentRoute={currentRoute} user={user} logout={this.handleLogout.bind(this)} navigateToAccount={this.navigateToAccount.bind(this)} navigateToAlumni={this.navigateToAlumni.bind(this)} history={this.props.history} />
        </Hidden>
      </div>
    )
  }
}

export default withRouter(Navbar)
