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

      <Grid item>
      
        <Card elevation={5} style={{ width: '300px'}}>
            <CardHeader

                avatar={
                    <Avatar
                        src={grad.avatar}
                    />}
                
                title={ grad.fname && grad.lname? grad.fname + " " + grad.lname : ''}
        
            >

            </CardHeader>
            <CardContent>

                <Paper elevation={0} style={{width: '98%' , height: '25px', padding: '.2rem', margin: '.2rem'}} elevation={0}>
                    <Typography variant="caption">{grad.city && grad.state? grad.city + " " + grad.state : 'location not set'}</Typography>
                </Paper>

                <Divider />
                
                <Paper elevation={0} style={{ margin: 'auto', width: '98%', height: '90px', padding: '.2rem', margin: '.2rem' }}><Typography component="p">{grad.bio}</Typography></Paper>

                <Paper elevation={0} style={{ margin: 'auto', marginBottom: '1rem', width: '98%', height: '70px', padding: '.2rem', margin: '.2rem'}}> {grad.skills && grad.skills.length? 
                    <div>
                        <Typography style={{padding: '.2rem'}} align="left" variant="subheading">skills</Typography>
            
                        {grad.skills.map((skill)=>{

                            return (<Chip style={{fontSize: '.8rem', background: 'none', border: 'none'}} label={skill} />)

                        })}
    
                    </div> : null} 
                    
                </Paper>

                <Divider />
                
                <Paper  elevation={0} style={{ width: '98%', height: '40px', padding: '.2rem', margin: '.2rem', marginTop: '2rem'}} square> {grad.willingnessToRelocate? <div style={{display: 'flex', width: '100%'}}><Icon title="willing to relocate" style={{ fontSize: 30 }} >commute</Icon><Typography align="right" variant="caption">willing to relocate</Typography></div> : <div><Typography component="p"></Typography></div> }</Paper>
            
                
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
