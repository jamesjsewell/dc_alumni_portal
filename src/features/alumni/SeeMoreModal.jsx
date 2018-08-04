import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import SocialMediaLinks from './SocialMediaLinks.jsx'


class SeeMoreModal extends Component {
    
    
    render(){

        const { selectedGrad, modalOpen, closeModal } = this.props

        return(  selectedGrad && selectedGrad.email ? 
                <Dialog
                    fullScreen={true}
                    open={modalOpen ? true : false}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>

                        <SocialMediaLinks />

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
