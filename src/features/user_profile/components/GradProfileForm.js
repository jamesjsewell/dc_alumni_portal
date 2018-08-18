import _ from 'underscore'
import React, { Component } from 'react'
import { Form, Field, reduxForm, change, reset } from 'redux-form'
import { FormField, TextArea, RadioSelect, DatePicker} from '../../forms/FormFields.js'
import * as check from '../../forms/formValidation.js'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import CardHeader from '@material-ui/core/CardHeader'

const skills = [

  'html',
  'css',
  'javascript',
  'python'

]

const fieldStyle = {
  paddingLeft: '.5rem',
  marginRight: '.5rem'
}

const SkillsSelect = ({selectedSkills, handleSkills}) => (
  <FormControl>
    <Typography>Select top 3 Skills</Typography>
    <Select

      multiple
      value={selectedSkills}
      onChange={handleSkills}
      input={<Input name='skills' id='select-multiple-chip' />}
      renderValue={selected => (
        <div >
          {selected.map(value => <Chip key={value} label={value} />)}
        </div>
      )}

    >
      {skills.map(skill => (
        <MenuItem
          key={skill}
          value={skill}
        >
          {skill}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

var fieldValues = {}
const afterSubmit = (result, dispatch, props) => {
  props.reset()
  props.untouch([])
}

class GradProfileForm extends Component {
  constructor (props) {
    super(props)
    this.state = {expanded: 'panel1', password_dialog_open: false, selectedSkills: this.props.user.skills, programType: this.props.user.DCprogramType}
    var userValues = _.omit(this.props.user, '__v', '_id', 'updatedAt', 'password')
    fieldValues = _.extend(fieldValues, userValues)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user != this.props.user) {
      for (var attribute in nextProps.user) {
        var value = nextProps.user[attribute]
        this.props.change(attribute, value)
      }
    }
  }

  openPasswordDialog () {
    this.setState({password_dialog_open: true})
  }

  closePasswordDialog () {
    this.setState({password_dialog_open: false})
  }

  doThisOnSubmit (input) {
    input.skills = this.state.selectedSkills
    input.DCprogramType = this.state.programType
    this.props.updateUser(this.props.user._id, input)
  }

  handleSkills (event) {
    if (this.state.selectedSkills.length <= 3 && event.target.value.length <= 3) {
      this.setState({ selectedSkills: event.target.value })
    }
  }

  selectProgramType (event) {
    this.setState({ programType: event.target.value })
  }

  handleExpansionPanel (event, expanded, panel) {
    this.setState({
      expanded: expanded ? panel : false
    })
  }

  render () {
    const { handleSubmit } = this.props
    const { expanded } = this.state

    return (

      <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

        <Typography style={{margin: '.5rem'}} variant='caption'>for external links, please use full links copied from your browser</Typography>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={(event, expanded) => { this.handleExpansionPanel(event, expanded, 'panel2') }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon id='panel-2' />}>
            <Typography> Info </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', maxWidth: '98%', padding: '.5rem'}}>

              <Paper elevation={0} style={fieldStyle}><Field type='text' name='fname' label='First Name' component={FormField} validate={[check.alphaNumeric]} /></Paper>
              <Paper elevation={0} style={fieldStyle}><Field type='text' name='lname' label='Last Name' component={FormField} validate={[check.alphaNumeric]} /></Paper>
              <Paper elevation={0} style={fieldStyle}><Field type='text' name='city' label='City' component={FormField} validate={[check.alphaNumeric]} /></Paper>
              <Paper elevation={0} style={fieldStyle}><Field type='text' name='state' label='State' component={FormField} validate={[check.alphaNumeric]} /></Paper>
              <Paper elevation={0} style={fieldStyle}><Field type='text' name='website' label='Personal Website' component={FormField} /></Paper>
              <Paper elevation={0} style={fieldStyle}><Field type='text' name='publicEmail' label='Public Email' component={FormField} validate={[check.email]} /></Paper>

              <Paper style={{padding: '.8rem', margin: '.5rem'}}>

                <Typography> Course Type </Typography>

                <Select

                  value={this.state.programType}
                  onChange={(event) => { this.selectProgramType(event) }}
                  input={<Input placeholder='Course Type' name='DCprogramType' />}
                  renderValue={selected => (
                    <Typography variant='caption'>
                      {selected}
                    </Typography>
                  )}

                >

                  <MenuItem
                    value='Immersive'
                  >
                                                        Immersive
                  </MenuItem>

                  <MenuItem
                    value='Flex'
                  >
                                                        Flex
                  </MenuItem>

                </Select>

                <Divider style={{margin: '.5rem'}} />

                <Typography> Graduation </Typography>
                <Field id='DCgraduationDate' name='DCgraduationDate' component={DatePicker} />

              </Paper>

              <Field style={{margin: '.5rem'}} id='willingnessToRelocate' name='willingnessToRelocate' component={RadioSelect} type='checkbox' label='Willing to Relocate?' />

            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel3'} onChange={(event, expanded) => { this.handleExpansionPanel(event, expanded, 'panel3') }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon id='panel-4' />}>
            <Typography> Social </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', maxWidth: '98%', padding: '.5rem'}}>
              <Paper elevation={0} style={fieldStyle}><Field type='text' name='github' label='Github' component={FormField} /></Paper>
              <Paper elevation={0} style={fieldStyle}><Field type='text' name='linkedin' label='Linkedin' component={FormField} /></Paper>
              <Paper elevation={0} style={fieldStyle}><Field type='text' name='stackOverflow' label='Stack Overflow' component={FormField} /></Paper>
              <Paper elevation={0} style={fieldStyle}><Field type='text' name='mediumBlog' label='Medium Blog' component={FormField} /></Paper>
              <Paper elevation={0} style={fieldStyle}><Field type='text' name='portfolio' label='Portfolio Url' component={FormField} /></Paper>
            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel4'} onChange={(event, expanded) => { this.handleExpansionPanel(event, expanded, 'panel4') }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon id='panel-3' />}>
            <Typography> bio </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Field type='text' name='bio' label='Bio' component={TextArea} validate={[check.maxLength140]} />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel5'} onChange={(event, expanded) => { this.handleExpansionPanel(event, expanded, 'panel5') }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon id='panel-3' />}>
            <Typography> skills </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SkillsSelect handleSkills={this.handleSkills.bind(this)} selectedSkills={this.state.selectedSkills} />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <Button style={{margin: '1rem'}} variant='contained' type='submit'>
                    Save
        </Button>

      </form >)
  }
}

export default reduxForm({
  form: 'grad_profile_form',
  // fields: ["name"],
  // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
  // asyncBlurFields: ["name"],
  // shouldAsyncValidate,
  onSubmitSuccess: afterSubmit,
  initialValues: fieldValues
})(GradProfileForm)
