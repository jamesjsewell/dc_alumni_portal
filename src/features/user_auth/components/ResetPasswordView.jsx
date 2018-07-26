
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
// import * as controller from "../user_auth.js"
import ResetPasswordLayout from "./ResetPasswordLayout.jsx"

// @connect(
//   state => controller.selector(state),
//   dispatch => ({
//     actions: bindActionCreators(controller, dispatch)
//   })
// )

class ResetPasswordView extends Component {

  constructor(props) {
    
    super(props)

    this.props.userActions.auto_log_in(this.props.userActions.authenticate, this.props.user)

  }

  render() {

    const { user } = this.props
    
    return (
      <div><ResetPasswordLayout 
      match={this.props.match} 
      resetPassword={this.props.actions.resetPassword.bind(this)} 
      error_resetting={user.error_resetting_password} 
      did_reset={user.password_did_reset}
      password_request={user.password_request}
      getForgotPasswordToken={user.getForgotPasswordToken} 
      /></div>

    )
  }
}

export default withRouter(ResetPasswordView)