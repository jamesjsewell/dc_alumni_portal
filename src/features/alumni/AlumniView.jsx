
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "./alumni.js"
import { API_URL } from "../../global_vars.js"
import axios from "axios"
import ProfileCard from "./ProfileCard.jsx"
import Grid from '@material-ui/core/Grid'



// @connect(
//   state => controller.selector(state),
//   dispatch => ({
//     actions: bindActionCreators(controller, dispatch)
//   })
// )

class AlumniView extends Component {

  constructor(props) {
    
    super(props)
    this.state = { alumniArray: [] }
    this.getAlumniArray()

  }

  getAlumniArray(){
    
    axios
			.get(`${API_URL}/users`)
			.then(response => {
        
				if (response.data) {
          console.log(response.data)
					this.setState({ alumniArray: response.data })
					
				}
			})
			.catch(error => { return })
  }

  generateProfileCards(alumniArray) {

    var rendered = []
    for(var i = 0; i < alumniArray.length; i++ ){
      var grad = alumniArray[i]
      rendered.push(<ProfileCard grad={grad} />)
    }
    return rendered

  }

  render() {
   
    const { user } = this.props
    
    return (
      <Grid justify="center" alignItems="stretch" container spacing={16}>
        {this.state.alumniArray.length? this.generateProfileCards(this.state.alumniArray) : null}
      </Grid>
    )
  }
}

export default withRouter(AlumniView)