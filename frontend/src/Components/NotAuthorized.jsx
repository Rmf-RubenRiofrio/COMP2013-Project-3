// Zack Neill
import { Link } from "react-router-dom";

export default function NotAuthorized() {
  // Component to show when user tries to access a page they are not authorized for
  return (
    <div>
      {/* Simple not authorized message with link to login page */}
      <h1>You are not authorized to visit this page 🙁</h1>
      <Link to={"/"}>Back to login page</Link>
    </div>
  );
}
