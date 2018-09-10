import React, { Component } from 'react'
import { withRouter } from 'react-router'
import ProfileLayout from './ProfileLayout.js'
import Typography from '@material-ui/core/Typography'

class ProfileView extends Component {
  componentWillReceiveProps (nextProps) {

  }

  render () {
    const { user, account_type, history, routes, userState, error_deleting_user } = this.props

    if (user) {
      if (!user.email) {
        if (account_type === 'grad') {
          history.replace(routes.GRAD_LOGIN)
        }

        if (account_type === 'employer') {
          history.replace(routes.EMPLOYER_LOGIN)
        }
      }
    }

    return (

      <div>
        <Typography style={{marginTop: '1rem'}} align='center' variant='title'> Account </Typography>
        <ProfileLayout user={user} updateUser={this.props.actions.updateUser.bind(this)} userState={userState} getForgotPasswordToken={this.props.actions.getForgotPasswordToken.bind(this)} deleteUser={this.props.actions.deleteUser.bind(this)} error_deleting_user={this.props.userState.error_deleting_user} />
      </div>

    )
  }
}

export default withRouter(ProfileView)
