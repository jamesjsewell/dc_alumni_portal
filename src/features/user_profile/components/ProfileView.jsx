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
import CardContent from "@material-ui/core/CardContent"
import Card from "@material-ui/core/Card"


@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class ProfileView extends Component {

  constructor(props) {
    
    super(props)

  }

  componentWillReceiveProps(nextProps){

  }

  render() {
    
    const { user } = this.props
    
    return (
      <div>
        <Navbar/>

        <Card square={true}><CardContent><Typography variant="title">Your Profile </Typography></CardContent></Card>
      
        {user.email? <ProfileLayout user={user} updateUser={this.props.actions.updateUser.bind(this)} /> : null }
      </div> 
    )
  }
}

export default withRouter(ProfileView)