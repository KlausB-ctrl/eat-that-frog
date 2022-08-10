import React from "react";
import ToDoHeader from "./ToDoHeader";
import ToDoRecord from "./ToDoRecord";

function ToDoContent(props) {
    let tasks = (props.tasks === null) ? [] : props.tasks;
    let todoComponents = [];
    let previousTaskDate = "";
    for(let i = 0; i < tasks.length; i++) {
        if(previousTaskDate !== tasks[i].date) {
            let date = (tasks[i].date === props.currentDate) ? "Today" : tasks[i].date;
            todoComponents.push(<ToDoHeader key = {tasks[i].date} date={date}/>)
            previousTaskDate = tasks[i].date;
        }

        todoComponents.push(
            <ToDoRecord
                key = {i}
                recordKey = {i}
                dateClasses = {(props.currentDate === tasks[i].date) ? "todo__date" : "todo__date todo__date--past"}
                description = {tasks[i].description}
                date = {tasks[i].date}
                status = {tasks[i].status}
                priority = {tasks[i].priority}
                handleDelete = {props.handleDelete}
                alterCurrentlyEditing = {props.alterCurrentlyEditing}
                componentCurrentlyEditing = {props.componentCurrentlyEditing}
                editTask = {props.editTask}/>
        );
    }

    return(todoComponents)
}

export default ToDoContent; 