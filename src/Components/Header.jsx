function Header({ showForm, setShowForm }) {
  return (
    <header>
      <div className="logo">
        <img className="logo-image" src="logo.png" alt="logo" />
        <h1>TODAY I LEARNED</h1>
      </div>
      <div className="btn-fact">
        <button
          className="btn btn-large submitBtn"
          onClick={() => setShowForm((form) => !form)}
        >
          {showForm ? "Close" : "Share a fact"}
        </button>
      </div>
    </header>
  );
}
export default Header;
