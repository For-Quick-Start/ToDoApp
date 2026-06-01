function TaskItem({ task, onToggle, onDelete }) {
  const timeAdded = new Date(task.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <li
      className={`task-item${task.completed ? ' task-item--completed' : ''}`}
      aria-label={`Task: ${task.text}`}
    >
      {/* Checkbox / toggle area */}
      <button
        className="task-item__check"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        <span className="task-item__checkbox">
          <span className="task-item__checkmark">✓</span>
        </span>
      </button>

      {/* Task text + metadata */}
      <div className="task-item__content">
        <span className="task-item__text">{task.text}</span>
        <span className="task-item__meta">added {timeAdded}</span>
      </div>

      {/* Delete button */}
      <button
        className="task-item__delete"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.text}`}
        title="Delete task"
      >
        ✕
      </button>
    </li>
  );
}

export default TaskItem
