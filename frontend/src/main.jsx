import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/Routes.jsx";

import "./stylesheets/defaults.css";
import "./stylesheets/animations.css";
import "./stylesheets/components.css";
import "./stylesheets/colors.css";

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);