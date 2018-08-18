import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Switch from '@material-ui/core/Switch'

// example for the outer div, for styling based on state: className={asyncValidating ? 'async-validating' : ''} required={required} error={error && touched ? true : false}
export const FormField = ({
  input,
  label,
  type,
  select,
  placeholder,
  required,
  asyncValidation,
  initialValues,
  meta: { touched, error, warning, value, asyncValidating, pristine}
}) => (
  <div>

    <TextField
      select={!!select}
      name={input.name}
      type={type}
      label={label}
      value={input.value}
      onChange={input.onChange}
      onBlur={input.onBlur}
      margin='normal'
    />
    {touched &&
            ((error &&
            <div>
              <Typography color='error' >{error}</Typography>
            </div>) ||
                (warning &&
                <div>
                  <Typography color='error'>{warning}</Typography>
                </div>))}
  </div>
)

export const TextArea = ({
  input,
  label,
  type,
  placeholder,
  required,
  asyncValidation,
  initialValues,
  meta: { touched, error, warning, value, asyncValidating, pristine }
}) => (
  <Paper style={{width: '100%'}}>

    <TextField
      name={input.name}
      multiline
      rows={4}
      rowsMax={8}
      fullWidth
      value={input.value}
      onChange={input.onChange}
      placeholder={placeholder}
      onBlur={input.onBlur}

    />
    {touched &&
            ((error &&
            <div>
              <Typography color='error' >{error}</Typography>
            </div>) ||
                (warning &&
                <div>
                  <Typography color='error' >{error}</Typography>
                </div>))}
  </Paper>
)

export const RadioSelect = ({
  style,
  input,
  label,
  meta: { value }
}) => (
  <FormControlLabel
    style={style}
    control={
      <Switch
        checked={input.checked}
        onChange={input.onChange}
        value={input.value.toString()}
        color='default'
      />}
    label={label}
  />
)

export const DatePicker = ({
  input,
  label,
  meta: { value }
}) => (

  <TextField
    value={input.value}
    onChange={input.onChange}
    type='date'
  />

)
