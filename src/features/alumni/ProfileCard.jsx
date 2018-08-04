import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'


const styles = {
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  };

class ProfileCard extends Component {

  constructor(props) {
    
    super(props)

    

  }

  render() {
    const { grad, openModal, classes} = this.props
    
    return (

      <Grid item xs>
      
        <Card>
            <CardHeader

                avatar={
                    <Avatar
                        src={grad.avatar}
                    />}
                
                title={ grad.fname && grad.lname? grad.fname + " " + grad.lname : ''}
                subheader={grad.city && grad.state? grad.city + " " + grad.state : ''}
            >

            </CardHeader>
            <CardContent>
                
                {grad.bio? <Typography component="p">{grad.bio}</Typography>  : null}

                {grad.skills && grad.skills.length? <List component="ul">
                    <ListSubheader component="div">skills</ListSubheader>
                    <Divider />
                    
                    {grad.skills.map((skill)=>{

                        return ( 
                            <ListItem>
                                <ListItemText primary={skill} />
                            </ListItem>)

                    })}
    
                </List> : null}
                
                {grad.willingnessToRelocate? <Paper elevation={0} square><Icon title="willing to relocate" style={{ fontSize: 30 }} >commute</Icon><Typography component="span">willing to relocate</Typography></Paper>: null}
            
                
            </CardContent>
            <CardActions>
                <IconButton onClick={()=>{openModal(grad)}} color="primary" component="span">
                    <Icon size="xl">pageview</Icon> 
                </IconButton>
            </CardActions>

        </Card>
        
      </Grid>
    )
  }
}

export default withStyles(styles)(ProfileCard)
