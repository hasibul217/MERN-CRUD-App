import { useState } from "react";

import "./App.css";
import User from "./getUser/User";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import AddUser from "./adduser/AddUser";
import UpdateUser from "./UpdateUser/UpdateUser";

function App() {
  const routerConnect = createBrowserRouter([
    {
      path: "/",
      element: <User/>,
    },
    {
      path: "/add",
      element: <AddUser/>,
    },
    {
      path: "/update/:id",
      element: <UpdateUser/>,
    }
  ]);

  return (
    <>
      <RouterProvider router={routerConnect} />
    </>
  );
}

export default App;
