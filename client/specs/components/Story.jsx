import React from "react";
import { renderComponent, convertPropsToImmutable } from "./helpers";
import Story from "../../src/components/Story";

const { expect } = window.chai;

// Helper to ensure the UI reacts differently to particular props.
function renderStory(props) {
    const immutableProps = convertPropsToImmutable(props);
    const {output} = renderComponent(Story, immutableProps);
    const [title, details] = output.props.children;
    const {story, index} = props;
    
    // Ensure it has some styling.
    expect(output.props.style).to.exist;
    // We only care that border-top-width is set for the first item.
    expect(output.props.style.borderTopWidth).to.eq(index ? undefined : "1px");

    // Check the title is rendered correctly.
    expect(title.props.style).to.exist;
    // Ensure the link references the original story.
    expect(title.props.href).to.eql(story.url);
    // The title prop should control what story heading is rendered.
    expect(title.props.children.props.children).to.eq(story.title);

    // TODO: Check the details are rendered correctly.
}

describe("components", () => {

    describe("Story", () => {
        
        it("should render correctly", () => {
            renderStory({story: {
                url: "https://www.example.com",
                title: "17 secrets developers don't want you to know!"
            }});
        });

    });

});
