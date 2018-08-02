import React, { Component } from "react"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "./alumni.js"
import { API_URL } from "../../global_vars.js"
import axios from "axios"
import ProfileCard from "./ProfileCard.jsx"

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
import List from "@material-ui/core/ListItem"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"

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
                    fullScreen={true}
                    open={this.state.modal_open ? true : false}
                    aria-labelledby="responsive-dialog-title"
                >
                    

                        <Grid justify="center">

                            
                            <Card>

                                <CardMedia style={{maxWidth: '100px'}} component="img" image={selectedGrad.avatar} />

                                <CardContent>
                                    
                                </CardContent>

                            </Card>

                            <Grid item xs>
                                <List component="ul">
                                    <ListItem button component="a" href="https://www.google.com">
                                        <ListItemText  primary="Github" />
                                    </ListItem>

                                    <ListItem button component="a" href="https://www.google.com">
                                        <ListItemText primary="Linkedin" />
                                    </ListItem>

                                    <ListItem button component="a" href="https://www.google.com">
                                        <ListItemText primary="Stack Overflow" />
                                    </ListItem>
                                </List>
                            </Grid>

                        </Grid>
                    

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