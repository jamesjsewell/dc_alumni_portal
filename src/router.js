import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import createHistory from "history/createBrowserHistory"
import { EMPLOYER_LOGIN, GRAD_LOGIN, GRAD_PROFILE } from "./client_secrets.js"
import AuthView from "./features/user_auth/components/AuthView.jsx"
import ResetPasswordView from "./features/user_auth/components/ResetPasswordView.jsx"
import GradProfileView from "./features/user_profile/grad_profile/ProfileView.jsx"
import * as controller from "./controller.js"


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
    }

    componentWillReceiveProps(nextProps){
        
    }

    render() {

        const { user } = this.props

        return (
            
            <Router>

                <Switch>

                    { true ? <Route exact path={EMPLOYER_LOGIN} render={EmployerLoginPage} /> : null }
                    { true ? <Route exact path={GRAD_LOGIN} render={GradLoginPage} /> : null }
                    { user.loggedIn ? <Route exact path={GRAD_PROFILE} component={GradProfileView} /> : null }
                    
                    <Route location={location} key={location.key} exact path="/reset-password/:resetToken" component={ResetPasswordView} />
                    <Route path="*" component={Blank} />

                </Switch>

            </Router>
        )
    }
}

export default withRouter(RouterConfig)







