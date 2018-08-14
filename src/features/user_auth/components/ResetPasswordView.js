
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
// import * as controller from "../user_auth.js"
import ResetPasswordLayout from './ResetPasswordLayout.js'

// @connect(
//   state => controller.selector(state),
//   dispatch => ({
//     actions: bindActionCreators(controller, dispatch)
//   })
// )

class ResetPasswordView extends Component {
  constructor (props) {
    super(props)

    this.props.actions.auto_log_in(this.props.actions.authenticate, this.props.user)
  }

  render () {
    const { user, userState, routes } = this.props

    return (
      <div><ResetPasswordLayout
        user={user}
        routes={routes}
        match={this.props.match}
        history={this.props.history}
        resetPassword={this.props.actions.resetPassword.bind(this)}
        error_resetting={userState.error_resetting_password}
        did_reset={userState.password_did_reset}
        password_request={userState.password_request}
        getForgotPasswordToken={this.props.actions.getForgotPasswordToken.bind(this)}
      /></div>

    )
  }
}

export default withRouter(ResetPasswordView)
