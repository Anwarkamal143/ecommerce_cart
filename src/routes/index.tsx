import App from "App";
import { AuthIsNotSignedIn, AuthIsSignedIn } from "context/authContext";
import Applayout from "layouts/Applayout";
import SignIn from "pages/auth/signin";
import { Outlet, createBrowserRouter } from "react-router-dom";
const AUTH_ROUTES = {
  path: "/",
  element: (
    <AuthIsSignedIn>
      <Applayout />
    </AuthIsSignedIn>
  ),

  children: [
    {
      path: "team",
      element: <div>team</div>,
      // loader: teamLoader,
    },
  ],
};
const PUBLIC_ROUTES = {
  element: (
    <AuthIsNotSignedIn>
      <Outlet />
    </AuthIsNotSignedIn>
  ),
  path: "/",
  children: [
    {
      element: <SignIn />,
      path: "signin",
    },
  ],
};
const router = createBrowserRouter([
  {
    element: <App />,
    // loader: rootLoader,
    children: [
      AUTH_ROUTES,
      PUBLIC_ROUTES,
      { path: "*", element: <div>Page Not Found :(</div> },
    ],
  },
  // { path: "*", element: <div>Page Not Found :(</div> },
]);
export default router;
