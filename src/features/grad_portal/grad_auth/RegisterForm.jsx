import React, { Component } from "react";
import { Form, Field, reduxForm, change, reset } from "redux-form";
//import { alphaNumeric, required, shouldAsyncValidate, asyncValidate } from "../../util/forms/formValidation.js"

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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

    doThisOnSubmit(formProps) {
       
        var userInput = formProps;
        this.props.register({email: Math.random().toString(), password: "testing" , fname: "testting", lname: "testinng"})
       
    }

    render() {

        const { handleSubmit } = this.props

        return (
            <Grid item xs={6}>
    
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            Register
                        </Typography>
                        <Typography component="p">
                            register form goes here
                        </Typography>
                        <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

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
    form: 'register',
    // fields: ["name"],
    // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
    // asyncBlurFields: ["name"],
    // shouldAsyncValidate,
    onSubmitSuccess: afterSubmit
})(RegisterForm);