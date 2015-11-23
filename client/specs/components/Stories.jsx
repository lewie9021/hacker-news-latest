import React from "react";
import Immutable from "immutable";
import TestUtils from "react-addons-test-utils";
import { renderComponent } from "./helpers";
import Stories from "../../src/components/Stories";
import Story from "../../src/components/Story";

const { expect } = window.chai;

// Helper to ensure the UI reacts differently to particular props.
function renderStories(props) {
    // Convert each property on 'props' to an Immutable data structure.
    const immutableProps = Object.keys(props).reduce((map, prop) => {
        map[prop] = Immutable.fromJS(props[prop]);
        
        return map;
    }, {});
    const {output} = renderComponent(Stories, immutableProps);
    const stories = output.props.children;

    // Make sure it's a ul element.
    expect(output.type).to.eq("ul");
    
    // Ensure it has some styling (not really concerned about the exact styles).
    expect(output.props.style).to.exist;

    // Check that the number of stories passed in reflects the number of child elements rendered.
    expect(stories.size).to.eq(immutableProps.stories.size);
}

describe("components", () => {

    describe("Stories", () => {
        
        it("should render correctly", () => {
            // If a a 'stories' array isn't passed, we expect the component to throw.
            expect(() => renderStories()).to.throw(TypeError);

            // Render an empty list of stories.
            renderStories({stories: []});

            // Render an empty story.
            renderStories({stories: [{}]});

            // Render two empty stories to check that output.props.children reacts accordingly.
            renderStories({stories: [{}, {}]});
        });

        it("should render an array of Story components", () => {
            const {output} = renderComponent(Stories, {
                stories: Immutable.fromJS([{}, {}])
            });
            const stories = output.props.children;
            const correctTypes = stories.filter((story) => {
                return TestUtils.isElementOfType(story, Story);
            });

            // Expect every child element to be a Story component.
            expect(correctTypes.size).to.eq(2);
        });

    });

});
