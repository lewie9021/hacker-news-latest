import React from "react";
import Story from "./Story";

const styles = {
    listStyleType: "none",
    padding: "0px 8px 8px 8px"
};

function Stories({stories}) {
    return (
        <ul style={styles}>
            {stories.map((story, index) => (
                 <Story
                   key={story.get("id")}
                   index={index}
                   story={story}
                 />
            ))}
        </ul>
    );
};

export default Stories;
