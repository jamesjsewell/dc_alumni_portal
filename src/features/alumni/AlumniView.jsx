
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "./alumni.js"
import Navbar from "../navbar/Navbar.jsx"

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class AlumniView extends Component {

  constructor(props) {
    
    super(props)

  }

  render() {
   
    const { user } = this.props
    
    return (
      <div>
        <Navbar/>
        alumni view
      </div>
    )
  }
}

export default withRouter(AlumniView)