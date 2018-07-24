import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../profile.js"
import ProfileLayout from "./ProfileLayout.jsx"
import Navbar from "../../navbar/Navbar.jsx"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/divider"
import CardContent from "@material-ui/core/CardContent"
import Card from "@material-ui/core/Card"


@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class GradProfileView extends Component {

  constructor(props) {
    
    super(props)
    this.props.actions.getProfileData(this.props.user.loggedIn)
    console.log(props)
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.user.loggedIn && nextProps.user.loggedIn){
    
      this.props.actions.getProfileData(nextProps.user.loggedIn)
    }
  }

  render() {
    
    const { user, profile } = this.props
    
    return (
      <div>
        <Navbar/>
        <Divider inset></Divider>
        <Card square={true}><CardContent><Paper elevation={0} square={true}><Typography variant="title">Your Profile</Typography></Paper></CardContent></Card>
        <Divider inset></Divider>
        {profile.email? <ProfileLayout user={user} profile={profile} updateUser={this.props.actions.updateUser.bind(this)} /> : null }
      </div> 
    )
  }
}

export default withRouter(GradProfileView)