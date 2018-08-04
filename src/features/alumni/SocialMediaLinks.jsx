import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles'
import githubIcon from '../../images/github.svg'
import linkedinIcon from '../../images/linkedin.svg'
import stackOverflowIcon from '../../images/stack_overflow.svg'

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
        width: '100%',
        display: 'block',
        minWidth: '200px',
        maxWidth: '250px'
    },

}

class SocialMediaLinks extends Component{
    
    render(){
        const {classes} = this.props
        return(
          
            <List className={classes.root} disablePadding dense component="ul">
                <ListItem dense color="secondary" button component="a" href="https://www.google.com">
                    <ListItemAvatar >
                        <Avatar src={githubIcon} />
                    </ListItemAvatar>
                    <ListItemText primary="github"/>
                </ListItem>
                <Divider inset />
                <ListItem dense button component="a" href="https://www.google.com">
                    <ListItemAvatar >
                        <Avatar src={linkedinIcon} />
                    </ListItemAvatar>
                    <ListItemText primary="linkedin"/>
                </ListItem>
                <Divider inset />
                <ListItem dense button component="a" href="https://www.google.com">
                    <ListItemAvatar >
                        <Avatar src={stackOverflowIcon} />
                    </ListItemAvatar>
                    <ListItemText primary="stack overflow"/>
                </ListItem>
            </List>
          
        )
        
    }
}

export default withStyles(styles)(SocialMediaLinks)