import Immutable from "immutable";
import RootReducer from "../src/reducers";
import * as actions from "../src/actions";

const { expect } = window.chai;

describe("Reducers", () => {

    describe("root", () => {

        it("should return the initial state", () => {
            const state = RootReducer(undefined, {});
            const expected = {
                isFetching: false,
                failedRequest: false,
                stories: []
            };

            // Since we are dealing with Immutable data structures,
            // we need to convert it back to normal JS.
            expect(state.toJS()).to.eql(expected);
        });
        
    });
       
});
