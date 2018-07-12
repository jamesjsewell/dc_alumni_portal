import React from "react"
import LoginForm from "./LoginForm.jsx"
import RegisterForm from "./RegisterForm.jsx"
import ForgotPasswordForm from "./ForgotPasswordForm.jsx"

//material-ui
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';


export const AuthLayout = (props) => {

    return(
    <div>
        <Grid container spacing={24}>
            <LoginForm login={props.login} />
            <RegisterForm register={props.register} />
        </Grid>
        <Button>forgot password?</Button>
        <Dialog
            fullScreen={false}
            open={true}
            // onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Change Password"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                enter the new password you wish to use
            </DialogContentText>
                <ForgotPasswordForm />
            </DialogContent>
        </Dialog>
    </div>)

}