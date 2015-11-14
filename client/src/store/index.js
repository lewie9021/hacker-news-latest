import { Iterable } from "immutable";
import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import CreateLogger from "redux-logger";
import RootReducer from "../reducers";
import { fetchStories } from "../actions";

const createStoreWithMiddleware = applyMiddleware(
    // Provides a way to handle async action creators.
    Thunk,
    // Log in console when actions are triggering, showing store mutations.
    CreateLogger({
        // Collapse actions to console cluttering.
        collapsed: true,
        // Since we are working with Immutable, we need to render state as plain objects.
        transformer: function(state) {
            return Iterable.isIterable(state) ? state.toJS() : state;
        }
    })
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(RootReducer, initialState);

    store.dispatch(fetchStories());

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers.
        module.hot.accept("../reducers", () => {
            const newRootReducer = require("../reducers");
            
            store.replaceReducer(newRootReducer);
        });
    }

    return store;
}
