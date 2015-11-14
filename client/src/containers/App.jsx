import React, { Component, PropTypes } from "react";
import { Map } from "immutable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import Header from "../components/Header";
import Stories from "../components/Stories";

function App({dispatch, stories, isFetching}) {
    const actions = bindActionCreators(Actions, dispatch);
    
    return (
        <div>
            <Header
                title={"Hacker News (Redux)"}
                actions={actions}
                isFetching={isFetching}
            />
            <Stories stories={stories} />
        </div>
    );
};

// TODO: Could probably use this to do pagination too.
function select(state) {
    return {
        isFetching: state.get("isFetching"),
        stories: state.get("stories")
    };
};

export default connect(select)(App);
