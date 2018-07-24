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

import GradProfileForm from "./GradProfileForm.jsx"
import UppyDashboardComponent from "./FileUploader.jsx"


export default class ProfileLayout extends Component {
    constructor(props) {
        super(props);

    }

    render(){
        const { profile, user, updateUser} = this.props
        return(
      
            
            <Grid container spacing={24}>
               <Grid item>
                    <Card>
                        <CardContent>
                        {user.loggedIn && user.loggedIn.account_type === "grad"? <GradProfileForm updateUser={updateUser} user={user} profile={profile}/> : null}
                        </CardContent>
                    </Card>
               </Grid> 
               <Grid item>
                    <Card>
                        <CardContent>
                            <UppyDashboardComponent user={user} updateUser={updateUser}/>
                            <Typography component="p">Update Profile Image</Typography>
                            <IconButton size="large" className="uppy_opener" arial_label="Delete"><Icon>camera_alt</Icon></IconButton>
                        </CardContent>
                    </Card>
               </Grid> 
               <Grid item>
                    <Card><CardContent>resume</CardContent></Card>
               </Grid> 
            </Grid>
       )
    }


}