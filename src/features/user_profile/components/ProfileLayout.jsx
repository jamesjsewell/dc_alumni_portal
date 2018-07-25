import React, { Component } from "react";

//material-ui
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';

import GradProfileForm from "./GradProfileForm.jsx"
import UppyDashboardComponent from "./FileUploader.jsx"
import EmployerProfileForm from "./EmployerProfileForm.jsx";


export default class ProfileLayout extends Component {
    constructor(props) {
        super(props);

    }

    removeFile(type){
        var userId = this.props.user.loggedIn._id

        if(type === "avatar"){
            this.props.updateUser(userId, {avatar: null})
        }

        if(type === "resume"){
            this.props.updateUser(userId, {resume: null})
        }

    }

    render(){
        const { profile, user, updateUser} = this.props
        return(
      
            
            <Grid container spacing={24}>
               <Grid item>
                    <Card>
                        <CardContent>
                        {user.loggedIn && user.loggedIn.account_type === "grad"? <GradProfileForm updateUser={updateUser} user={user} profile={profile}/> : null}
                        {user.loggedIn && user.loggedIn.account_type === "employer"? <EmployerProfileForm updateUser={updateUser} user={user} profile={profile}/> : null}
                        </CardContent>
                    </Card>
               </Grid> 
               { user.loggedIn.account_type === "grad"? <Grid item>

                    <Card>
                        <CardHeader title="Profile Image" subheader="Update your profile image" />
                        <CardContent>

                            <Avatar
                                sizes="large"
                                src={profile.avatar}
                            />

                        
                            {!profile.avatar? <UppyDashboardComponent user={user} updateUser={updateUser} avatar/> : null}
                            
                        </CardContent>
                        <CardActions>
                            {!profile.avatar? <IconButton size="large" className="uppy_opener_avatar" arial_label="Upload"><Icon>camera_alt</Icon></IconButton> : null}
                            {profile.avatar? <IconButton onClick={(event)=>{this.removeFile('avatar')}} size="large" arial_label="remove"><Icon>delete_forever</Icon></IconButton> : null}
                        </CardActions>
                    </Card>
               </Grid> : null }
               { user.loggedIn.account_type === "grad" ? <Grid item>
                    <Card>
                        <CardHeader title="Resume" subheader="Update your resume" />
                        <CardContent>
                            {profile.resume? <a href={profile.resume}>your current resume</a> : <Typography component="p">Upload your resume</Typography>}
                            {!profile.resume? <UppyDashboardComponent user={user} updateUser={updateUser} resume/> : null}
                        </CardContent>
                        <CardActions>
                            {!profile.resume? <IconButton size="large" className="uppy_opener_resume" arial_label="Upload"><Icon>description</Icon></IconButton> : null}
                            {profile.resume? <IconButton onClick={(event)=>{this.removeFile('resume')}} size="large" arial_label="remove"><Icon>delete_forever</Icon></IconButton> : null}
                        </CardActions>
                    </Card>
               </Grid> : null } 
            </Grid>
       )
    }


}