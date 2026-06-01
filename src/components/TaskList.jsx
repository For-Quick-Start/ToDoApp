import TaskItem from './TaskItem';

const EMPTY_MESSAGES = {
  all:    { icon: '○', title: 'Nothing Here', sub: 'add a task above to get started' },
  active: { icon: '✓', title: 'All Done!',    sub: 'every task is complete' },
  done:   { icon: '◇', title: 'None Yet',     sub: 'no completed tasks yet' },
};

function EmptyState({ filter }) {
  const msg = EMPTY_MESSAGES[filter] ?? EMPTY_MESSAGES.all;
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <span className="empty-state__icon">{msg.icon}</span>
      <p className="empty-state__title">{msg.title}</p>
      <p className="empty-state__sub">{msg.sub}</p>
    </div>
  );
}

export default function TaskList({ tasks, filter, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <ul className="task-list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
