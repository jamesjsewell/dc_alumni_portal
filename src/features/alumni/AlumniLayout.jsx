import React, { Component } from "react"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "./alumni.js"
import { API_URL } from "../../global_vars.js"
import axios from "axios"
import ProfileCard from "./ProfileCard.jsx"
import SeeMoreModal from "./SeeMoreModal.jsx"

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'


// fname 
// lname 
// city
// state
// bio

// resume

// website
// github

// linkedin
// stackOverflow
// mediumBlog
// portfolio
// publicEmail 

// skills

// willingnessToRelocate 
// DCgraduationDate
// DCprogramType


class AlumniLayout extends Component {

    constructor(props) {

        super(props)
        this.state = { alumniArray: [], modalOpen: false, selectedGrad: {} }
        this.getAlumniArray()

    }

    openModal(grad){
    
        this.setState({modalOpen: true, selectedGrad: grad })

    }

    closeModal(){

        this.setState({modalOpen: false, selectedGrad: {}})

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

            <Grid style={{marginTop: '2rem'}} justify="center" alignItems="stretch" alignContent="stretch"  container spacing={16}>

                {this.state.alumniArray.length? this.generateProfileCards(this.state.alumniArray) : null}

                <SeeMoreModal selectedGrad={selectedGrad} modalOpen={this.state.modalOpen} closeModal={this.closeModal.bind(this)} />


            </Grid>
        )
    }
}

export default withRouter(AlumniLayout)