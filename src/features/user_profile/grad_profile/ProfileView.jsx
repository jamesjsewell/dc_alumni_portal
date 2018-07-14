
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../profile.js"
import GradProfileLayout from "./ProfileLayout.jsx"

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class GradProfileView extends Component {

  constructor(props) {
    
    super(props)

    this.props.actions.auto_log_in(this.props.actions.authenticate, this.props.users.user)

  }

  render() {

    const { users } = this.props
    
    return (
      <div>
        <GradProfileLayout />
      </div>
    )
  }
}

export default withRouter(GradProfileView)