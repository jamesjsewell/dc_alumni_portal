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
        var userId = this.props.user._id

        if(type === "avatar"){
            this.props.updateUser(userId, {avatar: null})
        }

        if(type === "resume"){
            this.props.updateUser(userId, {resume: null})
        }

    }

    render(){
        const { user, updateUser} = this.props
        return(
            
            <Grid container spacing={24}>
               <Grid item>
                    <Card>
                        <CardContent>
                        {user && user.account_type === "grad"? <GradProfileForm updateUser={updateUser} user={user} /> : null}
                        {user && user.account_type === "employer"? <EmployerProfileForm updateUser={updateUser} user={user} /> : null}
                        </CardContent>
                    </Card>
               </Grid> 
               { user.account_type === "grad"? <Grid item>

                    <Card>
                        <CardHeader title="Profile Image" subheader="Update your profile image" />
                        <CardContent>

                            <Avatar
                                sizes="large"
                                src={user.avatar}
                            />

                            {!user.avatar? <UppyDashboardComponent user={user} updateUser={updateUser} avatar={true}/> : null}
                            
                        </CardContent>
                        <CardActions>
                            {!user.avatar? <IconButton size="large" className="uppy_opener_avatar" arial_label="Upload"><Icon>camera_alt</Icon></IconButton> : null}
                            {user.avatar? <IconButton onClick={(event)=>{this.removeFile('avatar')}} size="large" arial_label="remove"><Icon>delete_forever</Icon></IconButton> : null}
                        </CardActions>
                    </Card>
               </Grid> : null }
               { user.account_type === "grad" ? <Grid item>
                    <Card>
                        <CardHeader title="Resume" subheader="Update your resume" />
                        <CardContent>
                            {user.resume? <a href={user.resume}>your current resume</a> : <Typography component="p">Upload your resume</Typography>}
                            {!user.resume? <UppyDashboardComponent user={user} updateUser={updateUser} resume={true}/> : null}
                        </CardContent>
                        <CardActions>
                            {!user.resume? <IconButton size="large" className="uppy_opener_resume" arial_label="Upload"><Icon>description</Icon></IconButton> : null}
                            {user.resume? <IconButton onClick={(event)=>{this.removeFile('resume')}} size="large" arial_label="remove"><Icon>delete_forever</Icon></IconButton> : null}
                        </CardActions>
                    </Card>
               </Grid> : null } 
            </Grid>
       )
    }


}