import Immutable, { Map, List } from "immutable";
import { REQUEST_STORIES, RECEIVE_STORIES, FAILED_STORIES } from "../actions";

// Construct an initial state object.
const initialState = Immutable.fromJS({
    isFetching: false,
    failedRequest: false,
    stories: []
});

function RootReducer(state = initialState, action) {
    switch(action.type) {
        case REQUEST_STORIES:
            return state
                .set("isFetching", true)
                .set("failedRequest", false);
            
        case RECEIVE_STORIES:
            return state
                .set("stories", Immutable.fromJS(action.stories))
                .set("isFetching", false)
                .set("fetchError", false);
            
        case FAILED_STORIES:
            return state
                .set("isFetching", false)
                .set("fetchError", true);
    }
    
    return state;
}

export default RootReducer;
