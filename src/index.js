import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./features/reducers.js"
import thunk from "redux-thunk"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RouterConfig from "./router.js"

const middleware = applyMiddleware(thunk)
const store = createStore(rootReducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <BrowserRouter>
                <RouterConfig />
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
    document.querySelector("#index")
)

