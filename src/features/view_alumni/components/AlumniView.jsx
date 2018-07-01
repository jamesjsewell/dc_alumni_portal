
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../alumni"
import RaisedButton from 'material-ui/RaisedButton';

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

    return <div><RaisedButton>hello</RaisedButton></div>
  }
}

export default withRouter(AlumniView)