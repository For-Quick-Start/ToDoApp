import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client'
import './App.css';

import Header      from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import FilterBar   from './components/FilterBar';
import TaskList    from './components/TaskList';
import FooterBar   from './components/FooterBar';

function makeId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadTasks() {
  try {
    const raw = localStorage.getItem('todo-tasks');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks]   = useState(loadTasks);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const counts = {
    all:    tasks.length,
    active: tasks.filter(t => !t.completed).length,
    done:   tasks.filter(t =>  t.completed).length,
  };

  const remaining = counts.active;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'done')   return  task.completed;
    return true;                   // 'all'
  });

  function addTask(text) {
    const newTask = {
      id: makeId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function clearDone() {
    setTasks(prev => prev.filter(t => !t.completed));
  }

  return (
    <div className="app">
      <Header total={tasks.length} remaining={remaining} />

      <div className="divider" />

      <AddTaskForm onAdd={addTask} />

      {tasks.length > 0 && (
        <FilterBar
          current={filter}
          onChange={setFilter}
          counts={counts}
        />
      )}

      <TaskList
        tasks={filteredTasks}
        filter={filter}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      {tasks.length > 0 && (
        <FooterBar
          remaining={remaining}
          completedCount={counts.done}
          onClearDone={clearDone}
        />
      )}
    </div>
  );
}
