import React from "react";
import TestUtils from "react-addons-test-utils"
import Immutable from "immutable";

export function renderComponent(Component, props) {
    const renderer = TestUtils.createRenderer();
    
    renderer.render(<Component {...props} />);

    const output = renderer.getRenderOutput();
    
    return {
        renderer,
        output
    };
}
// Convert each property on 'props' to an Immutable data structure.
export function convertPropsToImmutable(props) {
    return Object.keys(props).reduce((map, prop) => {
        map[prop] = Immutable.fromJS(props[prop]);
        
        return map;
    }, {});
}

