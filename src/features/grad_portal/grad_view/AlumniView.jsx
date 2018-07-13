
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../alumni"
import { UserCard } from './UserCard.jsx'
import { UserCollection } from "../backbone_models/User";

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

  render_users(users){

    var usersArray = users
    var renderedUserCards = []

    for(var i = 0; i < usersArray.length; i++){

      var theUser = usersArray[i]
      
      if( theUser && theUser.attributes ){

        renderedUserCards.push(
          <Grid item xs>
            <Paper>
              <UserCard {...theUser.attributes} />
            </Paper>
          </Grid>)

      }
  
    }

    return renderedUserCards

  }

  render() {


    const { alumni } = this.props
    
    return (
      <Grid container spacing={8}>
        {alumni.array && alumni.array.length? this.render_users(alumni.array) : null}
      </Grid>
    )
  }
}

export default withRouter(AlumniView)