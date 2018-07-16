
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../profile.js"
import GradProfileLayout from "./ProfileLayout.jsx"
import Navbar from "../../navbar/Navbar.jsx"

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class GradProfileView extends Component {

  constructor(props) {
    
    super(props)

  }

  render() {
    
    return (
      <div>
        <Navbar/>
        <GradProfileLayout />
      </div>
    )
  }
}

export default withRouter(GradProfileView)