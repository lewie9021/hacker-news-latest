import Fetch from "isomorphic-fetch";

export const REQUEST_STORIES = "REQUEST_STORIES";
function requestStories() {
    return {
        type: REQUEST_STORIES
    };
}

export const RECEIVE_STORIES = "RECEIVE_STORIES";
function receieveStories(stories) {
    return {
        type: RECEIVE_STORIES,
        stories
    };
}

export const FAILED_STORIES = "FAILED_STORIES";
function failedStories(error) {
    return {
        type: FAILED_STORIES,
        error
    };
}

export function fetchStories() {
    // Given we are using the Thunk middleware, the
    // dispatch object is automagically passed to us.
    return function(dispatch) {
        dispatch(requestStories());
        
        return Fetch("http://localhost:8080/latest")
            .then(response => response.json())
            .then(stories => dispatch(receieveStories(stories)))
            .catch(err => dispatch(failedStories(err)));
    };
}
