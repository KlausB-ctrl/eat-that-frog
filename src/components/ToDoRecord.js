import React from "react";

class ToDoRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recordClasses: "todo__record",
            dateClasses: "todo__date",
            thisCurrentlyEditing: false
        }
    }

    componentDidMount() {
        this.determineStatusClasses();
        this.determinePriorityClasses();
    }

    componentDidUpdate() {
        if(this.state.thisCurrentlyEditing) {
            document.getElementById("task-status-edit").value = this.props.status;
            document.getElementById("task-priority-edit").value = this.props.priority;
        }
    }

    determineStatusClasses = () => {
        let indicatorClasses = "todo__description__indicator todo__status__indicator--new";
        let statusClasses = "todo__status todo__status--new";
        if(this.props.status === "In Progress") {
            indicatorClasses = "todo__description__indicator todo__status__indicator--in-progress";
            statusClasses = "todo__status todo__status--in-progress";
        } else if(this.props.status === "Postponed") {
            indicatorClasses = "todo__description__indicator todo__status__indicator--postponed";
            statusClasses = "todo__status todo__status--postponed";
        } else if(this.props.status === "Done") {
            indicatorClasses = "todo__description__indicator todo__status__indicator--done";
            statusClasses = "todo__status todo__status--done";
        }
        return(indicatorClasses, statusClasses);
    }
    
    determinePriorityClasses = () => {
        let priorityClasses = "todo__priority todo__priority--low";
        if(this.props.priority === "Medium") {
            priorityClasses = "todo__priority todo__priority--medium";
        } else if(this.props.priority === "High") {
            priorityClasses = "todo__priority todo__priority--high";
        } else if(this.props.priority === "Critical") {
            priorityClasses = "todo__priority todo__priority--critical";
        }
        return priorityClasses;
    }

    determineDescriptionContent = (indicatorClasses) => {
        let todoDescription;
        if(this.state.thisCurrentlyEditing) {
            todoDescription = (
                <div className="todo__description description">
                    <input id="task-description-edit" type="text" defaultValue={this.props.description}></input>
                </div>
            )
        } else {
            todoDescription = (
                <div className="todo__description description">
                    <div className={indicatorClasses}></div>
                    <p>{this.props.description}</p>
                </div>
            )
        }
        return todoDescription;
    }

    determineStatusContent = (statusClasses) => {
        let todoStatus;
        if(this.state.thisCurrentlyEditing) {
            todoStatus = (
                <div className="todo__status">
                    <select id="task-status-edit">
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Postponed">Postponed</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            )
        } else {
            todoStatus = (
                <div className={statusClasses}>
                    <p>{this.props.status}</p>
                </div>
            )
        }
        return todoStatus;
    }

    determinePriorityContent = (priorityClasses) => {
        let todoPriority;
        if(this.state.thisCurrentlyEditing) {
            todoPriority = (
                <div className="todo__priority todo__priority--low">
                    <select id="task-priority-edit">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
            )
        } else {
            todoPriority = (
                <div className={priorityClasses}>
                    <p>{this.props.priority}</p>
                </div>
            )
        }
        return todoPriority;
    }

    handleEdit = () => {
        this.setState({thisCurrentlyEditing: true, recordClasses: "todo__record todo__record--edit"});
        this.props.alterCurrentlyEditing();
    }

    handleConfirm = () => {
        let editedTaskStatus = document.getElementById("task-status-edit");
        let editedTaskPriority = document.getElementById("task-priority-edit");

        let editedTask = {
            description: document.getElementById("task-description-edit").value,
            date: this.props.date,
            status: editedTaskStatus.options[editedTaskStatus.selectedIndex].text,
            priority: editedTaskPriority.options[editedTaskPriority.selectedIndex].text
          }

        this.setState({thisCurrentlyEditing: false, recordClasses: "todo__record"});
        this.props.alterCurrentlyEditing();
        this.props.editTask(this.props.recordKey, editedTask);
    }

    handleCancel = () => {
        this.setState({thisCurrentlyEditing: false, recordClasses: "todo__record"});
        this.props.alterCurrentlyEditing();
    }

    render() {
        let indicatorClasses, statusClasses = this.determineStatusClasses();
        let priorityClasses = this.determinePriorityClasses();
        let todoDescription = this.determineDescriptionContent(indicatorClasses);
        let todoStatus = this.determineStatusContent(statusClasses);
        let todoPriority = this.determinePriorityContent(priorityClasses);
        let deleteFunction = (this.state.thisCurrentlyEditing) ? this.handleCancel : () => this.props.handleDelete(this.props.recordKey);
        let editFunction = (this.state.thisCurrentlyEditing) ? this.handleConfirm : this.handleEdit;
        return(
            <div className={this.state.recordClasses}>
                {todoDescription}
                <div className={this.props.dateClasses}><p>{this.props.date}</p></div>
                {todoStatus}
                {todoPriority}
                <div className="todo__actions">
                    <button onClick={editFunction} disabled={(this.props.componentCurrentlyEditing && !this.state.thisCurrentlyEditing)}>{(this.state.thisCurrentlyEditing) ? "✓" : "✎"}</button>
                    <button onClick={deleteFunction} disabled={this.props.componentCurrentlyEditing && !this.state.thisCurrentlyEditing}>{(this.state.thisCurrentlyEditing) ? "🛇" : "✖"}</button>
                </div>
            </div>
        )
    };
}

export default ToDoRecord;