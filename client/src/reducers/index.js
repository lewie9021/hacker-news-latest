import Immutable, { Map, List } from "immutable";
import { REQUEST_STORIES } from "../actions";

// Construct an initial state object.
const initialState = Immutable.fromJS({
    stories: [
        {id: 1, title: "Hello World"},
        {id: 2, title: "Here is another article"}
    ]
});

function RootReducer(state = initialState, action) {
    switch(action.type) {
        case REQUEST_STORIES:
            alert("Request for stories has been made");
    } 
    
    return state;
}

export default RootReducer;
