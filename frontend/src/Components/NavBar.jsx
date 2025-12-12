import Cookie from "js-cookie"

export default function NavBar({ quantity, onLogout }) {
    const userData = Cookie.get("JWT-TOKEN").split("@");
    //I know that to the right of the # is the username, as the logic sets it up that way
    const username = userData[1].split("#")[1];

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