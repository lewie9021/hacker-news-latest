import React from "react";
import Story from "./Story";

const styles = {
    listStyleType: "none",
};

function Stories({stories}) {
    return (
        <ul style={styles}>
            {stories.map((story) => (
                 <Story key={story.get("id")} story={story} />
            ))}
        </ul>
    );
};

export default Stories;
