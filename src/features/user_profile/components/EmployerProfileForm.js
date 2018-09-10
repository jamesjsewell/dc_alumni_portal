import _ from 'underscore'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormField } from '../../forms/FormFields.js'
import * as check from '../../forms/formValidation.js'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

import CardContent from '@material-ui/core/CardContent'

import Button from '@material-ui/core/Button'

var fieldValues = {}
const afterSubmit = (result, dispatch, props) => {
  props.reset()
  props.untouch([])
}

class EmployerProfileForm extends Component {
  constructor (props) {
    super(props)
    this.state = { expanded: 'panel1', password_dialog_open: false }
    var userValues = _.omit(this.props.user, '__v', '_id', 'updatedAt')
    fieldValues = _.extend(fieldValues, userValues)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user !== this.props.user) {
      for (var attribute in nextProps.user) {
        var value = nextProps.user[attribute]
        this.props.change(attribute, value)
      }
    }
  }

  openPasswordDialog () {
    this.setState({password_dialog_open: true})
  }

  closePasswordDialog () {
    this.setState({password_dialog_open: false})
  }

  doThisOnSubmit (input) {
    this.props.updateUser(this.props.user._id, input)
  }

  render () {
    const { handleSubmit } = this.props

    return (

      <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

        <Grid container spacing={24}>

          <Grid item>

            <Card>

              <CardContent >

                <Field type='text' name='companyName' label='Company Name' component={FormField} validate={[check.alphaNumeric]} />
                <Field type='text' name='companyURL' label='Company URL' component={FormField} />
                <Field type='text' name='phone' label='Phone Number' component={FormField} validate={[check.phoneNumber]} />

              </CardContent>

            </Card>

          </Grid>

          <Grid item>
            <Button variant='outlined' type='submit'>
                            Save
            </Button>
          </Grid>

        </Grid>

      </form >)
  }
}

export default reduxForm({
  form: 'employer_profile_form',
  // fields: ["name"],
  // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
  // asyncBlurFields: ["name"],
  // shouldAsyncValidate,
  onSubmitSuccess: afterSubmit,
  initialValues: fieldValues
})(EmployerProfileForm)
