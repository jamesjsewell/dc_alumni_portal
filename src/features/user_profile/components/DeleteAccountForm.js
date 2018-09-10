
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormField } from '../../forms/FormFields.js'
import * as check from '../../forms/formValidation.js'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class DeleteAccountForm extends Component {
  constructor (props) {
    super(props)
    this.state = { }

    this.emailsMatch = email => (email && this.props.user.email && email.toLowerCase() != this.props.user.email.toLowerCase() ? 'must match account email' : null)
  }

  doThisOnSubmit (input) {
    console.log(input)
    this.props.removeAccount(input.account_email)
  }

  render () {
    const { handleSubmit, error_deleting_user} = this.props

    return (

      <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

        <Field
          type='email'
          name='account_email'
          label='email'
          component={FormField}
          validate={[check.required, this.emailsMatch]}
        />
        {error_deleting_user === true ? <Typography style={{margin: '.5rem'}} color='error'>error deleting user</Typography> : null}
        <Button size='small' color='red' style={{margin: '.5rem'}} variant='outlined' type='submit'>
                    delete account
        </Button>

      </form >)
  }
}

export default reduxForm({
  form: 'delete_account_form'
  // fields: ["name"],
  // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
  // asyncBlurFields: ["name"],
  // shouldAsyncValidate,
  // onSubmitSuccess: afterSubmit
})(DeleteAccountForm)
