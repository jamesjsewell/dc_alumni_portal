import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'

import SocialMediaLinks from './SocialMediaLinks.jsx'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography"





class SeeMoreModal extends Component {
    
    
    render(){

        const { selectedGrad, modalOpen, closeModal } = this.props

        return(  selectedGrad && selectedGrad.email ? 
                <Dialog
                    fullScreen={false}
                    open={modalOpen ? true : false}
                    aria-labelledby="responsive-dialog-title"
                    
                >
                    <DialogContent style={{height: '95vh'}}>

                        <Grid container spacing={16}>

                            <Grid item xs={12} sm={12} md={6}>
                                <Paper style={{ minWidth: '100px', margin: 'auto', padding: '1rem'}}>
                                    <Typography variant="headline">{selectedGrad.fname + ' ' + selectedGrad.lname}</Typography>
                                    <Paper style={{ minWidth: '100px', maxWidth: '100px', margin: 'auto', padding: '1rem'}}>
                                        <img style={{maxWidth: '100px', margin: 'auto'}} src={selectedGrad.avatar} />
                                        <SocialMediaLinks />
                                    </Paper> 
                                </Paper>
                            </Grid>
                       

                            <Grid item xs={12} sm={12} md={6}>
                                <Paper>
                                    <Typography style={{padding: '.5rem'}} variant="subheading" >skills</Typography>
                                    { selectedGrad.skills.length? selectedGrad.skills.map((skill)=>{ return <Chip style={{margin: '.2rem'}} label={skill}></Chip> }) : null }
                                    
                                </Paper>
                            </Grid>
                      
                        </Grid>

                        {selectedGrad.bio? <DialogContentText style={{padding: '.5rem'}}>{selectedGrad.bio}</DialogContentText> : null}

                    </DialogContent>

                    
                
                    <DialogActions>
                        <Button onClick={()=>{closeModal()}} color="primary">
                            close
                        </Button> 
                    </DialogActions>

                </Dialog> : null )

    }


}

export default SeeMoreModal
