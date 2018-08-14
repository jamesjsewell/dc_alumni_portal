import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import LoginForm from './LoginForm.js'
import ResetPasswordForm from './ResetPasswordForm.js'
import ForgotPasswordForm from './ForgotPasswordForm.js'

// material-ui
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Error_resetting = (props) => {
  return (<Grid item>
    <Card>
      <CardContent>
        <Typography color='error' component='p'>
                    Something went wrong resetting the password
        </Typography>
      </CardContent>
    </Card>
  </Grid>)
}

const Did_Reset = (props) => {
  return (<Grid item>
    <Card>
      <CardContent>
        <Typography color='primary' component='p'>
                    Your password has been reset
        </Typography>
      </CardContent>
    </Card>
  </Grid>)
}

export default class ResetPasswordLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {password_dialog_open: false}
  }

  openPasswordDialog () {
    this.setState({password_dialog_open: true})
  }

  closePasswordDialog () {
    this.setState({password_dialog_open: false})
  }

  render () {
    const {user, routes, error_resetting, did_reset, password_request, getForgotPasswordToken, resetPassword, match, history} = this.props
    return (
      <div>
        <Grid container spacing={24}>

          {did_reset === false && error_resetting === false ? <ResetPasswordForm match={match} resetPassword={resetPassword} history={history} routes={routes} /> : null}
          {error_resetting === true
            ? <Grid item>
              <Card>
                <CardContent>
                  <Error_resetting />

                </CardContent>
              </Card>
            </Grid> : null}

          {did_reset === true ? <Did_Reset user={user} routes={routes} /> : null}
        </Grid>
      </div>)
  }
}