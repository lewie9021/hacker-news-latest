import Moment from "moment";
import React from "react";
import { renderComponent, convertPropsToImmutable } from "./helpers";
import Story from "../../src/components/Story";

const { expect } = window.chai;
// Example stories used in the specs below.
const examples = [
    {
        id: 5215884,
        score: 1715,
        by: "tomlemon",
        descendants: 426,
        url: "http://rapgenius.com/James-somers-herokus-ugly-secret-lyrics",
        title: "Heroku's Ugly Secret: The story of how the cloud-king turned its back on Rails",
        time: 1360792029
    },
    {
        id: 7373566,
        score: 2732,
        by: "frederfred",
        descendants: 398,
        url: "http://gabrielecirulli.github.io/2048/",
        title: "2048",
        time: 1377191457
    },
    {
        id: 1234,
        score: 2,
        by: "lewie9021",
        descendants: 3,
        url: "https://www.example.com",
        title: "17 secrets developers don't want you to know!",
        time: 1448400163
    }
];

// A higher-order function that helps to remove rendering boilerplate.
function renderStory(props, runExpectations) {
    const immutableProps = convertPropsToImmutable(props);
    const component = renderComponent(Story, immutableProps);

    runExpectations(component, props);
}

describe("components", () => {

    describe("Story", () => {

        it("should render a 1px border at the top of the first story", () => {
            function expectations({output}, {index}) {
                // Ensure it has some styling.
                expect(output.props.style).to.exist;
                
                // We only care that border-top-width is set for the first item.
                expect(output.props.style.borderTopWidth).to.eq(index ? undefined : "1px");
            }
            
            // Render the list of example stories.
            examples.forEach((example, index) => renderStory({story: example, index}, expectations));
        });
            
        it("should render the story's title in bold, linking to the original story URL", () => {
            function expectations({output}, {story}) {
                const title = output.props.children[0];

                // Ensure it's a link element.
                expect(title.type).to.eq("a");

                // Check it has some styling.
                expect(title.props.style).to.exist;
                
                // Ensure the link references the original story.
                expect(title.props.href).to.eql(story.url);
                
                // The 'title' prop should control what story heading is rendered.
                expect(title.props.children.props.children).to.eq(story.title);
            }
            
            // Render the list of example stories.
            examples.forEach((example, index) => renderStory({story: example, index}, expectations));
        });

        it("should render the number of points the story has", () => {
            function expectations({output}, {story}) {
                const details = output.props.children[1];
                const points = details.props.children[0];
                
                // Ensure it's not a link element.
                expect(points.type).to.not.eq("a");

                // Check the text dynamically renders the value of story.score.
                expect(points.props.children).to.eq(`${story.score} points`);
            }

            // Render the list of example stories.
            examples.forEach((example, index) => renderStory({story: example, index}, expectations));
        });

        it("should render the author who posted the story, linking to their HN profile", () => {
            function expectations({output}, {story}) {
                const details = output.props.children[1];
                const author = details.props.children[2];

                // Check it has some styling.
                expect(author.props.style).to.exist;
                
                // Ensure it's a link element, pointing to the user's Hacker News profile.
                expect(author.type).to.eq("a");
                expect(author.props.href).to.eq(`https://news.ycombinator.com/user?id=${story.by}`);

                // Ensure the text displays just the username.
                expect(author.props.children).to.eq(story.by);
            }

            // Render the list of example stories.
            examples.forEach((example, index) => renderStory({story: example, index}, expectations));
        });

        it("should render the time relative to when the story was posted, linking to the HN item URL", () => {
            function expectations({output}, {story}) {
                const details = output.props.children[1];
                const relativeTime = details.props.children[4];

                // Check it has some styling.
                expect(relativeTime.props.style).to.exist;
                
                // Ensure it's a link element, pointing to the story on Hacker News.
                expect(relativeTime.type).to.eq("a");
                expect(relativeTime.props.href).to.eq(`https://news.ycombinator.com/item?id=${story.id}`);

                // Since story.time is a unix timestamp we must multiply the value by 1000.
                expect(relativeTime.props.children).to.eq(Moment(story.time * 1000).fromNow());
            }

            // Render the list of example stories.
            examples.forEach((example, index) => renderStory({story: example, index}, expectations));
        });

        it("should render the number of comments tied to the story, linking to the HN item URL", () => {
            function expectations({output}, {story}) {
                const details = output.props.children[1];
                const comments = details.props.children[6];

                // Check it has some styling.
                expect(comments.props.style).to.exist;

                // Ensure it's a link element, pointing to the story on Hacker News.
                expect(comments.type).to.eq("a");
                expect(comments.props.href).to.eq(`https://news.ycombinator.com/item?id=${story.id}`);

                // Ensure the text displays the number comments the story has.
                expect(comments.props.children).to.eq(`${story.descendants} comments`);
            }

            // Render the list of example stories.
            examples.forEach((example, index) => renderStory({story: example, index}, expectations));
        });

    });

});
