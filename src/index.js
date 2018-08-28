import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import rootReducer from './features/reducers.js'
import thunk from 'redux-thunk'
import * as routes from '../nav_links.js'
import Page from './Page.js'
import ResetPasswordView from './features/user_auth/components/ResetPasswordView.js'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import './style.scss'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#358fcd',
      main: '#216fb8',
      dark: '#1f66a3'

    },
    secondary: {
      light: '#bbbdbf',
      main: '#a6aaab',
      dark: '#6e6e71'
    },
    error: {
      light: '#ed7733',
      main: '#ed7733'
    }
  }
})

const middleware = applyMiddleware(thunk)
const store = createStore(rootReducer, middleware)

const EmployerLoginPage = (props) => {
  return (
    <Page
      {...props}
      account_type='employer'
      routes={routes}
      currentRoute={routes.EMPLOYER_LOGIN}
    />
  )
}

const GradLoginPage = (props) => {
  return (
    <Page
      {...props}
      account_type='grad'
      routes={routes}
      currentRoute={routes.GRAD_LOGIN}
    />
  )
}

const GradProfilePage = (props) => {
  return (
    <Page
      {...props}
      account_type='grad'
      routes={routes}
      currentRoute={routes.GRAD_PROFILE}
    />
  )
}

const EmployerProfilePage = (props) => {
  return (
    <Page
      {...props}
      account_type='employer'
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
      currentRoute='/alumni'
    />
  )
}

const ResetPasswordPage = (props) => {
  return (
    <Page
      {...props}
      routes={routes}
      currentRoute='reset_password'
    />
  )
}

class Blank extends Component {
  render () {
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
          <Route exact path='/alumni' render={AlumniPage} />
          <Route location={location} key={location.key} exact path='/reset-password/:resetToken' component={ResetPasswordPage} />
          <Route path='*' component={AlumniPage} />

        </Switch>

      </Router>

    </Provider>
  </MuiThemeProvider>,
  document.querySelector('#index')
)
