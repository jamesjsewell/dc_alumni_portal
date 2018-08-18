import React, { Component } from 'react'
import { Form, Field, reduxForm, change, reset } from 'redux-form'
// import { alphaNumeric, required, shouldAsyncValidate, asyncValidate } from "../../util/forms/formValidation.js"

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { FormField } from '../../forms/FormFields.js'
import * as check from '../../forms/formValidation.js'

// const afterSubmit = (result, dispatch, props) => {
//   props.reset()
//   props.untouch(['new_password'])
// }

const Error_resetting = (props) => {
  const { password_error_msg } = props
  return (
    <Typography color='error' component='p'>
      {password_error_msg}
    </Typography>)
}

class ResetPasswordForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (nextProps) {

    // to reset the form
    // this.props.reset()

  }

  doThisOnSubmit (input) {
    const resetToken = this.props.match.params.resetToken
    this.props.resetPassword(resetToken, input.new_password, input.the_email, this.props.routes, this.props.history)
    // this.state.dispatchedReset = true
  }

  render () {
    const { handleSubmit, password_error_msg, error_resetting } = this.props

    return (

      <Paper elevation={0} style={{margin: 'auto', marginTop: '1rem', marginBottom: '1rem', padding: '.5rem', maxWidth: '600px'}}>

        <Typography gutterBottom variant='headline' component='h2'>
                            Reset Password
        </Typography>
        <Typography component='p'>
                            enter the new password you wish to use
        </Typography>
        <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

          <Field type='email' name='the_email' label='email' component={FormField} validate={[check.required]} required />
          <Field type='password' name='new_password' label='new password' component={FormField} validate={[check.required]} required />

          <Button type='submit'>
                                submit
          </Button>

        </form >

        {error_resetting ? <Error_resetting password_error_msg={password_error_msg} /> : null }

      </Paper>

    )
  }
}

export default reduxForm({
  form: 'reset_password'
  // fields: ["name"],
  // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
  // asyncBlurFields: ["name"],
  // shouldAsyncValidate,
  // onSubmitSuccess: afterSubmit
})(ResetPasswordForm)
