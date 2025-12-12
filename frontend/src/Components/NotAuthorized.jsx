import { Link } from "react-router-dom";

export default function NotAuthorized() {
  return (
    <div>
      <h1>Not authorized</h1>
      <Link to="/">Back to login</Link>
    </div>
  );
}
