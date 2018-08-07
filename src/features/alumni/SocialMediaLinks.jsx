import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles'
import githubIcon from '../../images/github.svg'
import linkedinIcon from '../../images/linkedin.svg'
import stackOverflowIcon from '../../images/stack_overflow.svg'
import mediumIcon from '../../images/medium_com.svg'

import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon"

import List from "@material-ui/core/ListItem"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";

const styles={

    root:{
        margin: 'auto',
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        padding: '.2rem'
    },

    avatar:{
        width: '2rem',
        height: '2rem'
    }

}

class SocialMediaLinks extends Component{
    
    render(){
        const {classes} = this.props
        return(
          
            <Paper elevation={0} className={classes.root} component="div">
                    
                <Avatar className={classes.avatar} component="a" href="https://www.google.com" src={githubIcon} />
                    
                <Avatar className={classes.avatar} component="a" href="https://www.google.com" src={linkedinIcon} />
            
                <Avatar className={classes.avatar} component="a" href="https://www.google.com" src={stackOverflowIcon} />
                 
                <Avatar className={classes.avatar} component="a" href="https://www.google.com" src={mediumIcon} />

            </Paper>
          
        )
        
    }
}

export default withStyles(styles)(SocialMediaLinks)