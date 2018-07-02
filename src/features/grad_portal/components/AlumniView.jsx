
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
 
    this.CRUD = this.props.actions.ajax_controller
    var Payload = this.props.alumni.AJAX_payload
    var thePayload = new Payload({operation: 'read', backbone_collection: this.props.alumni.collection})
    this.CRUD(thePayload)


  }

  componentWillReceiveProps(nextProps){
      console.log(nextProps)
  }

  render_grads(grads){

    var gradsArray = grads
    var renderedGrads = []

    for(var i = 0; i < gradsArray.length; i++){
      renderedGrads.push(gradsArray[i])
    }

    return renderedGrads

  }

  render() {


    const { alumni } = this.props
    
    return (
      <div>
        <Button>test</Button>

        {alumni.array.length? this.render_grads(alumni.array) : null}
      </div>
    )
  }
}

export default withRouter(AlumniView)