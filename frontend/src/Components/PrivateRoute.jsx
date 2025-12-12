import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

/*
    Protected route component.
    Uses <Outlet /> to render child routes and <Navigate />
    to redirect unauthorized users.

    React Router - Protecting Routes
    https://reactrouter.com/en/main/start/tutorial#protecting-routes

    React Router - <Navigate /> Component
    https://reactrouter.com/en/main/components/navigate
*/

export default function PrivateRoute() {
  const jwtToken = Cookies.get("JWT-TOKEN");

  if (!jwtToken) {
    // Redirect unauthorized users before protected components mount
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />;
}
