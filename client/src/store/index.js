import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import RootReducer from "../reducers";

const createStoreWithMiddleware = applyMiddleware(
    Thunk // Provides a way to handle async action creators.
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(RootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers.
        module.hot.accept("../reducers", () => {
            const newRootReducer = require("../reducers");
            
            store.replaceReducer(newRootReducer);
        });
    }

    return store;
}
