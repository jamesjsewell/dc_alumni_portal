
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
import AlumniLayout from './AlumniLayout.jsx'

class AlumniView extends Component {

  constructor(props) {
    
    super(props)

  }

  render() {
   
    const { user } = this.props
    
    return (
      <AlumniLayout {...this.props} />
    )
  }
}

export default withRouter(AlumniView)