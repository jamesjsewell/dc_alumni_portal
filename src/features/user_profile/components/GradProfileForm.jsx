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
        
const afterSubmit = (result, dispatch, props) => {
    props.reset()
    props.untouch([])

}

class GradProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {password_dialog_open: false, selectedSkills: []}

    }

    componentWillReceiveProps(nextProps){

    }

    openPasswordDialog(){
        this.setState({password_dialog_open: true})
    }

    closePasswordDialog(){
        this.setState({password_dialog_open: false})
    }


    doThisOnSubmit(input) {
       
        
       
    }

    handleSkills(event){

        if(this.state.selectedSkills.length <= 3 && event.target.value.length <= 3){
            this.setState({ selectedSkills: event.target.value });
        }
      
    };

    render() {

        const { handleSubmit } = this.props

        return (
            
            <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>
                <Grid container spacing={16}>
                
                    <Grid item >
                        <Card>
                            <CardContent>
                                <Typography> Account </Typography>
                                <Field type="email" name="email" label="Email" component={FormField} />
                                <Field type="password" name="password" label="Password" component={FormField} />
                                <Field type="text" name="fname" label="First Name" component={FormField} />
                                <Field type="text" name="lname" label="Last Name" component={FormField} />
                            </CardContent>
                        </Card>
                    </Grid>
               
                    <Grid item>
                        <Card>
                            <CardContent>
                                <Typography> Info </Typography>
                                <Field type="text" name="city" label="City" component={FormField} />
                                <Field type="text" name="state" label="State" component={FormField} />
                                <Field type="text" name="website" label="Personal Website" component={FormField} />
                                <Field type="text" name="publicEmail" label="Public Email" component={FormField} />

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item >
                        <Card>
                            <CardContent>
                                <Typography> Social </Typography>
                                <Field type="text" name="github" label="Github" component={FormField} />
                                <Field type="text" name="linkedin" label="Linkedin" component={FormField} />
                                <Field type="text" name="stackOverFlow" label="Stack Overflow" component={FormField} />
                                <Field type="text" name="mediumBlog" label="Medium Blog" component={FormField} />
                                <Field type="text" name="portfolio" label="Portfolio Url" component={FormField} />
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

                <Grid xs={12} item>
                    <Card>
                        <CardContent>
                            <Typography> Bio </Typography>
                            <Field type="text" name="bio" label="Bio" component={TextArea} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item>
                    <Card>
                        <CardContent>
                            
                            <FormControl>
                                <Typography>Select top 3 Skills</Typography>
                                <Select
                                    multiple
                                    value={this.state.selectedSkills}
                                    onChange={this.handleSkills.bind(this)}
                                    input={<Input id="select-multiple-chip" />}
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

                        </CardContent>
                    </Card>
                </Grid>

                <Card>
                    <CardContent>
                        <Button variant="outlined" type="submit">
                            Save
                        </Button>
                    </CardContent>
                </Card>

            </form >
            
        )
    }
}

export default reduxForm({
    form: 'grad_profile_form',
    // fields: ["name"],
    // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
    // asyncBlurFields: ["name"],
    // shouldAsyncValidate,
    onSubmitSuccess: afterSubmit
})(GradProfileForm)