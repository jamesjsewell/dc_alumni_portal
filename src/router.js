import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import createHistory from "history/createBrowserHistory"
import * as routes from "./nav_links.js"
import AuthView from "./features/user_auth/components/AuthView.jsx"
import ResetPasswordView from "./features/user_auth/components/ResetPasswordView.jsx"
import ProfileView from "./features/user_profile/components/ProfileView.jsx"
import AlumniView from "./features/alumni/AlumniView.jsx"
import * as controller from './global_state'
// { EMPLOYER_LOGIN, GRAD_LOGIN, GRAD_PROFILE, EMPLOYER_PROFILE }

const EmployerLoginPage = (props) => {
    return (
        <AuthView 
        {...props}
        account_type="employer"
        routes={routes}
        />
    );
}

const GradLoginPage = (props) => {
    return (
        <AuthView 
        {...props}
        account_type="grad"
        routes={routes}
        />
    )
}

const GradProfilePage = (props) => {
    return (
        <ProfileView 
        {...props}
        account_type="grad"
        routes={routes}
        />
    )
}

const EmployerProfilePage = (props) => {
    return (
        <ProfileView 
        {...props}
        account_type="employer"
        routes={routes}
        />
    )
}

const AlumniPage = (props) => {
    console.log(props)
    return (
        <AlumniView 
        {...props}
        routes={routes}
        />
    )
}

class Blank extends Component {
    render() {
        return <div>blank</div>
    }
}

// -------------------------------------------------- //

@connect(
    state => controller.selector(state),
    dispatch => ({
      actions: bindActionCreators(controller, dispatch)
    })
  )

class RouterConfig extends Component {

    constructor(props){
        super(props)
        
        this.props.actions.auto_log_in(this.props.actions.authenticate, this.props.user.loggedIn)
    }

    componentWillReceiveProps(nextProps){
        
    }

    render() {
    

        return (
            
            <Router>

                <Switch>

                    <Route exact path={routes.EMPLOYER_LOGIN} render={EmployerLoginPage} /> 
                    <Route exact path={routes.GRAD_LOGIN} render={GradLoginPage} /> 
                    <Route exact path={routes.GRAD_PROFILE} component={GradProfilePage} /> 
                    <Route exact path={routes.EMPLOYER_PROFILE} component={EmployerProfilePage} /> 
                    <Route exact path="/alumni" render={AlumniPage} /> 
                    <Route location={location} key={location.key} exact path="/reset-password/:resetToken" component={ResetPasswordView} />
                    <Route path="*" component={Blank} />

                </Switch>

            </Router>
        )
    }
}

export default withRouter(RouterConfig)





       
  