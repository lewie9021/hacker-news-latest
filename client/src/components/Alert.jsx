import React from "react";

const styles = {
    margin: "8px",
    padding: "8px",
    backgroundColor: "#d9534f",
    borderRadius: "4px",
    borderColor: "#d43f3a",
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
};

function Alert({message}) {
    return (
        <div style={styles}>{message}</div>
    );
}

export default Alert;
