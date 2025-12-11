// Zack Neill
import { Link } from "react-router-dom";

// Component to show when user navigates to a non-existent page
export default function PageNotFound() {
  return (
    <div>
      {/* Simple 404 page not found message with link to home page */}
      <h1>🦖</h1>
      <h1>Page Not Found</h1>
      <Link to={"/"}>Back to login page</Link>
    </div>
  );
}
