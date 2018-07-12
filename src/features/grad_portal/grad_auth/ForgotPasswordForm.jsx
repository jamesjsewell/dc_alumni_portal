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
import { FormField } from "./FormFields.jsx"


const afterSubmit = (result, dispatch, props) => {
    props.reset();
    props.untouch(["email", "password"]);

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

                { password_request != "sent" ? <div><Field type="email" name="email" label="email" component={FormField} />
                <Field type="email" name="email_confirm" label="confirm email" component={FormField} /> </div> : null }

                { password_request != "sent" && password_request != "sending" ? <Button variant="contained" type="submit">
                    request
                </Button> : null}

                { password_request === "failed" ? <p>something went wrong, try again</p> : null }

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