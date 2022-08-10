import React from "react";
import ToDoContent from "./ToDoContent";

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: "",
            componentCurrentlyEditing: false,
        };
    }

    componentDidMount() {
        this.getDate();
    }

    componentDidUpdate() {
        this.handleNewMainTask();
    }

    handleNewMainTask = () => {
        const NEW_RECORD = document.getElementById("todo__record--new");
        NEW_RECORD.style.visibility = this.props.currentlyAddingTask ? "visible" : "hidden";
        NEW_RECORD.scrollIntoView();
    }

    alterCurrentlyEditing = () => {
        this.setState(prevState => ({componentCurrentlyEditing: !prevState.componentCurrentlyEditing}));
    }

    getDate = () => {
        let date = new Date().toDateString().split(" ");
        var formattedDate = `${date[2]} ${date[1]}`;
        this.setState({currentDate: formattedDate});
    }

    render() {
        return (
            <div id="todo">
                <ToDoContent 
                    currentDate = {this.state.currentDate} 
                    tasks = {this.props.tasks}
                    handleDelete = {this.props.handleDelete}
                    alterCurrentlyEditing = {this.alterCurrentlyEditing}
                    componentCurrentlyEditing = {this.state.componentCurrentlyEditing}
                    editTask = {this.props.editTask}/>
                <form className="todo__record" id="todo__record--new">
                    <div className="todo__description description"><input id="new-task-description" maxLength="110" placeholder="Task Description..."></input></div>
                    <div className="todo__date"><p id="new-task-date">{this.state.currentDate}</p></div>
                    <div className="todo__status">
                        <select id="new-task-status">
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Postponed">Postponed</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="todo__priority todo__priority--low">
                        <select id="new-task-priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                    <div className="todo__actions"><button disabled={true}>✎</button><button disabled={true}>✖</button></div>
                </form>
            </div>
        )
    }
}

export default ToDo;