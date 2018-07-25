
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../user.js"
import AuthLayout from "./AuthLayout.jsx"

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class AuthView extends Component {

  constructor(props) {
    
    super(props)

    this.props.actions.auto_log_in(this.props.actions.authenticate, this.props.user)

  }

  render() {
    
    const { user } = this.props
    if(user){

      if(user.account_type === "grad"){
        this.props.history.replace(this.props.routes.GRAD_PROFILE);
      }
      if(user.account_type === "employer"){
        this.props.history.replace("/alumni")
      }
      
    }
    
    return (
      <div>
  
        <AuthLayout 
          match={this.props.match}
          account_type={this.props.account_type}
          register={this.props.actions.register.bind(this)}
          login={this.props.actions.login.bind(this)}
          getForgotPasswordToken={this.props.actions.getForgotPasswordToken.bind(this)} 
          login_error_message={user.login_error_message}
          register_error_message={user.register_error_message}
          password_request={user.password_request}
          email_recipient={user.email_recipient}
    
        />
      </div>
    )
  }
}

export default withRouter(AuthView)