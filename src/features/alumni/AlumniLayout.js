import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import Cookies from 'universal-cookie'
import _ from 'underscore'
import { API_URL } from '../../global_vars.js'
import axios from 'axios'
import ProfileCard from './ProfileCard.js'
import SeeMoreModal from './SeeMoreModal.js'
import FilterGrads from './FilterGrads.js'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TextField from '@material-ui/core/TextField'

const cookies = new Cookies()

class AlumniLayout extends Component {
  constructor (props) {
    super(props)
    this.state = { alumniArray: [], filteredAlumniArray: null, searchResult: null, queryString: null, filterEnabled: false, modalOpen: false, selectedGrad: {} }
    this.getAlumniArray()

    var selected_grad_id = cookies.get('selected_grad')

    if (selected_grad_id && selected_grad_id.length) {
      axios
        .get(`${API_URL}/users/${selected_grad_id}`)
        .then(response => {
          if (response && response.data) {
            this.setState({selectedGrad: response.data[0], modalOpen: true})
          } else {
            this.setState({modalOpen: false})
          }
        })
        .catch(error => {
          this.setState({modalOpen: false})
        })
    }
  }

  openModal (grad) {
    cookies.set('selected_grad', grad._id, { path: '/' })

    this.setState({modalOpen: true, selectedGrad: grad })
  }

  closeModal () {
    cookies.remove('selected_grad', { path: '/' })

    this.setState({modalOpen: false, selectedGrad: {}})
  }

  handleSearch (event) {
    var query = event.target.value
    query = query.toLowerCase()

    var splitQuery = event.target.value.split(' ')

    var firstName = null
    var lastName = null

    if (splitQuery.length > 1) {
      firstName = splitQuery[0]
      lastName = splitQuery[1]
      firstName = firstName.toLowerCase()
      lastName = lastName.toLowerCase()
    }

    var result = []

    var found = _.find(this.state.alumniArray, (grad) => {
      if (firstName && grad.fname && firstName.includes(grad.fname)) {
        result.push(grad)
        return grad
      }

      if (lastName && grad.lname && lastName.includes(grad.lname)) {
        result.push(grad)
        return grad
      }

      if (!firstName && !lastName) {
        if (query.includes(grad.fname) || query.includes(grad.lname)) {
          result.push(grad)
          return grad
        }
      }
    })

    if (found) {
      this.setState({searchResult: result})
    } else {
      this.setState({searchResult: null})
    }

    this.setState({queryString: query})
  }

  filterArray (relocate, skillsArray) {
    var filtered = []

    this.state.alumniArray.map((grad) => {
      if (relocate === grad.willingnessToRelocate) {
        if (skillsArray && skillsArray.length) {
          let found = grad.skills.some(skill => skillsArray.indexOf(skill) >= 0)

          if (found) {
            return filtered.push(grad)
          } else {
            return
          }
        }

        return filtered.push(grad)
      }
    })

    this.setState({filteredAlumniArray: filtered})
  }

  getAlumniArray () {
    this.props.actions.setAsync(true)

    axios
      .get(`${API_URL}/users`)
      .then(response => {
        if (response.data) {
          this.setState({ alumniArray: response.data })
        }
        this.props.actions.setAysnc(false)
      })
      .catch(error => { this.props.actions.setAsync(false) })
  }

  generateProfileCards (alumniArray) {
    var rendered = []

    for (var i = 0; i < alumniArray.length; i++) {
      var grad = alumniArray[i]
      rendered.push(<ProfileCard grad={grad} openModal={this.openModal.bind(this)} />)
    }

    return rendered
  }

  render () {
    const { selectedGrad, alumniArray, filteredAlumniArray, searchResult } = this.state

    return (

      <div style={{marginTop: '2rem'}}>

        <ExpansionPanel style={{margin: 'auto', maxWidth: '600px'}}>

          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon id='filter_panel' />}>

            <Typography> Search </Typography>

          </ExpansionPanelSummary>

          <ExpansionPanelDetails style={{display: 'block'}}>

            {searchResult
              ? <div><Paper elevation={0}>

                <Button

                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({searchResult: null, queryString: null})
                  }}
                  variant='outlined'
                  size='small'>

                  <Typography variant='caption'> clear search  </Typography>

                </Button>

              </Paper>

                <Divider style={{margin: '.5rem'}} />

              </div> : null }

            <TextField value={this.state.queryString ? this.state.queryString : ''} onChange={(event) => { this.handleSearch(event) }} label='name' style={{margin: '.5rem'}} placeholder='name' />

          </ExpansionPanelDetails>

        </ExpansionPanel>

        <ExpansionPanel style={{margin: 'auto', marginBottom: '2rem', maxWidth: '600px'}}>

          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon id='filter_panel' />}>
            <Typography> Filter </Typography>

          </ExpansionPanelSummary>

          <ExpansionPanelDetails style={{display: 'block'}}>

            {filteredAlumniArray
              ? <div><Paper elevation={0}>

                <Button

                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({filteredAlumniArray: null})
                  }}
                  variant='outlined'
                  size='small'>

                  <Typography variant='caption'> clear filter  </Typography>

                </Button>

              </Paper>

              <Divider style={{margin: '.5rem'}} />

              </div> : null }

            <Paper style={{width: '300px', padding: '.5rem'}}><FilterGrads filterEnabled={!!this.state.filteredAlumniArray} filterArray={this.filterArray.bind(this)} grads={this.state.alumniArray} /></Paper>

          </ExpansionPanelDetails>

        </ExpansionPanel>

        <Grid justify='center' alignItems='stretch' alignContent='stretch' container spacing={16}>

          {alumniArray.length && !searchResult ? this.generateProfileCards(!filteredAlumniArray ? alumniArray : filteredAlumniArray) : null}

          {searchResult ? this.generateProfileCards(searchResult) : null}

        </Grid>
        <SeeMoreModal selectedGrad={selectedGrad} modalOpen={this.state.modalOpen} closeModal={this.closeModal.bind(this)} />
      </div>
    )
  }
}

export default withRouter(AlumniLayout)
