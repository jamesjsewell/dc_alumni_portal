import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
// import * as controller from "./navbar.js"
import * as links from "../../nav_links.js"

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from "@material-ui/core/Menu";


const NavMenu = ( props ) => {
 
  const { currentRoute, routes, user } = props
  
  return(
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" disabled={ currentRoute === "/alumni"? true : false } onClick={()=>{props.history.replace("/alumni")}}>Alumni</Button> 
        {user && user.email? 
          <Button color="inherit" disabled={ currentRoute === routes.GRAD_PROFILE || currentRoute === routes.EMPLOYER_PROFILE? true : false} onClick={(event)=>{props.navigateToAccount()}} >Account</Button> : null
        }
        {user && user.email? 
          <Button color="inherit" onClick={(event)=>{props.logout(event)}}  >Logout</Button> : null
        }
      </Toolbar>
    </AppBar>
  )
}

const MenuDrawer = ( props ) => {

  return(
    <Paper>
      <MenuList>
        <MenuItem>
          <ListItemText onClick={()=>{props.history.replace("/alumni")}} inset primary="Alumni" />
        </MenuItem>
        <Divider/>
        {props.user && props.user.email? 
          <MenuItem>
            <ListItemText onClick={(event)=>{props.navigateToAccount()}} inset primary="Account" /> 
          </MenuItem> : null}
        <Divider/>
        {props.user && props.user.email? 
          <MenuItem>
            <ListItemText onClick={(event)=>{props.logout(event)}} inset primary="Logout" />
          </MenuItem> : null}
      </MenuList>
      <Button onClick={(event)=>{props.toggleDrawer(event, false)}} size="small" color="inherit">cancel</Button>
    </Paper>)

}

class Navbar extends Component {

  constructor(props) {
    
    super(props)
    this.state = {drawerOpen: false}

  }

  handleLogout(e){
  
    e.preventDefault()
    this.props.actions.logout(this.props.history, this.props.user, this.props.routes)

  }

  navigateToAccount(){
    if(this.props.user){
      var user = this.props.user
      if(user.account_type === "grad"){
        this.props.history.replace(links.GRAD_PROFILE)
      }
 
      if(user.account_type === "employer"){
        this.props.history.replace(links.EMPLOYER_PROFILE)
      }
    }
  }

  handleToggleDrawer(e, open){
    e.preventDefault()
    this.setState({drawerOpen: open})
  }

  render() {

    const { user, currentRoute, routes } = this.props
    
    return (
      <div>
        <Hidden mdUp>

          <AppBar position="static">
            <Toolbar>
              <IconButton onClick={(event)=>{this.handleToggleDrawer(event, true)}} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          
          <Drawer
            variant="temporary"
            anchor={'left'}
            open={this.state.drawerOpen}
            onClose={(event)=>{this.handleToggleDrawer(event, false)}}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <MenuDrawer user={user} toggleDrawer={this.handleToggleDrawer.bind(this)} logout={this.handleLogout.bind(this)} history={this.props.history} navigateToAccount={()=>{this.navigateToAccount()}} />
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <NavMenu currentRoute={currentRoute} routes={routes} user={user} logout={this.handleLogout.bind(this)} navigateToAccount={()=>{this.navigateToAccount()}} history={this.props.history}/>
        </Hidden>
      </div>
    )
  }
}

export default withRouter(Navbar)

