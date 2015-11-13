import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Stories from "../components/Stories";
// import * as Actions from "../actions"

function App(props) {
    // Make sure my components are fine before connecting up Redux.
    const stories = [
        {id: 1, title: "Hello world"},
        {id: 2, title: "Here is another article"}
    ];
    
    return (
        <div>
            <h1>Latest Hacker News Stories</h1>
            <Stories stories={stories} />
        </div>
    );
};

// TODO: Could probably use this to do pagination too.
function select(state) {
    return state;
};

export default connect(select)(App);
