
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../alumni"
import { ResetPasswordLayout } from "./ResetPasswordLayout.jsx"

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class ResetPasswordView extends Component {

  constructor(props) {
    
    super(props)

    this.props.actions.auto_log_in(this.props.actions.authenticate, this.props.alumni.grad)

  }

  render() {

    const { alumni } = this.props
    
    return (
      <div><ResetPasswordForm match={this.props.match} resetPassword={this.props.actions.resetPassword.bind(this)} /></div>
    )
  }
}

export default withRouter(ResetPasswordView)