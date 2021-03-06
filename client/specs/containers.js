import TestUtils from "react-addons-test-utils";
import { renderComponent, convertPropsToImmutable } from "./components/helpers";
import Header from "../src/components/Header";
import Alert from "../src/components/Alert";
import Stories from "../src/components/Stories";
import { App } from "../src/containers/App";

const { expect } = window.chai;
const Sinon = window.sinon;
// Example app state used in the specs below.
const states = [
    {
        isFetching: false,
        fetchError: false,
        stories: []
    },
    {
        isFetching: true,
        fetchError: false,
        stories: []
    },
    {
        isFetching: false,
        fetchError: false,
        stories: [{}]
    },
    {
        isFetching: false,
        fetchError: true,
        stories: []
    }
];

// A higher-order function that helps to remove rendering boilerplate.
function renderApp(props, runExpectations) {
    const immutableProps = convertPropsToImmutable(props);
    const component = renderComponent(App, immutableProps);

    runExpectations(component, props, immutableProps);
}

describe("Containers", () => {

    describe("App", () => {

        it("should render the Header component", () => {
            function expectations({output}) {
                const header = output.props.children[0];

                // Make sure the element is a Header component.
                expect(TestUtils.isElementOfType(header, Header)).to.eq(true);
            }
            
            // Iterate through each app state.
            states.forEach((state, index) => renderApp(state, expectations));
        });

        it("should provide a title prop for the Header component", () => {
            function expectations({output}) {
                const header = output.props.children[0];

                // Check that the title is rendered with the correct text.
                expect(header.props.title).to.eq("Hacker News (Redux)");
            }
            
            // Iterate through each app state.
            states.forEach((state, index) => renderApp(state, expectations));
        });

        it("should pass the Header component an 'actions' object",  () => {
            function expectations({output}) {
                const header = output.props.children[0];

                // Check that an object is passed for the 'actions' attribute.
                expect(header.props.actions).to.exist;
                expect(header.props.actions).to.be.instanceof(Object);
            }
            
            // Iterate through each app state.
            states.forEach((state, index) => renderApp(state, expectations));
        });

        it("should set the Header component's 'isFetching' attribute to props.isFetching", () => {
            function expectations({output}, {isFetching}) {
                const header = output.props.children[0];

                // Ensure we are passing props.isFetching down to the Header component.
                expect(header.props.isFetching).to.exist;
                expect(header.props.isFetching).to.eq(isFetching);
            }
            
            // Iterate through each app state.
            states.forEach((state, index) => renderApp(state, expectations));
        });

        it("should only render the Alert component when 'fetchError' is truthy", () => {
            function expectations({output}, {fetchError}) {
                const alert = output.props.children[1];

                // Ensure the an Alert component is rendered only when fetchError is true.
                expect(TestUtils.isElementOfType(alert, Alert)).to.eq(fetchError);

                // Otherwise, it should be null (not rendered at all).
                expect(alert != null).to.eq(fetchError);
            }
            
            // Iterate through each app state.
            states.forEach((state, index) => renderApp(state, expectations));
        });

        it("should render the Stories component, passing props.stories to its stories attribute", () => {
            function expectations({output}, props, immutableProps) {
                const stories = output.props.children[2];

                // Make sure it's a Stories component.
                expect(TestUtils.isElementOfType(stories, Stories)).to.eq(true);

                // Ensure we are passing the Immutable instance of stories.
                expect(stories.props.stories).to.eq(immutableProps.stories);
            }
            
            // Iterate through each app state.
            states.forEach((state, index) => renderApp(state, expectations));
        });
        
    });
    
});
