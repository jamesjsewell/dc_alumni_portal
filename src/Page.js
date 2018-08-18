import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import * as controller from './user.js'
import dc_logo from './images/digitalcrafts-site-logo.png'
import AuthView from './features/user_auth/components/AuthView.js'
import ResetPasswordView from './features/user_auth/components/ResetPasswordView.js'
import ProfileView from './features/user_profile/components/ProfileView.js'
import AlumniView from './features/alumni/AlumniView.js'
import Navbar from './features/navbar/Navbar.js'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'

import CircularProgress from '@material-ui/core/CircularProgress'

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class Page extends Component {
  constructor (props) {
    super(props)

    this.props.actions.auto_log_in(this.props.actions.authenticate, this.props.user)
  }

  componentWillReceiveProps (nextProps) {

  }

  showPage () {
    const { currentRoute } = this.props
    const { EMPLOYER_LOGIN, GRAD_LOGIN, GRAD_PROFILE, EMPLOYER_PROFILE } = this.props.routes

    switch (currentRoute) {
      case GRAD_LOGIN:

        return <AuthView {...this.props} />

        break

      case EMPLOYER_LOGIN:

        return <AuthView {...this.props} />

        break

      case GRAD_PROFILE:

        return <ProfileView {...this.props} />

        break

      case EMPLOYER_PROFILE:

        return <ProfileView {...this.props} />

        break

      case '/alumni':

        return <AlumniView {...this.props} />

        break

      case 'reset_password':

        return <ResetPasswordView {...this.props} />

        break
    }
  }

  render () {
    const { user, util } = this.props

    return (<div>

      <Paper square style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img style={{maxHeight: '50px', width: 'auto', padding: '.5rem', margin: '.5rem', borderRadius: '.2rem' }} src={dc_logo} /><Typography variant="display1">Alumni Portal</Typography></Paper>

      {util.asyncActive ? <div style={{backgroundColor: 'rgba(0,0,0,.2)', position: 'fixed', width: '100vw', height: '100vh', zIndex: '500' }}><div style={{ padding: '.5rem', borderRadius: '.5rem', backgroundColor: 'rgba(255,255,255,.8)', position: 'absolute', width: 'auto', height: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><CircularProgress thickness={7} /></div></div> : null}

      <Navbar {...this.props} />

      {this.showPage()}

    </div>)
  }
}

export default withRouter(Page)
