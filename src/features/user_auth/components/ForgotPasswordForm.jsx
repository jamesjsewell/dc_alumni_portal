import React, { Component } from "react";
import { Form, Field, reduxForm, change, reset } from "redux-form";
//import { alphaNumeric, required, shouldAsyncValidate, asyncValidate } from "../../util/forms/formValidation.js"

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { FormField } from "../../forms/FormFields.jsx"
import * as check from "../../forms/formValidation.js"


const afterSubmit = (result, dispatch, props) => {
    props.reset();
    props.untouch(["email"]);

}

class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    componentWillReceiveProps(nextProps){

        //to reset the form
        //this.props.reset()
    
        
    }

    doThisOnSubmit(input) {
        
        if(input && input.email){
            this.props.getForgotPasswordToken(input.email)
        }
           
    }

    render() {

        const { handleSubmit, password_request } = this.props
        
        
        return (
    
            <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

                <Field type="email" name="email" label="email" component={FormField} validate={[check.required, check.email]} required={true}  />

                { password_request != "sending" ? <Button variant="contained" type="submit">
                    request
                </Button> : null}

                { password_request === "failed" ? <Card><CardContent><Typography component="p" color="error">something went wrong, try again</Typography></CardContent></Card> : null }

            </form > 
            
        );
    }
}

export default reduxForm({
    form: 'forgot_password',
    // fields: ["name"],
    // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
    // asyncBlurFields: ["name"],
    // shouldAsyncValidate,
    onSubmitSuccess: afterSubmit
})(ForgotPasswordForm);