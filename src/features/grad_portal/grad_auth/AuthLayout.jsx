import React, { Component } from "react";
import LoginForm from "./LoginForm.jsx"
import RegisterForm from "./RegisterForm.jsx"

//material-ui
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class AuthLayout extends Component {
    constructor(props) {
        super(props);

    }

    render(){
        const { login, register, password_request, getForgotPasswordToken, email_recipient } = this.props
        return(
        <div>
            <Grid container spacing={24}>
                <LoginForm login={login} password_request={password_request} getForgotPasswordToken={getForgotPasswordToken} email_recipient={email_recipient} />
                <RegisterForm register={register} />
            </Grid>
        </div>)
    }


}