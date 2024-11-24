import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import BaseLayout from "../views/BaseLayout";
import ListCuisine from "../views/ListCuisinePage";
import ListCategories from "../views/ListCategories";
import AddCuisine from "../views/addCuisine";
import AddUser from "../views/AddUser";
import EditCuisine from "../views/edit";
import Toastify from "toastify-js";

const base_url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage base_url={base_url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#F87171",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black",
          },
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#F87171",
            color: "black",
            border: "solid #000000",
            borderRadius: "8px",
            boxShadow: "2px 2px black",
          },
        }).showToast();
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <ListCuisine base_url={base_url} />,
      },
      {
        path: "/categories",
        element: <ListCategories base_url={base_url} />,
      },
      {
        path: "/add",
        element: <AddCuisine base_url={base_url} />,
      },
      {
        path: "/edit/:id",
        element: <EditCuisine base_url={base_url} />,
      },
      {
        path: "/add-user",
        element: <AddUser base_url={base_url} />,
      },
    ],
  },
]);

export default router;
