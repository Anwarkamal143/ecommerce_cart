import App from "App";

import Applayout from "layouts/Applayout";
import Cart from "pages/cart";
import Home from "pages/home";

import { createBrowserRouter } from "react-router-dom";
const ROUTES = {
  path: "/",
  element: <Applayout />,

  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ],
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: [ROUTES, { path: "*", element: <div>Page Not Found :(</div> }],
  },
]);
export default router;
