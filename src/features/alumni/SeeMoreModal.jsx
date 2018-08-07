import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import SocialMediaLinks from './SocialMediaLinks.jsx'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography"

import List from "@material-ui/core/ListItem"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";


const styles = {

    paper: {
        width: 'auto',
        height: '98vh',
        margin: '0px',
        maxWidth: 'none'
    },

    buttonLink: {
        minWidth: '3rem',
        margin: '.2rem',
        padding: '.2rem'
    },
    
    content: {
      
    }
}


class SeeMoreModal extends Component {
    
    
    render(){

        const { selectedGrad, modalOpen, closeModal, classes } = this.props

        var graduationDate = null

        if(selectedGrad && selectedGrad.DCgraduationDate){

            var year = selectedGrad.DCgraduationDate.split("-")[0]
            var month = selectedGrad.DCgraduationDate.split("-")[1]

            if(year && month){
                graduationDate = `${month} ${year}`
            }
            
        }

        return(  selectedGrad && selectedGrad.email ? 
                <Dialog
                    fullScreen={false}
                    open={modalOpen ? true : false}
                    aria-labelledby="responsive-dialog-title"
                    classes={{paper: classes.paper}}
                
                >
                <DialogTitle>{selectedGrad.fname + ' ' + selectedGrad.lname}</DialogTitle>
                    <DialogContent>

                        <Paper elevation={0} style={{display: 'flex', flexWrap: 'wrap'}}>
                            
                            <Paper elevation={0} style={{ minWidth: '160px', maxWidth: '400px', display: 'block', margin: 'auto', padding: '.5rem'}}>
                                <Paper elevation={0} style={{margin: 'auto', width:'140px', padding: '.5rem'}}>   
                                    <img style={{width: '140px', height: 'auto'}} src={selectedGrad.avatar} />
                                    <SocialMediaLinks />

                                </Paper>
                                
                            
                                {selectedGrad.bio? 
                                    <Paper elevation={0} style={{margin: '.1rem'}} >
                                        <Paper elevation={0} style={{maxWidth: '100%', padding: '.1rem', display: 'flex', flexWrap: 'wrap' , justifyContent: 'center'}}>
                                            <Button classes={{root: classes.buttonLink}} style={{fontSize: '.5rem'}} variant="outlined" href="http://www.jamesjsewell.com">website</Button>
                                            <Button classes={{root: classes.buttonLink}} style={{fontSize: '.5rem'}} variant="outlined" href="http://www.jamesjsewell.com">portfolio</Button>
                                            <Button classes={{root: classes.buttonLink}} style={{fontSize: '.5rem'}} variant="outlined" href="http://www.jamesjsewell.com">resume</Button>  
                                    
                                        </Paper> 
                                        
                                        <DialogContentText style={{padding: '.2rem'}}>{selectedGrad.bio}</DialogContentText>
                                
                                    </Paper> : null}
                                
                                
                            </Paper> 
                             
                            
                            <Paper elevation={0} style={{padding: '.5rem', marginLeft: '.5rem'}}>
                            

                                <Paper elevation={0} style={{width: '90%', margin: '.5rem', padding: '.5rem'}}>
                                    <Typography style={{padding: '.2rem'}} variant="subheading" >skills</Typography>
                                    { selectedGrad.skills.length? selectedGrad.skills.map((skill)=>{ return <Chip style={{ border: `none`}} label={skill}></Chip> }) : null }
                                </Paper>

                                    <Divider />

                                <Paper elevation={0} style={{width: '100%', margin: '.5rem', padding: '.5rem'}}> 
                                    <List style={{display: 'block'}}>
                                        <Typography variant='subheading'>Digital Crafts</Typography>
                                        {graduationDate? <ListItem><ListItemText primary={graduationDate} secondary="Graduated"/></ListItem> : null}
                                        {selectedGrad.DCprogramType? <ListItem><ListItemText primary={selectedGrad.DCprogramType} secondary="Course"/></ListItem>  : null}
                                    </List>
                                </Paper>

                                <Divider />

                                {selectedGrad.willingnessToRelocate? <Paper elevation={0} style={{marginTop: '1rem'}} square><Icon title="willing to relocate" style={{ fontSize: 30 }} >commute</Icon><Typography variant="caption">willing to relocate</Typography></Paper>: null}
                                
                            </Paper>

                        </Paper>
                        

                    </DialogContent>
                
                    <DialogActions>
                        <Button onClick={()=>{closeModal()}} color="primary">
                            close
                        </Button> 
                    </DialogActions>

                </Dialog> : null )

    }

}

export default withStyles(styles)(SeeMoreModal)
