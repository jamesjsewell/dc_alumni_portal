import React, { Component } from 'react'
import LoginForm from './LoginForm.js'
import RegisterForm from './RegisterForm.js'

// material-ui
import Grid from '@material-ui/core/Grid'

export default class AuthLayout extends Component {
  render () {
    const { login, register, login_error_message, register_error_message, password_request, getForgotPasswordToken, email_recipient, match, account_type } = this.props

    return (

      <Grid style={{marginTop: '2rem'}} justify='center' direction='row' container spacing={16}>

        <LoginForm

          login={login}
          getForgotPasswordToken={getForgotPasswordToken}
          login_error_message={login_error_message}
          password_request={password_request}
          email_recipient={email_recipient}
          match={match}

        />

        <RegisterForm

          account_type={account_type}
          register={register}
          register_error_message={register_error_message}

        />

      </Grid>)
  }
}
