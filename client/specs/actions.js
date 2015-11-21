import ConfigureStore from "redux-mock-store";
import Thunk from "redux-thunk";
import FetchMock from "fetch-mock";
import * as actions from "../src/actions";

const { expect } = window.chai;
const mockStore = ConfigureStore([
    Thunk
]);

describe("Async Actions", function() {
    
    it("should fetch stories", function(done) {
        // Create a mock story.
        const story = {
            id: 1,
            title: "Hello World",
            url: "https://www.example.com",
            by: "John Smith"
        };

        // Initial state of the store
        const initialState = {};
        // List out the actions we expect to fire (order matters).
        const expectedActions = [
            {type: actions.REQUEST_STORIES},
            {type: actions.RECEIVE_STORIES, stories: [story]}
        ];
        // Construct our mock store.
        const store = mockStore(initialState, expectedActions, done);

        // Mock the server's /latest endpoint to return a pre-defined story.
        FetchMock.mock("http://localhost:8080/latest", {
            body: [story]
        });
        
        // Trigger the action!
        store.dispatch(actions.fetchStories());

        // Revert the mocking.
        FetchMock.restore();
    });
    
});
