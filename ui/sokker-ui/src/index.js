import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import reducers from "./store/reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(reducers);


ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);

