import { renderComponent } from "./helpers";
import Header from "../../src/components/Header";

const { expect } = window.chai;

// Helper to ensure the UI reacts differently to particular props.
function renderHeader(props, expectedBtnText) {
    const {output} = renderComponent(Header, props);
    const isFetchingColor = props.isFetching ? "#337ab7" : "#286090";

    // Ensure it has some styling (not really concerned about the exact styles).
    expect(output.props.style).to.exist;

    const [btn, heading] = output.props.children;
    
    // Make sure we have a fetch button.
    expect(btn.props.style).to.exist;
    // Ensure the background of the fetch button changes in response to the 'isFetching' prop.
    expect(btn.props.style.backgroundColor).to.eq(isFetchingColor);
    expect(btn.props.disabled).to.eq(props.isFetching);
    expect(btn.props.children).to.eq(expectedBtnText);

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
            }, "Fetch Latest Stories");

            // The button text should change if we are fetching.
            renderHeader({
                title: "second example title",
                actions: {},
                isFetching: true
            }, "Fetching Stories...");
        });

    });

});
