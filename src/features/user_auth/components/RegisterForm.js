import React, { Component } from 'react'
import { Field, reduxForm, reset } from 'redux-form'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

import CardContent from '@material-ui/core/CardContent'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { FormField } from '../../forms/FormFields.js'
import * as check from '../../forms/formValidation.js'

class RegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  doThisOnSubmit (input) {
    input.account_type = this.props.account_type
    input.fname = input.fname.toLowerCase()
    input.lname = input.lname.toLowerCase()
    this.props.register(input)
  }

  render () {
    const { account_type, handleSubmit, register_error_message } = this.props

    return (
      <Grid item >

        <Card>

          <CardContent>

            <Typography variant='caption'>
                            don't have an account? create one
            </Typography>

            <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

              <Field type='email' name='email' label='Email' component={FormField} validate={[check.required, check.email]} required />
              <Field type='password' name='password' label='Password' component={FormField} validate={[check.required]} required />
              <Field type='text' name='fname' label='First Name' component={FormField} validate={[check.alphaNumeric, check.required]} required />
              <Field type='text' name='lname' label='Last Name' component={FormField} validate={[check.alphaNumeric, check.required]} required />

              { account_type === 'employer'
                ? <div>
                  <Field type='text' name='companyName' label='Company Name' component={FormField} />
                  <Field type='text' name='companyURL' label='Company URL' component={FormField} />
                  <Field type='text' name='phone' label='Phone Number' component={FormField} />
                </div> : null }

              <Button style={{marginTop: '1rem'}} type='submit'>
                                register
              </Button>

              {register_error_message ? <Card><CardContent>
                <Typography component='p' color='error'>{register_error_message}</Typography>
              </CardContent></Card> : null}

            </form >

          </CardContent>

        </Card>

      </Grid>

    )
  }
}

export default reduxForm({
  form: 'register'
  // fields: ["name"],
  // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
  // asyncBlurFields: ["name"],
  // shouldAsyncValidate,
  // onSubmitSuccess: afterSubmit
})(RegisterForm)
