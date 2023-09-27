import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Navigationbar from "../components/Navigationbar";
import Company from "../pages/Company";
import Profile from "../pages/Profile";
import Person from "../pages/Person";
const routes = () => {
  const { user } = useSelector((state: any) => state?.user);

  const MainLayout = () => {
    return (
      <div className="">
        <Navigationbar />
        <Outlet />
      </div>
    );
  };

  return [
    {
      path: "/",
      element: user ? <MainLayout /> : <Navigate to={"/register"} />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/companies",
          element: <Company />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/persons",
          element: <Person />,
        },
      ],
    },
    { path: "/login", element: !user ? <Login /> : <Navigate to={"/"} /> },
    {
      path: "/register",
      element: !user ? <Register /> : <Navigate to={"/"} />,
    },
  ];
};
export default routes;
