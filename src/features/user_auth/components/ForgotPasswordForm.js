import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { FormField } from '../../forms/FormFields.js'
import * as check from '../../forms/formValidation.js'

class ForgotPasswordForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  doThisOnSubmit (input) {
    if (input && input.email) {
      this.props.getForgotPasswordToken(input.email)
    }
  }

  render () {
    const { handleSubmit, password_request } = this.props

    return (

      <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

        <Field type='email' name='email' label='email' component={FormField} validate={[check.required, check.email]} required />

        { password_request != 'sending' ? <Button style={{margin: '.5rem'}} variant='outlined' size='small' type='submit'>
                    request
        </Button> : null}

        { password_request === 'failed' ? <Typography style={{margin: '.5rem'}} component='p' color='error'>something went wrong, try again</Typography> : null }

      </form >

    )
  }
}

export default reduxForm({
  form: 'forgot_password'
  // fields: ["name"],
  // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
  // asyncBlurFields: ["name"],
  // shouldAsyncValidate,
  // onSubmitSuccess: afterSubmit
})(ForgotPasswordForm)
