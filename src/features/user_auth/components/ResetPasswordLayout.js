import React, { Component } from 'react'

import ResetPasswordForm from './ResetPasswordForm.js'

import Paper from '@material-ui/core/Paper'

import Typography from '@material-ui/core/Typography'

const DidReset = (props) => {
  return (
    <Typography color='primary' component='p'>
                    Your password has been reset
    </Typography>)
}

export default class ResetPasswordLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {password_dialog_open: false}
  }

  openPasswordDialog () {
    this.setState({password_dialog_open: true})
  }

  closePasswordDialog () {
    this.setState({password_dialog_open: false})
  }

  render () {
    const {user, routes, error_resetting, password_error_msg, did_reset, password_request, getForgotPasswordToken, resetPassword, match, history} = this.props
    return (

      <Paper style={{margin: 'auto'}}>

        {did_reset === false ? <ResetPasswordForm match={match} resetPassword={resetPassword} history={history} routes={routes} error_resetting={error_resetting} password_error_msg={password_error_msg} /> : null}

        {did_reset === true ? <DidReset user={user} routes={routes} /> : null}
      </Paper>
    )
  }
}
