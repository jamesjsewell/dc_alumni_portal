
import React, { Component } from 'react'

import { withRouter } from 'react-router'

import ResetPasswordLayout from './ResetPasswordLayout.js'

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
        password_error_msg={userState.password_error_msg}
        did_reset={userState.password_did_reset}
        password_request={userState.password_request}
        getForgotPasswordToken={this.props.actions.getForgotPasswordToken.bind(this)}
      /></div>

    )
  }
}

export default withRouter(ResetPasswordView)
