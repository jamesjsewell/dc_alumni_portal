
import React, { Component } from 'react'

import { withRouter } from 'react-router'

import AuthLayout from './AuthLayout.js'
import Typography from '@material-ui/core/Typography'

class AuthView extends Component {
  constructor (props) {
    super(props)
    this.props.actions.auto_log_in(this.props.actions.authenticate, this.props.user)
  }

  render () {
    const { user, userState } = this.props

    if (user) {
      if (user.account_type === 'grad') {
        this.props.history.replace(this.props.routes.GRAD_PROFILE)
      }
      if (user.account_type === 'employer') {
        this.props.history.replace('/alumni')
      }
    }

    return (
      <div>
        <Typography style={{marginTop: '1rem'}} align='center' variant='title'>welcome</Typography>
        <Typography align='center' variant='caption'>login or register</Typography>
        <AuthLayout

          register={this.props.actions.register.bind(this)}
          login={this.props.actions.login.bind(this)}
          getForgotPasswordToken={this.props.actions.getForgotPasswordToken.bind(this)}
          match={this.props.match}
          account_type={this.props.account_type}
          login_error_message={userState.login_error_message}
          register_error_message={userState.register_error_message}
          password_request={userState.password_request}
          email_recipient={userState.email_recipient}

        />
      </div>
    )
  }
}

export default withRouter(AuthView)
