import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import createHistory from "history/createBrowserHistory"
import { EMPLOYER_LOGIN, GRAD_LOGIN, GRAD_PROFILE } from "./nav_links.js"
import AuthView from "./features/user_auth/components/AuthView.jsx"
import ResetPasswordView from "./features/user_auth/components/ResetPasswordView.jsx"
import GradProfileView from "./features/user_profile/grad_profile/ProfileView.jsx"
import AlumniView from "./features/alumni/AlumniView.jsx"


const EmployerLoginPage = (props) => {
    return (
        <AuthView 
        {...props}
        account_type="employer"
        />
    );
}

const GradLoginPage = (props) => {
    return (
        <AuthView 
        {...props}
        account_type="grad"
        />
    )
}

const AlumniPage = (props) => {
    console.log(props)
    return (
        <AlumniView 
        {...props}
        
        />
    )
}

class Blank extends Component {
    render() {
        return <div>blank</div>
    }
}

// -------------------------------------------------- //

class RouterConfig extends Component {

    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps){
        
    }

    render() {
      
        const { user } = this.props

        return (
            
            <Router>

                <Switch>

                    <Route exact path={EMPLOYER_LOGIN} render={EmployerLoginPage} /> 
                    <Route exact path={GRAD_LOGIN} render={GradLoginPage} /> 
                    <Route exact path={"/edit-grad-profile"} component={GradProfileView} /> 
                    <Route exact path="/alumni" render={AlumniPage} /> 
                    <Route location={location} key={location.key} exact path="/reset-password/:resetToken" component={ResetPasswordView} />
                    <Route path="*" component={Blank} />

                </Switch>

            </Router>
        )
    }
}

export default withRouter(RouterConfig)





       
  