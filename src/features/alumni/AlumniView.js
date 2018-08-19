
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { API_URL } from '../../global_vars.js'
import axios from 'axios'
import ProfileCard from './ProfileCard.js'
import Grid from '@material-ui/core/Grid'
import AlumniLayout from './AlumniLayout.js'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = {

}
class AlumniView extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { user } = this.props

    return (
      <div>
        <Typography align='center' style={{marginTop: '1rem'}} variant='title'>Digital Crafts Alumni</Typography>
        <AlumniLayout {...this.props} />
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(AlumniView))
