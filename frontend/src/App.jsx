import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CargarClientes from "./pages/CargarClientes";
import Home from "./pages/Home";
import Root from "./routes/root";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditClient from "./pages/EditClient";
import Protected from "./pages/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/clientes", element: <CargarClientes /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/clientes/:id", element: <EditClient /> },
      { path: "/protected", element: <Protected />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
