import React from "react";

const styles = {
    listItem: {
        borderStyle: "solid",
        borderColor: "#ddd",
        borderWidth: "0px 1px 1px 1px",
        backgroundColor: "#f3f3f3",
        padding: "12px"
    },
    title: {
        display: "block",
        marginBottom: "6px",
        color: "#666"
    },
    details: {
        fontSize: "12px",
        color: "#ccc"
    },
    link: {
        color: "#ccc"
    }
}

function Story({story, index}) {
    const listItemStyles = index ? styles.listItem : Object.assign({}, styles.listItem, {
        borderTopWidth: "1px"
    });

    return (
        <li style={listItemStyles}>
            <strong style={styles.title}>{story.get("title")}</strong>
            <div style={styles.details}>
                <span>{story.get("score")} points</span>
                <span> | </span>
                <a style={styles.link} href={story.get("url")}>link</a>
            </div>
        </li>
    );
}

export default Story;
