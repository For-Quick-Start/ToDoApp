function FooterBar({ remaining, completedCount, onClearDone }) {
  function handleClear() {
    if (window.confirm(`Remove ${completedCount} completed task${completedCount !== 1 ? 's' : ''}?`)) {
      onClearDone();
    }
  }

  return (
    <footer className="footer-bar">
      <span className="footer-bar__count">
        {remaining} task{remaining !== 1 ? 's' : ''} left
      </span>

      {completedCount > 0 && (
        <button className="footer-bar__clear" onClick={handleClear}>
          Clear completed [{completedCount}]
        </button>
      )}
    </footer>
  );
}

export default FooterBar
