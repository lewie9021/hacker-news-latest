import Moment from "moment";
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

    // Check the details are rendered correctly.
    let [points,,author,,relativeTime,,comments] = details.props.children;
    // Make sure it has some styles.
    expect(details.props.style).to.exist;

    // Should render the number points ('likes') for the story.
    expect(points.type).to.not.eq("a");
    expect(points.props.children).to.eq(`${story.score} points`);

    // Should render the author who posted the story, linking to their profile.
    expect(author.type).to.eq("a");
    expect(author.props.style).to.exist;
    expect(author.props.href).to.eq(`https://news.ycombinator.com/user?id=${story.by}`);
    expect(author.props.children).to.eq(story.by);
    
    // Should render the time relative to when it was posted, linking to the HN item URL.
    expect(relativeTime.type).to.eq("a");
    expect(relativeTime.props.style).to.exist;
    expect(relativeTime.props.href).to.eq(`https://news.ycombinator.com/item?id=${story.id}`);
    // Since story.time is a unix timestamp we must multiply the value by 1000.
    expect(relativeTime.props.children).to.eq(Moment(story.time * 1000).fromNow());

    // Should render the number of comments tied to the story, linking to the HN item URL.
    expect(comments.type).to.eq("a");
    expect(comments.props.style).to.exist;
    expect(comments.props.href).to.eq(`https://news.ycombinator.com/item?id=${story.id}`);
    expect(comments.props.children).to.eq(`${story.descendants} comments`);
}

describe("components", () => {

    describe("Story", () => {
        
        it("should render correctly", () => {
            renderStory({story: {
                id: 1234,
                score: 2,
                by: "lewie9021",
                descendants: 3,
                url: "https://www.example.com",
                title: "17 secrets developers don't want you to know!",
                time: 1448400163
            }});
        });

    });

});
