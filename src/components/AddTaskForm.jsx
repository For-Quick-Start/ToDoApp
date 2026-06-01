import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit} noValidate>
      <input
        className="add-task-form__input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="enter a task"
        aria-label="New task"
        maxLength={200}
        autoComplete="off"
        autoFocus
      />
      <button
        className="add-task-form__btn"
        type="submit"
        disabled={!value.trim()}
        aria-label="Add task"
      >
        ADD +
      </button>
    </form>
  );
}
