import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import createHistory from "history/createBrowserHistory"
import AlumniView from "./features/view_alumni/components/AlumniView.jsx"


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
                    <Route exact path="/alumni" component={AlumniView} />
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