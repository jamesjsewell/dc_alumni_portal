import _ from 'underscore'
import React, { Component } from 'react'
import { Form, Field, reduxForm, change, reset } from 'redux-form'
import { FormField, TextArea } from '../../forms/FormFields.js'
import * as check from '../../forms/formValidation.js'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

const afterSubmit = (result, dispatch, props) => {
  props.reset()
  props.untouch([])
}

class DeleteAccountForm extends Component {
  constructor (props) {
    super(props)
    this.state = { }

    this.emailsMatch = email => (email != this.props.user.email ? 'must match account email' : null)
  }

  doThisOnSubmit (input) {
    console.log(input)
    this.props.removeAccount(input.account_email)
  }

  render () {
    const { handleSubmit, error_deleting_user} = this.props
    const { expanded } = this.state

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
        <Button color='red' style={{margin: '.5rem'}} variant='outlined' type='submit'>
                    delete account
        </Button>

      </form >)
  }
}

export default reduxForm({
  form: 'delete_account_form',
  // fields: ["name"],
  // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
  // asyncBlurFields: ["name"],
  // shouldAsyncValidate,
  onSubmitSuccess: afterSubmit
})(DeleteAccountForm)
