import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client'
import './App.css';

import Header      from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import FilterBar   from './components/FilterBar';
import TaskList    from './components/TaskList';
import FooterBar   from './components/FooterBar';

// ── Helpers ──────────────────────────────────────────────

/**
 * makeId — generates a short, collision-resistant string ID.
 * Using crypto.randomUUID() when available, falling back to Date.now().
 */
function makeId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * loadTasks — reads persisted tasks from localStorage.
 * Returns an empty array if nothing is stored or parsing fails.
 * Passed as a lazy initialiser to useState so it only runs once.
 */
function loadTasks() {
  try {
    const raw = localStorage.getItem('todo-tasks');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ── Component ────────────────────────────────────────────

export default function App() {
  const [tasks, setTasks]   = useState(loadTasks);   // lazy init — runs once
  const [filter, setFilter] = useState('all');

  // Persist tasks to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ── Derived values ──────────────────────────────────────

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

  // ── Handlers ────────────────────────────────────────────

  /**
   * addTask — prepends a new task to the list.
   * New tasks appear at the top for instant visual feedback.
   */
  function addTask(text) {
    const newTask = {
      id: makeId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
  }

  /**
   * toggleTask — flips the `completed` boolean on the matched task.
   * Using .map() keeps the array immutable — React can detect the change.
   */
  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  /**
   * deleteTask — removes the task with the given id from the list.
   */
  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  /**
   * clearDone — removes all completed tasks in one shot.
   */
  function clearDone() {
    setTasks(prev => prev.filter(t => !t.completed));
  }

  // ── Render ───────────────────────────────────────────────

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
