import React from "react";

function Stories({stories}) {
    return (
        <ul>
            {stories.map((story) => (
                <li key={story.get("id")}>
                    <span>{story.get("id")}</span>
                    <span> | </span>
                    <span>{story.get("title")}</span>
                </li>
            ))}
        </ul>
    );
};

export default Stories;
