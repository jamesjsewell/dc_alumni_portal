
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import AlumniLayout from './AlumniLayout.js'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = {

}
class AlumniView extends Component {
  render () {
    return (
      <div>
        <Typography align='center' style={{marginTop: '1rem'}} variant='title'>Digital Crafts Alumni</Typography>
        <AlumniLayout {...this.props} />
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(AlumniView))
