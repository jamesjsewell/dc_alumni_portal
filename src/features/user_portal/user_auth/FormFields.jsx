import React, { Component } from "react";
import { Field, reduxForm } from "redux-form"
import TextField from '@material-ui/core/TextField';

//example for the outer div, for styling based on state: className={asyncValidating ? 'async-validating' : ''} required={required} error={error && touched ? true : false}
export const FormField = ({
    input,
    label,
    type,
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
    <div>
        <label style={{display: 'block'}}>{label}</label>
        <textarea
            name={input.name}
            type={type}
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
    </div>
)