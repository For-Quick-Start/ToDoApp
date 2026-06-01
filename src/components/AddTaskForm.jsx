import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();            // prevent page reload
    const trimmed = value.trim();
    if (!trimmed) return;          // ignore blank submissions
    onAdd(trimmed);                // lift the value up to App
    setValue('');                  // reset local state
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit} noValidate>
      <input
        className="add-task-form__input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="what needs to be done?"
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
