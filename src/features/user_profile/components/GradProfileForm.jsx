import _ from "underscore"
import React, { Component } from "react"
import { Form, Field, reduxForm, change, reset } from "redux-form"
//import { alphaNumeric, required, shouldAsyncValidate, asyncValidate } from "../../util/forms/formValidation.js"
import { FormField, TextArea } from "../../util/FormFields.jsx"

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
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"

import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


// email
// password
// account_type
// fname
// lname
// bio
// avatar
// city
// state
// website
// github
// linkedin
// stackOverflow
// mediumBlog
// portfolio
// publicEmail
// skills
// willingnessToRelocate
// DCgraduationDate
// DCprogramType

const skills = [

    'html',
    'css',
    'javascript',
    'python'

]

const SkillsSelect = ({selectedSkills, handleSkills}) => (
        <FormControl>
            <Typography>Select top 3 Skills</Typography>
            <Select
                
                multiple
                value={selectedSkills}
                onChange={handleSkills}
                input={<Input name="skills" id="select-multiple-chip" />}
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
    constructor(props) {
        super(props)
        this.state = {expanded: 'panel1', password_dialog_open: false, selectedSkills: []}
        
        var userValues = _.omit(this.props.user.loggedIn, "__v", "_id", "updatedAt")
        fieldValues = _.extend(fieldValues, userValues)
        

    }

    componentWillReceiveProps(nextProps){

        if(nextProps.user.loggedIn){
            var user = nextProps.user.loggedIn
            fieldValues = user
        }

    }

    openPasswordDialog(){
        this.setState({password_dialog_open: true})
    }

    closePasswordDialog(){
        this.setState({password_dialog_open: false})
    }


    doThisOnSubmit(input) {
       
        
        input.skills = this.state.selectedSkills
        this.props.updateUser(this.props.user.loggedIn._id, input)
       
    }

    handleSkills(event){

        if(this.state.selectedSkills.length <= 3 && event.target.value.length <= 3){
            this.setState({ selectedSkills: event.target.value })
        }
      
    }

    handleExpansionPanel(event, expanded, panel){
        this.setState({
          expanded: expanded ? panel : false,
        })
    }

    render() {
        
        const { handleSubmit } = this.props
        const { expanded } = this.state

        return (
            
            <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>
                <Grid container spacing={24}>
                    <Grid item>

                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={(event, expanded)=>{this.handleExpansionPanel(event, expanded, 'panel1')}}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon id="panel-1" />}>
                                <Typography> Account </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Card>
                                    <CardContent>
                                        <Field type="email" name="email" label="Email" component={FormField} />
                                        <Field type="password" name="password" label="Password" component={FormField} />
                                        <Field type="text" name="fname" label="First Name" component={FormField} />
                                        <Field type="text" name="lname" label="Last Name" component={FormField} />
                                    </CardContent>
                                </Card>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel  expanded={expanded === 'panel2'} onChange={(event, expanded)=>{this.handleExpansionPanel(event, expanded, 'panel2')}}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon id="panel-2" />}>
                                <Typography> Info </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Card>
                                    <CardContent>
                                        <Field type="text" name="city" label="City" component={FormField} />
                                        <Field type="text" name="state" label="State" component={FormField} />
                                        <Field type="text" name="website" label="Personal Website" component={FormField} />
                                        <Field type="text" name="publicEmail" label="Public Email" component={FormField} />
                                    </CardContent>
                                </Card>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel expanded={expanded === 'panel3'} onChange={(event, expanded)=>{this.handleExpansionPanel(event, expanded, 'panel3')}}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon id="panel-3"/>}>
                                <Typography> Social </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Card>
                                    <CardContent>
                                        <Field type="text" name="github" label="Github" component={FormField} />
                                        <Field type="text" name="linkedin" label="Linkedin" component={FormField} />
                                        <Field type="text" name="stackOverFlow" label="Stack Overflow" component={FormField} />
                                        <Field type="text" name="mediumBlog" label="Medium Blog" component={FormField} />
                                        <Field type="text" name="portfolio" label="Portfolio Url" component={FormField} />
                                    </CardContent>
                                </Card>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                            
                    </Grid>
                    
                    <Grid item>

                        
                        <Typography variant="title" component="h2">Bio</Typography>
                        <Field type="text" name="bio" label="Bio" component={TextArea} />
                    

                    </Grid>     
                    
                    <Grid item >
                                
                        <SkillsSelect handleSkills={this.handleSkills.bind(this)} selectedSkills={this.state.selectedSkills}/>
                        
                    </Grid>

                    <Grid item>
                        <Button variant="outlined" type="submit">
                            Save
                        </Button>
                    </Grid>

                </Grid>
            
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