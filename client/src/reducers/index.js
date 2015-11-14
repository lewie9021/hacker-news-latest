import Immutable, { Map, List } from "immutable";
import { REQUEST_STORIES } from "../actions";

// Construct an initial state object.
const initialState = Immutable.fromJS({
    isFetching: false,
    stories: []
});

function RootReducer(state = initialState, action) {
    switch(action.type) {
        case REQUEST_STORIES:
            return state.set("isFetching", true);
    }
    
    return state;
}

export default RootReducer;
