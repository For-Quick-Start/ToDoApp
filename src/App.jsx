import { useState } from 'react';
import { createRoot } from 'react-dom/client'
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task === "") {
      alert("Please enter a task");
      return;
    }
    setTasks([...tasks, task]);
    setTask("");
  }

  function deleteTask(index) {
    const updateTasks = tasks.filter((item, i) => i !== index);
    setTasks(updateTasks);
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <div className="task-list">
        {tasks.map((item, index) => (
          <div className="task" key={index}>
            <p>{item}</p>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
