import React, { Component } from "react"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "./alumni.js"
import { API_URL } from "../../global_vars.js"
import axios from "axios"
import ProfileCard from "./ProfileCard.jsx"

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';


class AlumniLayout extends Component {

    constructor(props) {

        super(props)
        this.state = { alumniArray: [], modal_open: false, selectedGrad: {} }
        this.getAlumniArray()

    }

    openModal(grad){
    
        this.setState({modal_open: true, selectedGrad: grad })

    }

    closeModal(){

        this.setState({modal_open: false, selectedGrad: {}})

    }

    getAlumniArray(){
        
        axios
            .get(`${API_URL}/users`)
            .then(response => {
        
                if (response.data) {
                   
                    this.setState({ alumniArray: response.data })
                    
                }
            })
            .catch(error => { return })
    }

    generateProfileCards(alumniArray) {


        var rendered = []

        for(var i = 0; i < alumniArray.length; i++ ){

            var grad = alumniArray[i]
            rendered.push(<ProfileCard grad={grad} openModal={this.openModal.bind(this)} />)

        }

        return rendered

    }

    render() {
    
        const { selectedGrad } = this.state
        
        return (

            <Grid justify="center" alignItems="stretch" container spacing={16}>

                {this.state.alumniArray.length? this.generateProfileCards(this.state.alumniArray) : null}

                { selectedGrad && selectedGrad.email ? <Dialog
                    fullScreen={false}
                    open={this.state.modal_open ? true : false}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{selectedGrad.fname} {' ' + selectedGrad.lname}</DialogTitle>

                    <DialogContent>
                    
                        <DialogContentText>
                            
                        </DialogContentText>    
                    
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={()=>{this.closeModal()}} color="primary">
                            close
                        </Button> 
                    </DialogActions>

                </Dialog> : null}

            </Grid>
        )
    }
}

export default withRouter(AlumniLayout)