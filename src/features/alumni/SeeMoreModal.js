import React, { Component } from 'react'
import accountBoxIcon from '../../images/account_box.svg'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import SocialMediaLinks from './SocialMediaLinks.js'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const styles = {

  paper: {
    width: 'auto',
    height: '98vh',
    margin: '0px',
    maxWidth: 'none'
  },

  buttonLink: {
    minWidth: '3rem',
    margin: '.2rem',
    padding: '.2rem'
  },

  content: {

  }
}

class SeeMoreModal extends Component {
  render () {
    const { selectedGrad, modalOpen, closeModal, classes } = this.props

    var graduationDate = null

    if (selectedGrad && selectedGrad.DCgraduationDate) {
      var year = selectedGrad.DCgraduationDate.split('-')[0]
      var month = selectedGrad.DCgraduationDate.split('-')[1]

      if (year && month) {
        graduationDate = `${month} ${year}`
      }
    }

    return (selectedGrad && selectedGrad.email
      ? <Dialog

        open={!!modalOpen}
        aria-labelledby='responsive-dialog-title'
        // classes={{paper: classes.paper}}
        fullWidth
        maxWidth={false}
        keepMounted
        onClose={closeModal}

      >
        <DialogTitle >
          {selectedGrad.fname + ' ' + selectedGrad.lname}

          { selectedGrad.city && selectedGrad.state ? <Typography align='left' variant='caption'>{selectedGrad.city + ', ' + selectedGrad.state}</Typography> : null }
        </DialogTitle>
        <DialogContent>
          {/* <Typography style={{textAlign: 'right'}} align='right' variant='caption'>scroll down to see more if needed</Typography> */}
          <Paper elevation={0} style={{display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center'}}>

            <Paper elevation={0} style={{minWidth: '160px', maxWidth: '400px', display: 'block', padding: '.5rem'}}>
              <Paper elevation={0} style={{margin: 'auto', width: '150px', padding: '.5rem'}}>
                <img style={{width: selectedGrad.avatar ? '140px' : '64px', height: 'auto'}} src={selectedGrad.avatar ? selectedGrad.avatar : accountBoxIcon} />
                <SocialMediaLinks github={selectedGrad.github ? selectedGrad.github : null} linkedin={selectedGrad.linkedin ? selectedGrad.linkedin : null} stackOverflow={selectedGrad.stackOverflow ? selectedGrad.stackOverflow : null} medium={selectedGrad.mediumBlog ? selectedGrad.mediumBlog : null} />

              </Paper>

              { selectedGrad.website || selectedGrad.portfolio || selectedGrad.resume || selectedGrad.publicEmail
                ? <Paper style={{margin: '.1rem'}} >
                  <Paper elevation={0} style={{maxWidth: '100%', padding: '.1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    { selectedGrad.website ? <Button classes={{root: classes.buttonLink}} style={{fontSize: '.5rem'}} variant='outlined' href={selectedGrad.website}>website</Button> : null}
                    { selectedGrad.portfolio ? <Button classes={{root: classes.buttonLink}} style={{fontSize: '.5rem'}} variant='outlined' href={selectedGrad.portfolio} >portfolio</Button> : null}
                    { selectedGrad.resume ? <Button classes={{root: classes.buttonLink}} style={{fontSize: '.5rem'}} variant='outlined' href={selectedGrad.resume} >resume</Button> : null}
                    { selectedGrad.publicEmail ? <Button classes={{root: classes.buttonLink}} style={{fontSize: '.5rem'}} variant='outlined' href={`mailto:${selectedGrad.publicEmail}`}><Icon>email</Icon></Button> : null}

                  </Paper>

                </Paper> : null}

            </Paper>

            <Paper elevation={0} style={{padding: '.5rem', marginLeft: '.5rem'}}>

              {selectedGrad.bio ? <DialogContentText style={{maxWidth: '200px', padding: '.2rem'}}>{selectedGrad.bio}</DialogContentText> : null}

              { selectedGrad.skills && selectedGrad.skills.length
                ? <Paper style={{width: '90%', padding: '.5rem', margin: 'auto', marginBottom: '.5rem'}}>
                  <Typography style={{padding: '.2rem'}} variant='subheading' >skills</Typography>
                  <Typography variant='caption'>top 3</Typography>
                  {selectedGrad.skills.map((skill) => { return <Chip style={{ border: `none` }} label={skill} /> }) }
                </Paper> : null }

              <Divider />

              {selectedGrad.DCprogramType || graduationDate ? <Paper style={{width: '90%', margin: 'auto', marginTop: '.5rem', marginBottom: '.5rem', padding: '.5rem'}}>
                <List style={{display: 'block'}}>
                  <Typography variant='subheading'>Digital Crafts</Typography>
                  {graduationDate ? <ListItem><ListItemText primary={graduationDate} secondary='Graduated' /></ListItem> : null}
                  <Divider />
                  {selectedGrad.DCprogramType ? <ListItem><ListItemText primary={selectedGrad.DCprogramType} secondary='Course' /></ListItem> : null}
                </List>
              </Paper> : null}

              <Divider />

              {selectedGrad.willingnessToRelocate ? <Paper elevation={0} style={{marginTop: '1rem'}} square><Icon title='willing to relocate' style={{ fontSize: 30 }} >commute</Icon><Typography variant='caption'>willing to relocate</Typography></Paper> : null}

            </Paper>

          </Paper>

        </DialogContent>

        <DialogActions>

          <Button variant='outlined' onClick={(event) => {
            event.preventDefault()
            closeModal()
          }
          } color='primary' autoFocus>
                          close
          </Button>

        </DialogActions>

      </Dialog> : null)
  }
}

export default withStyles(styles)(SeeMoreModal)
