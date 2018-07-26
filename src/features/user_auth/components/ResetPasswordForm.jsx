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


const afterSubmit = (result, dispatch, props) => {
    props.reset();
    props.untouch(["email", "password"]);

}

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    componentWillReceiveProps(nextProps){

        //to reset the form
        //this.props.reset()
        
    }

    doThisOnSubmit(input) {
       
        const resetToken = this.props.match.params.resetToken
        this.props.resetPassword(resetToken, input.new_password)
        // this.state.dispatchedReset = true
    }

    render() {

        const { handleSubmit } = this.props

        return (
            <Grid item>
    
                <Card>

                    <CardContent>

                        <Typography gutterBottom variant="headline" component="h2">
                            Reset Password
                        </Typography>
                        <Typography component="p">
                            enter the new password you wish to use
                        </Typography>
                        <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

                            <Field type="password" name="new_password" label="new password" component={FormField} />
                            <Field type="password" name="confirm_password" label="confirm password" component={FormField} />

                            <Button type="submit">
                                submit
                            </Button>

                        </form >

                    </CardContent>
            
                </Card>

            </Grid>
            
        );
    }
}

export default reduxForm({
    form: 'reset_password',
    // fields: ["name"],
    // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
    // asyncBlurFields: ["name"],
    // shouldAsyncValidate,
    onSubmitSuccess: afterSubmit
})(ResetPasswordForm);