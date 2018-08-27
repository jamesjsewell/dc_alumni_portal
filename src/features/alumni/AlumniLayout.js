import React, { Component } from 'react'
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
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
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

    var gradId = cookies.get('selected_grad')

    if (gradId && gradId.length) {
      axios
        .get(`${API_URL}/users/${gradId}`)
        .then(response => {
          if (response && response.data) {
            this.setState({selectedGrad: response.data[0], modalOpen: true})
          } else {
            this.setState({modalOpen: false})
          }
        })
        .catch(response => {
          this.setState({modalOpen: false})
        })
    }
  }

  openModal (grad) {
    cookies.set('selected_grad', grad._id, { path: '/' })

    this.setState({ modalOpen: true, selectedGrad: grad })
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
      if (firstName && grad.fname && firstName.includes(grad.fname.toLowerCase())) {
        result.push(grad)
        return grad
      }

      if (lastName && grad.lname && lastName.includes(grad.lname.toLowerCase())) {
        result.push(grad)
        return grad
      }

      if (!firstName && !lastName) {
        if (query.includes(grad.fname.toLowerCase()) || query.includes(grad.lname.toLowerCase())) {
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
      .post(`${API_URL}/users/filter`, {account_type: 'grad'})
      .then(response => {
        if (response.data) {
          this.setState({ alumniArray: response.data })
        }
        this.props.actions.setAysnc(false)
      })
      .catch(response => { this.props.actions.setAsync(false) })
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
