import React from "react";

const styles = {
    header: {
        padding: "16px"
    },
    button: {
        width: "164px",
        float: "right",
        padding: "10px",
        border: "0px",
        color: "#fff",
        backgroundColor: "#337ab7",
        borderRadius: "4px"
    },
    title: {
        fontSize: "32px"
    }
};

function Header({title, actions, isFetching}) {
    return (
        <div style={styles.header}>
            <button
              style={styles.button}
              onClick={actions.fetchStories}
              disabled={isFetching}>
                {isFetching ? "Fetching, Please Wait" : "Request Latest Stories"}
            </button>
            <div style={styles.title}>{title}</div>
        </div>
    );
}

export default Header;
