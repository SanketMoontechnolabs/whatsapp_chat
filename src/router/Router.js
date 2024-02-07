// ** Router imports
import { useRoutes, Navigate } from "react-router-dom";

import { store } from "../redux/store";
import { lazy } from "react";




const Login = lazy(() => import("../views/authentication/Login"));
const Register = lazy(() => import("../views/authentication/Register"));
const ForgotPassword = lazy(() => import("../views/authentication/ForgotPassword"));

import Dashboard from "../views/dashboard/Dashboard";
import Email from "../views/email/Email";
import Whatsapp from "../views/Chats/Whatsapp";





const Router = () => {
  const getHomeRoute = () => {
    const token = store.getState().AuthReducer.token;

    if (token) {
      return "/dashboard";
    } else {
      return "/login";
    }
  };


  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    {
      path: "/dashboard",
      index: true,
      element: <Dashboard  />,
    },
    {
      path: "/whatsapp",
      index: true,
      element: <Whatsapp  />,
    },
    {
      path: "/email",
      index: true,
      element: <Email  />,
    },
    {
      path: "/login",

      element: <Login />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/register",
      element: <Register />,
      meta: {
        layout: "blank",
      },
    },
  ]);

  return routes;
};

export default Router;
