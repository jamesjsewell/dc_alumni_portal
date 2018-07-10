
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../alumni"
import { GradCard } from './GradCard.jsx'
import { GradCollection } from "../backbone_models/Grad";

//material-ui
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class AlumniView extends Component {

  constructor(props) {
    
    super(props)
 
    this.CRUD = this.props.actions.ajax_controller
    this.CRUD({operation: 'read', backbone_collection: this.props.alumni.collection})


  }

  componentWillReceiveProps(nextProps){

  }

  render_grads(grads){

    var gradsArray = grads
    var renderedGradCards = []

    for(var i = 0; i < gradsArray.length; i++){

      var theGrad = gradsArray[i]
      
      if( theGrad && theGrad.attributes ){

        renderedGradCards.push(
          <Grid item xs>
            <Paper>
              <GradCard {...theGrad.attributes} />
            </Paper>
          </Grid>)

      }
  
    }

    return renderedGradCards

  }

  render() {


    const { alumni } = this.props
    
    return (
      <Grid container spacing={8}>
        {alumni.array && alumni.array.length? this.render_grads(alumni.array) : null}
      </Grid>
    )
  }
}

export default withRouter(AlumniView)