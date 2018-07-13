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

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    componentWillReceiveProps(nextProps){

        //to reset the form
        //this.props.reset()
        
    }

    doThisOnSubmit(input) {
       
        this.props.register({email: input.email, password: input.password, fname: "testting", lname: "testinng"})
       
    }

    render() {

        const { handleSubmit, register_error_message } = this.props

        return (
            <Grid item >
    
                <Card>

                    <CardContent>

                        <Typography gutterBottom variant="headline" component="h2">
                            Register
                        </Typography>
                        <Typography component="p">
                            create an alumni account
                        </Typography>
                        <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

                            <Field type="text" name="fname" label="first name" component={FormField} />
                            <Field type="text" name="lname" label="last name" component={FormField} />
                            <Field type="email" name="email" label="email" component={FormField} />
                            <Field type="password" name="password" label="password" component={FormField} />

                            <Button type="submit">
                                submit
                            </Button>

                            {register_error_message? <Card><CardContent>
                                <Typography component="p" color="error">{register_error_message}</Typography>
                            </CardContent></Card> : null}

                        </form >

                    </CardContent>
            
                </Card>

            </Grid>
            
        );
    }
}

export default reduxForm({
    form: 'register',
    // fields: ["name"],
    // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
    // asyncBlurFields: ["name"],
    // shouldAsyncValidate,
    onSubmitSuccess: afterSubmit
})(RegisterForm);