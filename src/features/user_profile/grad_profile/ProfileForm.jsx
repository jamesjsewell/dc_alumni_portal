import React, { Component } from "react"
import { Form, Field, reduxForm, change, reset } from "redux-form"
//import { alphaNumeric, required, shouldAsyncValidate, asyncValidate } from "../../util/forms/formValidation.js"
import { FormField } from "../../util/FormFields.jsx"

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'

const afterSubmit = (result, dispatch, props) => {
    props.reset()
    props.untouch([])

}

class GradProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {password_dialog_open: false}

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

    render() {

        const { handleSubmit } = this.props

        return (
            
            <form onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}>

                <Field type="email" name="email_login" label="email" component={FormField} />
                <Field type="password" name="password_login" label="password" component={FormField} />
                <Field type="text" name="fname" label="First Name" component={FormField} />
                <Field type="text" name="lname" label="Last Name" component={FormField} />

                <Button variant="contained" type="submit">
                    Save
                </Button>

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