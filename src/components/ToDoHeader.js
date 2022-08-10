import React from "react";

function ToDoHeader(props) {
    return(
        <div className="date-dropdown">
            <p>{props.date}</p>
        </div>
    )
}

export default ToDoHeader;