import React, { Component } from 'react'

import GradProfileForm from './GradProfileForm.js'
import UppyDashboardComponent from './FileUploader.js'
import EmployerProfileForm from './EmployerProfileForm.js'
import ForgotPasswordForm from '../../user_auth/components/ForgotPasswordForm.js'

// material-ui
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import DeleteAccountForm from './DeleteAccountForm.js'

export default class ProfileLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {password_dialog_open: false, delete_account_open: false}
  }

  openPasswordDialog () {
    this.setState({password_dialog_open: true})
  }

  closePasswordDialog () {
    this.setState({password_dialog_open: false})
  }

  openDeleteAccount () {
    this.setState({delete_account_open: true})
  }

  closeDeleteAccount () {
    this.setState({delete_account_open: false})
  }

  removeAccount (email) {
    if (email && this.props.user.email) {
      if (email.toLowerCase === this.props.user.email.toLowerCase) {
        this.props.deleteUser(this.props.user._id)
      }
    }
  }

  removeFile (type) {
    var userId = this.props.user._id

    if (type === 'avatar') {
      this.props.updateUser(userId, {avatar: null})
    }

    if (type === 'resume') {
      this.props.updateUser(userId, {resume: null})
    }
  }

  render () {
    const { user, userState, updateUser, getForgotPasswordToken, error_deleting_user} = this.props
    const { password_request } = this.props.userState
    return (

      <Paper elevation={0} style={{marginTop: '2rem', margin: 'auto', display: 'block'}}>

        { user.account_type === 'grad'
          ? <Paper elevation={0} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '600px', margin: 'auto'}}>

            <Paper style={{maxWidth: '200px', margin: '.5rem', padding: '.5rem'}} >
              <Typography variant='caption'>Profile Image</Typography>
              {user.avatar ? <Avatar
                style={{marginTop: '.5rem'}}
                sizes='large'
                src={user.avatar}
              /> : null}

              {!user.avatar ? <UppyDashboardComponent style={{margin: '.2rem', padding: '.2rem'}} user={user} updateUser={updateUser} avatar /> : null}

              {!user.avatar ? <IconButton style={{margin: '.5rem', padding: '.5rem'}} size='large' className='uppy_opener_avatar' arial_label='Upload'><Icon>camera_alt</Icon></IconButton> : null}
              {user.avatar ? <IconButton style={{margin: '.5rem', padding: '.5rem'}} onClick={(event) => { this.removeFile('avatar') }} size='large' arial_label='remove'><Icon>delete_forever</Icon></IconButton> : null}
              <Divider />

              <Typography variant='caption'>changes to profile image auto save and can't be undone</Typography>
            </Paper>

            <Paper style={{maxWidth: '200px', margin: '.5rem', padding: '.5rem'}}>
              <Typography variant='caption'>Resume</Typography>
              {user.resume ? <Button size='small' style={{margin: '.5rem', padding: '.5rem'}} href={user.resume} variant='outlined'>view</Button> : null}
              {!user.resume ? <UppyDashboardComponent user={user} updateUser={updateUser} resume /> : null}

              {!user.resume ? <IconButton style={{margin: '.5rem', padding: '.5rem'}} size='large' className='uppy_opener_resume' arial_label='Upload'><Icon>description</Icon></IconButton> : null}
              {user.resume ? <IconButton style={{margin: '.5rem', padding: '.5rem'}} onClick={(event) => { this.removeFile('resume') }} size='large' arial_label='remove'><Icon>delete_forever</Icon></IconButton> : null}
              <Divider />

              <Typography variant='caption'>changes to resume auto save and can't be undone</Typography>
            </Paper>

          </Paper> : null }

        <Card elevation={0} style={{margin: 'auto', width: 'auto', maxWidth: '800px'}}>
          <CardContent>

            <Divider />
            {user && user.account_type === 'grad' ? <GradProfileForm updateUser={updateUser} user={user} /> : null}
            {user && user.account_type === 'employer' ? <EmployerProfileForm updateUser={updateUser} user={user} /> : null}

            {userState.error_updating_user ? <Typography style={{padding: '.5rem', maring: '.5rem'}} color='error'>error updating user</Typography> : null}
            <Divider />

            <Button style={{margin: '.5rem'}} variant='outlined' size='small' onClick={() => { this.openPasswordDialog() }}>reset password</Button>
            <Button style={{margin: '.5rem'}} size='small' onClick={() => { this.openDeleteAccount() }}> <Icon>delete</Icon> delete account</Button>
          </CardContent>
        </Card>

        <Dialog
          fullScreen={false}
          open={!!this.state.password_dialog_open}
          // onClose={this.handleClose}
          aria-labelledby='responsive-dialog-title'
          fullWidth
          maxWidth={false}
        >
          <DialogTitle id='responsive-dialog-title'>{password_request === 'sent' ? 'Success!' : 'Password Change '}</DialogTitle>

          <DialogContent>

            <DialogContentText>
              { !password_request || password_request === null || password_request === 'failed' ? 'enter the email associated with this account' : null }
              { password_request === 'sending' ? '...sending request' : null }
              { password_request === 'sent' ? 'an email was sent to the address you provided, open the email to continue. Follow the link in the most recent email from us. If you do not receive the email soon, try again.' : null }
            </DialogContentText>

            <ForgotPasswordForm password_request={password_request} getForgotPasswordToken={getForgotPasswordToken} />

          </DialogContent>
          <DialogActions>
            { password_request != 'sending' ? <Button onClick={() => { this.closePasswordDialog() }} color='primary'>
                            close
            </Button> : null }
          </DialogActions>
        </Dialog>

        <Dialog
          fullScreen={false}
          open={!!this.state.delete_account_open}
          // onClose={this.handleClose}
          aria-labelledby='responsive-dialog-title'
          fullWidth
          maxWidth={false}
        >
          <DialogTitle id='responsive-dialog-title'>remove account</DialogTitle>

          <DialogContent>
            <DialogContentText>enter the email you used to sign in to permanently remove this account</DialogContentText>

            <DialogContentText>
              <DeleteAccountForm removeAccount={this.removeAccount.bind(this)} error_deleting_user={error_deleting_user} user={this.props.user} />
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => { this.closeDeleteAccount() }} color='primary'>
                            close
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    )
  }
}
