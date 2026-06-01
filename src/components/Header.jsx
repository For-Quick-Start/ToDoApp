function Header({ total, remaining }) {
  return (
    <header className="header">
      <span className="header__eyebrow">// task manager v1.0</span>
      <h1 className="header__title">TODO</h1>
      <p className="header__subtitle">
        {total === 0
          ? 'no tasks yet — add one below'
          : `${total} task${total !== 1 ? 's' : ''} tracked`}
      </p>

      {total > 0 && (
        <div className="header__counter">
          <span className="header__counter-num">{remaining}</span>
          <span className="header__counter-label">remaining</span>
        </div>
      )}
    </header>
  );
}

export default Header
