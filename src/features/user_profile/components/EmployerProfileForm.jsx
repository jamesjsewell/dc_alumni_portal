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


var fieldValues = {}        
const afterSubmit = (result, dispatch, props) => {
    props.reset()
    props.untouch([])

}

class EmployerProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = { expanded: 'panel1', password_dialog_open: false }
        var userValues = _.omit(this.props.user, "__v", "_id", "updatedAt")
        fieldValues = _.extend(fieldValues, userValues)
        
    }

    componentWillReceiveProps(nextProps){

    
            for(var attribute in nextProps.user){
    
                var value = nextProps.user[attribute]
                this.props.change(attribute, value)
            
            }

    }

    openPasswordDialog(){
        this.setState({password_dialog_open: true})
    }

    closePasswordDialog(){
        this.setState({password_dialog_open: false})
    }


    doThisOnSubmit(input) {
       

        this.props.updateUser(this.props.user._id, input)
       
    }

    render() {
        
        const { handleSubmit } = this.props
        const { expanded } = this.state

        return (
            
            <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

                <Grid container spacing={24}>

                    <Grid item>

                        <Card>

                            <CardContent>
                                
                            <Field type="text" name="companyName" label="Company Name" component={FormField} />
                            <Field type="text" name="companyURL" label="Company URL" component={FormField} />
                            <Field type="text" name="phone" label="Phone Number" component={FormField} /> 
                    
                            </CardContent>

                        </Card>
                                    
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
    form: 'employer_profile_form',
    // fields: ["name"],
    // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
    // asyncBlurFields: ["name"],
    // shouldAsyncValidate,
    onSubmitSuccess: afterSubmit,
    initialValues: fieldValues
})(EmployerProfileForm)