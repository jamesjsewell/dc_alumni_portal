import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import githubIcon from '../../images/github.svg'
import linkedinIcon from '../../images/linkedin.svg'
import stackOverflowIcon from '../../images/stack_overflow.svg'
import mediumIcon from '../../images/medium_com.svg'

import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'

const styles = {

  root: {
    margin: 'auto',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    padding: '.2rem'
  },

  avatar: {
    width: '2rem',
    height: '2rem'
  }

}

class SocialMediaLinks extends Component {
  render () {
    const { classes, github, linkedin, stackOverflow, medium } = this.props
    return (

      <Paper style={{margin: 'auto'}} elevation={0} className={classes.root} component='div'>

        { github ? <Avatar className={classes.avatar} component='a' href={github} src={githubIcon} /> : null}

        { linkedin ? <Avatar className={classes.avatar} component='a' href={linkedin} src={linkedinIcon} /> : null}

        { stackOverflow ? <Avatar className={classes.avatar} component='a' href={stackOverflow} src={stackOverflowIcon} /> : null}

        { medium ? <Avatar className={classes.avatar} component='a' href={medium} src={mediumIcon} /> : null}

      </Paper>

    )
  }
}

export default withStyles(styles)(SocialMediaLinks)
