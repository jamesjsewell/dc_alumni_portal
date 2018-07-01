
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../alumni"
import Button from '@material-ui/core/Button';

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

    return (
      <div>
        <Button>fuck</Button>
      </div>
    )
  }
}

export default withRouter(AlumniView)