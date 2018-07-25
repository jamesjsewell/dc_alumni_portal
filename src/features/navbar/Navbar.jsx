import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "./navbar.js"
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
  
  return(
    <AppBar position="static">
      <Toolbar>
        <Button onClick={()=>{props.history.replace("/alumni")}} color="inherit" disabled={props.alumni? true : false}>Alumni</Button> 
        {props.user? <Button onClick={(event)=>{props.navigateToAccount()}} color="inherit" disabled={props.account? true : false}>Account</Button> : null}
        {props.user? <Button onClick={(event)=>{props.logout(event)}} color="inherit" >Logout</Button> : null}
      </Toolbar>
    </AppBar>
  )
}

const MenuDrawer = ( props ) => {

  return(
    <Paper>
      <MenuList>
        <MenuItem>
          {/* <ListItemIcon className={classes.icon}>
            <SendIcon />
          </ListItemIcon> */}
          <ListItemText inset primary="Alumni" />
        </MenuItem>
        <Divider/>
        <MenuItem>
          {/* <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon> */}
          <ListItemText inset primary="Account" />
        </MenuItem>
        <Divider/>
        <MenuItem>
          {/* <ListItemIcon className={classes.icon}>
            <InboxIcon />
          </ListItemIcon> */}
          <ListItemText inset primary="Logout" />
        </MenuItem>
      </MenuList>
      <Button onClick={(event)=>{props.toggleDrawer(event, false)}} size="small" color="inherit">cancel</Button>
    </Paper>)

}

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class Navbar extends Component {

  constructor(props) {
    
    super(props)
    this.state = {drawerOpen: false}

  }

  handleLogout(e){

    e.preventDefault()
    this.props.actions.logout(this.props.history)

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

    const { user } = this.props
    
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
            <MenuDrawer user={user} toggleDrawer={this.handleToggleDrawer.bind(this)} logout={this.handleLogout.bind(this)} />
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <NavMenu user={user} logout={this.handleLogout.bind(this)} navigateToAccount={()=>{this.navigateToAccount()}} history={this.props.history}/>
        </Hidden>
      </div>
    )
  }
}

export default withRouter(Navbar)

