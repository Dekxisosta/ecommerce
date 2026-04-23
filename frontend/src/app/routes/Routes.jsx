import { createBrowserRouter } from "react-router-dom";
import App from "../../App";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../../pages/Home";
import ProductDetailPage from "../../features/products/pages/ProductDetailPage";
import ProductListPage from "../../features/products/pages/ProductListPage";
import Cart from "../../features/cart/pages/Cart";
import About from "../../features/about/pages/About";
import Login from "../../features/auth/pages/Login";
import Signup from "../../features/auth/pages/Signup";

import Dashboard from "../../features/admin/pages/Dashboard";
import ProductsAdmin from "../../features/admin/pages/ProductsAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "products", element: <ProductListPage /> },
          { path: "product/:slug/:id", element: <ProductDetailPage /> },
          { path: "cart", element: <Cart /> },
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
          { path: "about", element: <About />}
        ],
      },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "products", element: <ProductsAdmin /> },
        ],
      },
    ],
  },
]);