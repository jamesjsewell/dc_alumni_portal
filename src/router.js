import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import createHistory from "history/createBrowserHistory"
import { EMPLOYER_LOGIN, GRAD_LOGIN, GRAD_PROFILE } from "./client_secrets.js"
import AuthView from "./features/user_portal/user_auth/AuthView.jsx"
import ResetPasswordView from "./features/user_portal/user_auth/ResetPasswordView.jsx"
import GradProfileView from "./features/user_portal/grad_profile/ProfileView.jsx"


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

class Blank extends Component {
    render() {
        return <div>blank</div>
    }
}

class Test extends Component {
    render() {
        return <div>test test</div>
    }
}

class Test2 extends Component {
    render() {
        return <div>test 2</div>
    }
}

class RouterConfig extends Component {

    render() {
        return (
            
            <Router>

                <Switch>

                    <Route exact path={EMPLOYER_LOGIN} render={EmployerLoginPage} />
                    <Route exact path={GRAD_LOGIN} render={GradLoginPage} />
                    <Route exact path={GRAD_PROFILE} component={GradProfileView} />
                    <Route location={location} key={location.key} exact path="/reset-password/:resetToken" component={ResetPasswordView} />
                    <Route exact path="/test" component={Test} />
                    <Route exact path="/test/test" component={Test2} />
                    <Route path="*" component={Blank} />

                </Switch>

            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default withRouter(connect(mapStateToProps)(RouterConfig))