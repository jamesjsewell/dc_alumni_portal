import React, { Component } from 'react'
import { Form, Field, reduxForm, change, reset } from 'redux-form'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import { FormField } from '../../forms/FormFields.js'
import * as check from '../../forms/formValidation.js'

// const afterSubmit = (result, dispatch, props) => {
//   props.reset()
//   props.untouch(['email', 'password', 'fname', 'lname'])
// }

class RegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  doThisOnSubmit (input) {
    input.account_type = this.props.account_type
    this.props.register(input)
  }

  render () {
    const { account_type, handleSubmit, register_error_message } = this.props

    return (
      <Grid item >

        <Card>

          <CardContent>

            <Typography gutterBottom variant='headline' component='h2'>
                            Register
            </Typography>

            <Typography component='p'>
                            create an account
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
