export default function NavBar({ quantity, username, onLogout }) {
    return (
      <nav className="NavBar">
        <div className="NavDiv NavUser">
          <h3>Hello, {username}</h3>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
        <div className="NavDiv NavTitle">
          <h2>Groceries App 🍎</h2>
        </div>
        <div className="NavDiv NavCart">
          <img
            src={
              quantity > 0
                ? "src/assets/cart-full.png"
                : "src/assets/cart-empty.png"
            }
          />
        </div>
      </nav>
    );
  }