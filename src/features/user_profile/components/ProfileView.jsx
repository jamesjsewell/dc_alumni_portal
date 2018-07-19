
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../profile.js"
import ProfileLayout from "./ProfileLayout.jsx"
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
    const { user } = this.props
    return (
      <div>
        <Navbar/>
        <ProfileLayout user={user} updateUser={this.props.actions.updateUser.bind(this)} />
      </div> 
    )
  }
}

export default withRouter(GradProfileView)