
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../alumni"
import { AuthLayout } from "./AuthLayout.jsx"

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class AuthView extends Component {

  constructor(props) {
    
    super(props)

  }

  componentWillReceiveProps(nextProps){

  }

  render() {

    const { alumni } = this.props
    
    return (
      <div><AuthLayout register={this.props.actions.register.bind(this)}
      login={this.props.actions.login.bind(this)} /></div>
    )
  }
}

export default withRouter(AuthView)