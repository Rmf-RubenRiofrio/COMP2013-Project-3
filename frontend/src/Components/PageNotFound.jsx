// Zack Neill
import { Link } from "react-router-dom";

//sawyer smith
import Cookie from "js-cookie";

// Component to show when user navigates to a non-existent page
export default function PageNotFound() {
  const cookie = Cookie.get("JWT-TOKEN");

  //check if there is a user so it returns to main and not the login page
  if(cookie != undefined)
  {
    return (
      <div>
        {/* Simple 404 page not found message with link to home page */}
        <h1>🦖</h1>
        <h1>Page Not Found</h1>
        <Link to={"/main"}>Back to main page</Link>
      </div>
    );
  }
  else{
    return (
      <div>
        {/* Simple 404 page not found message with link to home page */}
        <h1>🦖</h1>
        <h1>Page Not Found</h1>
        <Link to={"/"}>Back to login page</Link>
      </div>
    );
  }
  
}
