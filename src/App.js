import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <img src={require("./assets/eat-that-frog.png")}></img>
      </header>
      <div className="headings">
          <p className="description">Description</p>
          <p className="information">Start Date</p>
          <p className="information">Status</p>
          <p className="information">Priority</p>
      </div>
      <div className="todo">
        <div className="todo__day">
          <div className="date-dropdown">
            <p>⮟ Today</p>
          </div>
          <div className="todo__container">
            <div className="todo__record">
              <div className="todo__description description">Read Atomic Habits</div>
              <div className="todo__date todo__date--past"><p>2 Aug</p></div>
              <div className="todo__status todo__status--done"><p>Done</p></div>
              <div className="todo__priority todo__priority--low"><p>Low</p></div>
            </div>
            <div className="todo__record">
              <div className="todo__description description">Clean Room</div>
              <div className="todo__date"><p>3 Aug</p></div>
              <div className="todo__status todo__status--done"><p>Done</p></div>
              <div className="todo__priority todo__priority--medium"><p>Medium</p></div>
            </div>
          </div>
        </div> 
      </div>
      <footer>
        <button id="add-task">Add Task</button>
      </footer>
    </div>
  );
}

export default App;
