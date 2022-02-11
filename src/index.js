import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
const redux = require("redux");

const createStore = redux.createStore;
const initialState = {
    heroLoading: true,
    cardLoading: true,
    detailsLoading: true,
    dark: false,
};
const rootReducer = (state = initialState, action) => {
    if (action.type === "LOADING_HERO_TRUE") {
        return {
            ...state,
            heroLoading: true,
        };
    }
    if (action.type === "LOADING_HERO_FALSE") {
        return {
            ...state,
            heroLoading: false,
        };
    }
    if (action.type === "LOADING_DETAILS_TRUE") {
        return {
            ...state,
            detailsLoading: true,
        };
    }
    if (action.type === "LOADING_DETAILS_FALSE") {
        return {
            ...state,
            detailsLoading: false,
        };
    }
    if (action.type === "LOADING_CARD_TRUE") {
        return {
            ...state,
            cardLoading: true,
        };
    }
    if (action.type === "LOADING_CARD_FALSE") {
        return {
            ...state,
            cardLoading: false,
        };
    }
    if (action.type === "DARK_MODE") {
        return {
            ...state,
            dark: true,
        };
    }
    if (action.type === "LIGHT_MODE") {
        return {
            ...state,
            dark: false,
        };
    }
    return state;
};

const store = createStore(rootReducer);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
