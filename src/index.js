import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./features/reducers.js"
import thunk from "redux-thunk"
import RouterConfig from "./router.js"

const middleware = applyMiddleware(thunk)
const store = createStore(rootReducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        
        <BrowserRouter>
            <RouterConfig />
        </BrowserRouter>
       
    </Provider>,
    document.querySelector("#index")
)

