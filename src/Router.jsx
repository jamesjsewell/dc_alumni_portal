import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import createHistory from "history/createBrowserHistory"
import * as routes from "./nav_links.js"
import * as controller from './global_state'
import Page from "./Page.jsx"
// { EMPLOYER_LOGIN, GRAD_LOGIN, GRAD_PROFILE, EMPLOYER_PROFILE }

const EmployerLoginPage = (props) => {
    return (
        <Page
        {...props}
        account_type="employer"
        routes={routes}
        />
    );
}

const GradLoginPage = (props) => {
    return (
        <Page
        {...props}
        account_type="grad"
        routes={routes}
        />
    )
}

const GradProfilePage = (props) => {
    return (
        <Page
        {...props}
        account_type="grad"
        routes={routes}
        />
    )
}

const EmployerProfilePage = (props) => {
    return (
        <Page
        {...props}
        account_type="employer"
        routes={routes}
        />
    )
}

const AlumniPage = (props) => {
    console.log(props)
    return (
        <Page 
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





       
  