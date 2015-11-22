import Immutable from "immutable";
import RootReducer from "../src/reducers";
import * as actions from "../src/actions";

const { expect } = window.chai;

function getInitialState() {
    return Immutable.fromJS({
        isFetching: false,
        failedRequest: false,
        stories: []
    });
}

describe("Reducers", () => {

    describe("root", () => {

        it("should return the initial state", () => {
            const initialState = getInitialState().toJS();
            const state = RootReducer(undefined, {});

            // Since we are dealing with Immutable data structures,
            // we need to convert it back to normal JS.
            expect(state.toJS()).to.eql(initialState);
        });

        it("should handle REQUEST_STORIES", () => {
            const initialState = getInitialState();
            const state = RootReducer(initialState, {
                type: actions.REQUEST_STORIES
            });
            
            expect(state.toJS()).to.eql({
                ...initialState.toJS(),
                isFetching: true,
                failedRequest: false
            });
        });

        it("should handle RECEIVE_STORIES", () => {
            const initialState = getInitialState();
            const story = {id: 1, title: "Hello World!"};
            const state = RootReducer(initialState, {
                type: actions.RECEIVE_STORIES,
                stories: [story]
            });

            expect(state.toJS()).to.eql({
                ...initialState.toJS(),
                stories: [story],
                isFetching: false,
                fetchError: false
            });
        });

        it("should handle FAILED_STORIES", () => {
            const initialState = getInitialState();
            const state = RootReducer(initialState, {
                type: actions.FAILED_STORIES,
                error: new Error("Request timed out.")
            });

            expect(state.toJS()).to.eql({
                ...initialState.toJS(),
                isFetching: false,
                fetchError: true
            });
        });
        
    });
       
});
