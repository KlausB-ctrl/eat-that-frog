import React from 'react';
import './App.css';
import ToDo from './components/ToDo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTaskFromMain: false,
      tasks: JSON.parse(localStorage.getItem("tasks")),
    };
  }

  handleCancelAddTask = () => {
    this.setState({addingTaskFromMain: !this.state.addingTaskFromMain});
    document.getElementById("todo__record--new").reset();
    document.getElementById("cancel-add-task").style.display = "none";
  }

  handleAddTaskMain = () => {
    this.setState({addingTaskFromMain: !this.state.addingTaskFromMain});
    document.getElementById("cancel-add-task").style.display = "block";
  }

  handleConfirmTaskMain = () => {
    const descriptionInputEl = document.getElementById("new-task-description");
    if(descriptionInputEl.value === "") {
      descriptionInputEl.setCustomValidity("Task description must be longer than 0 characters.");
      descriptionInputEl.reportValidity();
      return;
    }

    document.getElementById("cancel-add-task").style.display = "none";

    let newTaskStatus = document.getElementById("new-task-status");
    let newTaskPriority = document.getElementById("new-task-priority");

    let newTask = {
      description: document.getElementById("new-task-description").value,
      date: document.getElementById("new-task-date").innerText,
      status: newTaskStatus.options[newTaskStatus.selectedIndex].text,
      priority: newTaskPriority.options[newTaskPriority.selectedIndex].text,
    };

    this.addNewTask(newTask);
  }

  addNewTask = (newTask) => {
    this.setState({addingTaskFromMain: false});
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(newTask);
    document.getElementById("todo__record--new").reset();
    this.storeTasks(tasks);
  }

  handleDelete = (recordKey) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(recordKey, 1);
    this.storeTasks(tasks);
  }
 
  editTask = (recordKey, editedTask) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[recordKey] = editedTask;
    this.storeTasks(tasks);
  }

  storeTasks = (tasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    this.setState({tasks: tasks})
  }

  render() {
    let addTaskButtonText = (this.state.addingTaskFromMain) ? "Confirm" : "Add Task";

    return (
      <div className="App">
        <header>
          <img src={require("./assets/eat-that-frog.png")} alt="Eat That Frog logo"></img>
        </header>
        <div className="headings">
            <p className="description">Description</p>
            <p className="information">Start Date</p>
            <p className="information">Status</p>
            <p className="information">Priority</p>
            <p className="information">Actions</p>
        </div>
        <ToDo 
          currentlyAddingTask={this.state.addingTaskFromMain} 
          tasks={this.state.tasks} 
          date={this.state.date}
          handleDelete={this.handleDelete}
          editTask={this.editTask}/>
        <footer>
          <button id="cancel-add-task" onClick={this.handleCancelAddTask}>Cancel</button>
          <button id="add-task" onClick={this.state.addingTaskFromMain ? this.handleConfirmTaskMain : this.handleAddTaskMain}>{addTaskButtonText}</button>
        </footer>
      </div>
    );
  }
}

export default App;
