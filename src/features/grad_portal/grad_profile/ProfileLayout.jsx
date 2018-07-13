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

export default class AuthLayout extends Component {
    constructor(props) {
        super(props);

    }

    render(){
        const { match } = this.props
        return(
        <div>
            <Grid container spacing={24}>
               <Grid item>
                    <Card><CardContent>bio</CardContent></Card>
               </Grid> 
               <Grid item>
                    <Card><CardContent>profile pic</CardContent></Card>
               </Grid> 
               <Grid item>
                    <Card><CardContent>resume</CardContent></Card>
               </Grid> 
            </Grid>
        </div>)
    }


}