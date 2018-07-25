import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "./profile.js"

import AuthView from "./features/user_auth/components/AuthView.jsx"
import ResetPasswordView from "./features/user_auth/components/ResetPasswordView.jsx"
import ProfileView from "./features/user_profile/components/ProfileView.jsx"
import AlumniView from "./features/alumni/AlumniView.jsx"
import Navbar from "../../navbar/Navbar.jsx"

import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import CardContent from "@material-ui/core/CardContent"
import Card from "@material-ui/core/Card"

@connect(
    state => controller.selector(state),
    dispatch => ({
        actions: bindActionCreators(controller, dispatch)
    })
)

class ProfileView extends Component {

    constructor(props) {
        
        super(props)

    }

    componentWillReceiveProps(nextProps){

    }

    showPage(){

        const { currentRoute, EMPLOYER_LOGIN, GRAD_LOGIN, GRAD_PROFILE, EMPLOYER_PROFILE } = this.props

        switch ( currentRoute ) {

            case EMPLOYER_LOGIN || GRAD_LOGIN:

                return <AuthView { ...this.props } />

                break

            case GRAD_PROFILE || EMPLOYER_PROFILE:

                return <ProfileView { ...this.props } />

                break

        }



    }

    render() {
        
        const { user } = this.props
        
        return this.showPage()

    }

}

export default withRouter(ProfileView)