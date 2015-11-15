import React, { Component, PropTypes } from "react";
import { Map } from "immutable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import Header from "../components/Header";
import Stories from "../components/Stories";
import Alert from "../components/Alert";

function App({dispatch, stories, isFetching, fetchError}) {
    const actions = bindActionCreators(Actions, dispatch);
    
    return (
        <div>
            <Header
              title={"Hacker News (Redux)"}
              actions={actions}
              isFetching={isFetching}
            />
            {fetchError ? <Alert message={"Failed to fetch latest stories"} /> : null}
            <Stories stories={stories} />
        </div>
    );
};

// TODO: Could probably use this to do pagination too.
function select(state) {
    return {
        isFetching: state.get("isFetching"),
        fetchError: state.get("fetchError"),
        stories: state.get("stories")
    };
};

export default connect(select)(App);
