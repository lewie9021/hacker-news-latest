import React from "react";
import { renderComponent } from "./helpers";
import Alert from "../../src/components/Alert";

const { expect } = window.chai;

// Helper to ensure the UI reacts differently to particular props.
function renderAlert(props) {
    const {output} = renderComponent(Alert, props);

    // Ensure it has some styling (not really concerned about the exact styles).
    expect(output.props.style).to.exist;

    // Ensure the content of the alert mimics props.message.
    expect(output.props.children).to.eq(props.message);
}

describe("components", () => {

    describe("Alert", () => {
        
        it("should render correctly", () => {
            renderAlert({message: "Hello World."});
            renderAlert({message: "Request timed out after 15000ms."});
            renderAlert({message: "Another alert example."});
        });

    });

});
