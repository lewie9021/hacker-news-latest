import React from "react";

function Stories({stories}) {
    return (
        <ul>
            {stories.map((story) => (
                <li key={story.id}>
                    <span>{story.id}</span>
                    <span> | </span>
                    <span>{story.title}</span>
                </li>
            ))}
        </ul>
    );
};

export default Stories;
