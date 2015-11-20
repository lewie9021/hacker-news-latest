import ConfigureStore from "redux-mock-store";
import Thunk from "redux-thunk";
import * as actions from "../src/actions";

const { expect } = window.chai;
const mockStore = ConfigureStore([
    Thunk
]);


describe("Async Actions", function() {

    it("should fetch stories", function(done) {
        
    });
    
});
