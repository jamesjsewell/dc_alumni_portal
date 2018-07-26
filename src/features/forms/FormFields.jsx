import React, { Component } from "react";
import { Field, reduxForm } from "redux-form"
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//example for the outer div, for styling based on state: className={asyncValidating ? 'async-validating' : ''} required={required} error={error && touched ? true : false}
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
    
        {/* <input
            name={input.name}
            type={type}
            value={input.value}
            onChange={input.onChange}
            placeholder={placeholder}
            onBlur={input.onBlur}
            
        /> */}
        <TextField
            select={select? true : false}
            name={input.name}
            type={type}
            label={label}
            value={input.value}
            onChange={input.onChange}
            onBlur={input.onBlur}
            margin="normal"
        />
        {touched &&
            ((error &&
                <div>
                    <span>{error}</span>
                </div>) ||
                (warning &&
                    <div>
                        <span>{warning}</span>
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
    <Paper>

    
        <TextField
            name={input.name}
            multiline={true}
            rows={4}
            rowsMax={8}
            fullWidth={true}
            value={input.value}
            onChange={input.onChange}
            placeholder={placeholder}
            onBlur={input.onBlur}
            
        />
        {touched &&
            ((error &&
                <div>
                    <span>{error}</span>
                </div>) ||
                (warning &&
                    <div>
                        <span>{warning}</span>
                    </div>))}
    </Paper>
)


//example of a select
/* <TextField  onChange={(event)=>{this.updatedAccountType(event)}} value={this.state.accountType} select helperText="select your account type" margin="normal">
<MenuItem value="grad">
    Grad
</MenuItem>
</TextField> */