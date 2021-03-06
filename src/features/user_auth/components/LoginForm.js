import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import ForgotPasswordForm from './ForgotPasswordForm.js'
import { FormField } from '../../forms/FormFields.js'
import * as check from '../../forms/formValidation.js'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {password_dialog_open: false}
  }

  componentWillReceiveProps (nextProps) {

  }

  openPasswordDialog () {
    this.setState({password_dialog_open: true})
  }

  closePasswordDialog () {
    this.setState({password_dialog_open: false})
  }

  doThisOnSubmit (input) {
    this.props.login({email: input.email_login, password: input.password_login})
  }

  render () {
    const { handleSubmit, login_error_message, password_request, getForgotPasswordToken, email_recipient } = this.props

    return (
      <Grid item >

        <Card>

          <CardContent>

            <Typography variant='caption'>
                            enter your login credentials
            </Typography>
            <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

              <Field type='email' name='email_login' label='email' component={FormField} validate={[check.required, check.email]} required />
              <Field type='password' name='password_login' label='password' component={FormField} validate={[check.required]} required />

              <Button style={{marginTop: '1rem'}} size='small' color='primary' variant='contained' type='submit'>
                                Login
              </Button>

            </form >

            {login_error_message ? <Card><CardContent><Typography component='p' color='error'>{login_error_message}</Typography></CardContent></Card> : null}

          </CardContent>

          <CardActions><Button variant='outlined' size='small' onClick={() => { this.openPasswordDialog() }}>forgot password?</Button></CardActions>

          <Dialog
            fullScreen={false}
            open={!!this.state.password_dialog_open}
            // onClose={this.handleClose}
            aria-labelledby='responsive-dialog-title'
            fullWidth
            maxWidth={false}
          >
            <DialogTitle id='responsive-dialog-title'>{password_request === 'sent' ? 'Success!' : 'Request Password Change '}</DialogTitle>

            <DialogContent>

              <DialogContentText>
                { !password_request || password_request === null || password_request === 'failed' ? 'enter the email associated with the account' : null }
                { password_request === 'sending' ? '...sending request' : null }
                { password_request === 'sent' ? 'an email was sent to the address you provided, open the email to continue. Follow the link in the most recent email from us. If you do not receive the email soon, try again.' : null }
              </DialogContentText>

              <ForgotPasswordForm password_request={password_request} getForgotPasswordToken={getForgotPasswordToken} />

            </DialogContent>
            <DialogActions>
              { password_request != 'sending' ? <Button onClick={() => { this.closePasswordDialog() }} color='primary'>
                                close
              </Button> : null }
            </DialogActions>
          </Dialog>

        </Card>

      </Grid>

    )
  }
}

export default reduxForm({
  form: 'login'
  // fields: ["name"],
  // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
  // asyncBlurFields: ["name"],
  // shouldAsyncValidate,
  // onSubmitSuccess: afterSubmit
})(LoginForm)
