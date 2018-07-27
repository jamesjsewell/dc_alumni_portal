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

class ProfileView extends Component {

  constructor(props) {
    
    super(props)

  }

  componentWillReceiveProps(nextProps){

  }

  render() {

    const { user, account_type, history, routes } = this.props

    if(user){
      if(!user.email){

        if(account_type === "grad"){
          history.replace(routes.GRAD_LOGIN)
        }

        if(account_type === "employer"){
          history.replace(routes.EMPLOYER_LOGIN)
        }
          
      }
    }
    
    return (
      <div>

        <Card square={true}><CardContent><Typography variant="title">Your Profile </Typography></CardContent></Card>
      
        {user.email? <ProfileLayout user={user} updateUser={this.props.actions.updateUser.bind(this)} /> : null }
      </div> 
    )
  }
}

export default withRouter(ProfileView)