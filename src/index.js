import React, {Component} from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import rootReducer from "./features/reducers.js"
import thunk from "redux-thunk"
import * as routes from "./nav_links.js"
import Page from "./Page.jsx"
import ResetPasswordView from "./features/user_auth/components/ResetPasswordView.jsx"
import "./style.scss"

const theme = createMuiTheme({
    palette: {
        primary: {
          light: '#7cc342',
          main: '#5A8836', 
          //dark: '',
          // contrastText: will be calculated to contast with palette.primary.main
        },
        secondary: {
          light: '#358fcd',
          main: '#358fcd',
          dark: '#358fcd',
          contrastText: '#f29e33',
        }
        // error: will use the default color
    }
    });

const middleware = applyMiddleware(thunk)
const store = createStore(rootReducer, middleware)

const EmployerLoginPage = (props) => {
    return (
        <Page
        {...props}
        account_type="employer"
        routes={routes}
        currentRoute={routes.EMPLOYER_LOGIN}
        />
    )
}

const GradLoginPage = (props) => {
    return (
        <Page
        {...props}
        account_type="grad"
        routes={routes}
        currentRoute={routes.GRAD_LOGIN}
        />
    )
}

const GradProfilePage = (props) => {
    return (
        <Page
        {...props}
        account_type="grad"
        routes={routes}
        currentRoute={routes.GRAD_PROFILE}
        />
    )
}

const EmployerProfilePage = (props) => {
    return (
        <Page
        {...props}
        account_type="employer"
        routes={routes}
        currentRoute={routes.EMPLOYER_PROFILE}
        />
    )
}

const AlumniPage = (props) => {
 
    return (
        <Page 
        {...props}
        routes={routes}
        currentRoute="/alumni"
        />
    )
}

const ResetPasswordPage = (props) => {
 
    return (
        <Page 
        {...props}
        routes={routes}
        currentRoute="reset_password"
        />
    )
}


class Blank extends Component {
    render() {
        return <div>blank</div>
    }
}

ReactDOM.render(

    <MuiThemeProvider theme={theme}>
        <Provider store={store}>

                <Router>

                    <Switch>

                        <Route exact path={routes.EMPLOYER_LOGIN} render={EmployerLoginPage} /> 
                        <Route exact path={routes.GRAD_LOGIN} render={GradLoginPage} /> 
                        <Route exact path={routes.GRAD_PROFILE} component={GradProfilePage} /> 
                        <Route exact path={routes.EMPLOYER_PROFILE} component={EmployerProfilePage} /> 
                        <Route exact path="/alumni" render={AlumniPage} /> 
                        <Route location={location} key={location.key} exact path="/reset-password/:resetToken" component={ResetPasswordPage} />
                        <Route path="*" component={Blank} />

                    </Switch>

                </Router>
        
        </Provider>
    </MuiThemeProvider>,
    document.querySelector("#index")
)

