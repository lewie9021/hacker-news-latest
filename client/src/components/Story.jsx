import React from "react";

var styles = {
    borderTop: "1px solid black",
    padding: "12px"
}

function Story({story}) {
    const id = story.get("id");
    const title = story.get("title");
    const url = story.get("url");
    
    return (
        <li style={styles}>
            <strong>{title}</strong>
            <br />
            <a href={url}>{url}</a>
        </li>
    );
}

export default Story;
