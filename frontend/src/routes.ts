import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home/Home";
import ApplyPage from "./Apply/Apply";
import Results from "./pages/Results/results";
import About from "./pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "apply", Component: ApplyPage },
      { path: "results", Component: Results },
      { path: "about", Component: About },
    ],
  },
]);
