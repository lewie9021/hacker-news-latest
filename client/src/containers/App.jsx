import React, { Component, PropTypes } from "react";
import { Map } from "immutable";
import { connect } from "react-redux";
import { requestStories } from "../actions";
import Stories from "../components/Stories";

function App({dispatch, stories}) {
    return (
        <div>
            <h1>Latest Hacker News Stories</h1>
            <Stories stories={stories} />
        </div>
    );
};

// TODO: Could probably use this to do pagination too.
function select(state) {
    const stories = state.get("stories");
    const storiesByID = stories.reduce((storiesByID, story) => {
        const storyID = story.get("id");
        
        return storiesByID.set(storyID, story);
    }, Map());
    
    return {
        storiesByID,
        stories
    };
};

export default connect(select)(App);
