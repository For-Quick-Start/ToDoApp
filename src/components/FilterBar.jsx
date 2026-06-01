const FILTERS = [
  { id: 'all',    label: 'All'       },
  { id: 'active', label: 'Active'    },
  { id: 'done',   label: 'Completed' },
];

function FilterBar({ current, onChange, counts }) {
  return (
    <nav className="filter-bar" aria-label="Task filters">
      {FILTERS.map(({ id, label }) => (
        <button
          key={id}
          className={`filter-bar__btn${current === id ? ' filter-bar__btn--active' : ''}`}
          onClick={() => onChange(id)}
          aria-pressed={current === id}
        >
          {label}
          {counts && (
            <span style={{ marginLeft: 6, opacity: 0.6 }}>
              [{counts[id]}]
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}

export default FilterBar
