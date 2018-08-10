import React, { Component } from "react"

import GradProfileForm from "./GradProfileForm.jsx"
import UppyDashboardComponent from "./FileUploader.jsx"
import EmployerProfileForm from "./EmployerProfileForm.jsx"
import ForgotPasswordForm from "../../user_auth/components/ForgotPasswordForm.jsx"

//material-ui
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DeleteAccountForm from "./DeleteAccountForm.jsx";


export default class ProfileLayout extends Component {

    constructor(props) {
        super(props)
        this.state = {password_dialog_open: false, delete_account_open: false}

    }

    openPasswordDialog(){
        this.setState({password_dialog_open: true})
    }

    closePasswordDialog(){
        this.setState({password_dialog_open: false})
    }

    openDeleteAccount(){
        this.setState({delete_account_open: true})
    }

    closeDeleteAccount(){
        this.setState({delete_account_open: false})
    }

    removeAccount(email){
        
        if(email === this.props.user.email){
            this.props.deleteUser(this.props.user._id)
        }
        
    }

    removeFile(type){
        var userId = this.props.user._id

        if(type === "avatar"){
            this.props.updateUser(userId, {avatar: null})
        }

        if(type === "resume"){
            this.props.updateUser(userId, {resume: null})
        }

    }

    render(){
        const { user, userState, updateUser, getForgotPasswordToken, error_deleting_user} = this.props
        const { password_request } = this.props.userState
        return(
            
            <Grid style={{marginTop: '2rem'}} container justify="center" spacing={24}>
               <Grid item>
                    <Card>
                        <CardContent>
                        
                        <Divider />
                        {user && user.account_type === "grad"? <GradProfileForm updateUser={updateUser} user={user} /> : null}
                        {user && user.account_type === "employer"? <EmployerProfileForm updateUser={updateUser} user={user} /> : null}

                        {userState.error_updating_user? <Typography style={{padding: '.5rem', maring: '.5rem'}} color="error">error updating user</Typography> : null}
                        <Divider />

                        <Button style={{margin: '.5rem'}} variant="outlined" size="small" onClick={()=>{this.openPasswordDialog()}}>reset password</Button>
                        <Button style={{margin: '.5rem'}} size="small" onClick={()=>{this.openDeleteAccount()}}> <Icon>delete</Icon> delete account</Button>
                        </CardContent>
                    </Card>
               </Grid> 
               { user.account_type === "grad"? 
               <Grid item>

                    <Card>
                        <CardHeader title="Profile Image" subheader="Update your profile image" />
                        <CardContent>

                            {user.avatar? <Avatar
                                sizes="large"
                                src={user.avatar}
                            /> : <Typography component="p">Upload a profile image</Typography>}

                            {!user.avatar? <UppyDashboardComponent user={user} updateUser={updateUser} avatar={true}/> : null}
                            
                        </CardContent>
                        <CardActions>
                            {!user.avatar? <IconButton size="large" className="uppy_opener_avatar" arial_label="Upload"><Icon>camera_alt</Icon></IconButton> : null}
                            {user.avatar? <IconButton onClick={(event)=>{this.removeFile('avatar')}} size="large" arial_label="remove"><Icon>delete_forever</Icon></IconButton> : null}
                        </CardActions>
                    </Card>
                                    
                    <Card>
                        <CardHeader title="Resume" subheader="Update your resume" />
                        <CardContent>
                            {user.resume? <Button href={user.resume} variant="outlined">view</Button> : <Typography component="p">Upload your resume</Typography>}
                            {!user.resume? <UppyDashboardComponent user={user} updateUser={updateUser} resume={true}/> : null}
                        </CardContent>
                        <CardActions>
                            {!user.resume? <IconButton size="large" className="uppy_opener_resume" arial_label="Upload"><Icon>description</Icon></IconButton> : null}
                            {user.resume? <IconButton onClick={(event)=>{this.removeFile('resume')}} size="large" arial_label="remove"><Icon>delete_forever</Icon></IconButton> : null}
                        </CardActions>
                    </Card>

                    
               </Grid> : null } 

               <Dialog
                    fullScreen={false}
                    open={this.state.password_dialog_open ? true : false}
                    // onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{password_request === "sent"? "Success!" : "Password Change "}</DialogTitle>

                    <DialogContent>
                        <Card>
                            <CardContent>
                                <DialogContentText>
                                    { password_request === null || password_request === "failed" ? "enter the email associated with this account" : null }
                                    { password_request === "sending" ? "...sending request" : null }
                                    { password_request === "sent" ? "an email was sent to the address you provided, open the email to continue. Follow the link in the most recent email from us. If you do not receive the email soon, try again." : null }
                                </DialogContentText>
                            </CardContent>
                        </Card>
                        <ForgotPasswordForm password_request={password_request} getForgotPasswordToken={getForgotPasswordToken}/> 
                    
                    </DialogContent>
                    <DialogActions>
                        { password_request != "sending"? <Button onClick={()=>{this.closePasswordDialog()}} color="primary">
                            close
                        </Button> : null }
                    </DialogActions>
                </Dialog>

                <Dialog
                    fullScreen={false}
                    open={this.state.delete_account_open ? true : false}
                    // onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">remove account</DialogTitle>

                    <DialogContent>
                        <DialogContentText>enter the email you used to sign in to permanently remove this account</DialogContentText>
                        <Card>
                            <CardContent>
                                
                                <DialogContentText>
                                    <DeleteAccountForm removeAccount={this.removeAccount.bind(this)} error_deleting_user={error_deleting_user} user={this.props.user} />
                                </DialogContentText>
                            </CardContent>
                        </Card>
                        
                    
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.closeDeleteAccount()}} color="primary">
                            close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
       )
    }


}