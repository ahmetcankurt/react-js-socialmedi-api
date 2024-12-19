import { Routes, Route } from "react-router-dom";
import Profile from "../pages/profile";
import Home from "../homepage";
import Login from "../login";
import PrivateRoute from "./PrivateRoute";
import UserList from "../user/UserList";
import SidebarTopbar from "../components/SidebarTopbar";
import ScrollToTop from "../components/ScrollToTop";

const AppRouter = () => {
  const routes = [
    { path: "/", element: <Home />, private: true },
    { path: "/login", element: <Login />, private: false },
    { path: "/profile/:userId", element: <Profile />, private: true },
    { path: "/users", element: <UserList />, private: true },
    { path: "*", element: <div>404 Not Found</div>, private: false },
  ];

  return (
    <Routes>
      {routes.map(({ path, element, private: isPrivate }, index) => {
        const content = isPrivate ? (
          <SidebarTopbar>
            <ScrollToTop />
            <PrivateRoute element={element} />
          </SidebarTopbar>
        ) : (
          element
        );

        return <Route key={index} path={path} element={content} />;
      })}
    </Routes>
  );
};

export default AppRouter;
