import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import {
  ProtectedRoute,
  PublicRouteProtect,
} from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRouteProtect>
        <Login />
      </PublicRouteProtect>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRouteProtect>
        <Signup />
      </PublicRouteProtect>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <Navigate to="/login" /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
