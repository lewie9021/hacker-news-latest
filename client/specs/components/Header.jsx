import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import { renderComponent } from "./helpers";
import Header from "../../src/components/Header";

const { expect } = window.chai;
const Sinon = window.sinon;

// Helper to ensure the UI reacts differently to particular props.
function renderHeader(props, {btnText, btnColor}) {
    const {output} = renderComponent(Header, props);
    const [btn, heading] = output.props.children;

    // Ensure it has some styling (not really concerned about the exact styles).
    expect(output.props.style).to.exist;

    // Make sure we have a fetch button.
    expect(btn.props.style).to.exist;
    // Ensure the background of the fetch button changes in response to the 'isFetching' prop.
    expect(btn.props.style.backgroundColor).to.eq(btnColor);
    expect(btn.props.disabled).to.eq(props.isFetching);
    expect(btn.props.children).to.eq(btnText);

    // Check that we are actually rendering a heading.
    expect(heading.props.style).to.exist;
    expect(heading.props.children).to.eq(props.title);
}

describe("components", () => {

    describe("Header", () => {
        
        it("should render correctly", () => {
            // Ensure it renders correctly with 'default' props.
            renderHeader({
                title: "example title one",
                actions: {},
                isFetching: false
            }, {
                btnText: "Fetch Latest Stories",
                btnColor: "#286090"
            });

            // The button text anc color should change if we are fetching.
            renderHeader({
                title: "second example title",
                actions: {},
                isFetching: true
            }, {
                btnText: "Fetching Stories...",
                btnColor: "#337ab7"
            });
        });

        it("should call fetchStories if the button is clicked", () => {
            const fetchSpy = Sinon.spy();

            function simulateClick(Component) {
                const output = TestUtils.renderIntoDocument(Component);
                const button = ReactDOM.findDOMNode(output).querySelector("button");
                
                // Simulate fetching stories.
                TestUtils.Simulate.click(button);
            }

            // We aren't fetching so the button should be clickable.
            simulateClick(Header({
                title: "example title",
                actions: {fetchStories: fetchSpy},
                isFetching: false
            }));
            
            expect(fetchSpy.callCount).to.eq(1);

            // Fetching is in progress so fetchStories shouldn't be called.
            simulateClick(Header({
                title: "example title",
                actions: {fetchStories: fetchSpy},
                isFetching: true
            }));

            expect(fetchSpy.callCount).to.eq(1);
        });

    });

});
