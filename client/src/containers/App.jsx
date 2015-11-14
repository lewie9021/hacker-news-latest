import React, { Component, PropTypes } from "react";
import { Map } from "immutable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import Stories from "../components/Stories";

function App({dispatch, stories}) {
    const {fetchStories} = bindActionCreators(Actions, dispatch);
    
    return (
        <div>
            <h1>Latest Hacker News Stories</h1>
            <button onClick={fetchStories}>
                Request Stories
            </button>
            <Stories stories={stories} />
        </div>
    );
};

// TODO: Could probably use this to do pagination too.
function select(state) {
    return {
        stories: state.get("stories")
    };
};

export default connect(select)(App);
