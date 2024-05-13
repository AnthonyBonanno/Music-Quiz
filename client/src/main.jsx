import ReactDOM from "react-dom/client";
// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

// Bringing in the pages the router will use to conditionally show the appropriate views
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import Question from "./pages/Question";
import CreateQuiz from "./pages/CreateQuiz";

// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/Quiz",
        element: <Quiz />,
      },
      {
        path: "/Question",
        element: <Question />,
      },
      {
        path: "/CreateQuiz",
        element: <CreateQuiz />,
      },
    ],
  },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
