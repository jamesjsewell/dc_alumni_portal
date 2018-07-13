
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

    this.props.actions.auto_log_in(this.props.actions.authenticate, this.props.users.user)

  }

  render() {

    const { users } = this.props
    
    return (
      <div>
        <AuthLayout 
        register={this.props.actions.register.bind(this)}
        login={this.props.actions.login.bind(this)}
        login_error_message={users.login_error_message}
        register_error_message={users.register_error_message}
        getForgotPasswordToken={this.props.actions.getForgotPasswordToken.bind(this)} 
        password_request={users.password_request}
        email_recipient={users.email_recipient}
        match={this.props.match}
        />
      </div>
    )
  }
}

export default withRouter(AuthView)