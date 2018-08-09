import _ from "underscore"
import React, { Component } from "react"
import { Form, Field, reduxForm, change, reset } from "redux-form"
import { FormField, TextArea } from "../../forms/FormFields.jsx"
import * as check from "../../forms/formValidation.js"

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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

class DeleteAccountForm extends Component {
    constructor(props) {
        super(props)
        this.state = { expanded: 'panel1', password_dialog_open: false }
        var userValues = _.omit(this.props.user, "__v", "_id", "updatedAt")
        fieldValues = _.extend(fieldValues, userValues)
        
    }

    doThisOnSubmit(input) {
       

        this.props.removeAccount(input.email)
       
    }

    render() {
        
        const { handleSubmit } = this.props
        const { expanded } = this.state

        return (
            
            <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>
                                
                <Field type="email" name="email" label="email" component={FormField} validate={[check.email]} />
                
                <Button variant="outlined" type="submit">
                    Save
                </Button>
                  
            </form >)
    }
}

export default reduxForm({
    form: 'delete_account_form',
    // fields: ["name"],
    // asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
    // asyncBlurFields: ["name"],
    // shouldAsyncValidate,
    onSubmitSuccess: afterSubmit,
    initialValues: fieldValues
})(DeleteAccountForm)