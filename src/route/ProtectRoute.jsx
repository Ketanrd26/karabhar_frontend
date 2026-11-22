import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, validPaths }) => {
  const location = useLocation();

  const publicRoutes = ["/login", "/register","/forgotpassemail"];

  if (
    !validPaths.includes(location.pathname) &&
    !publicRoutes.includes(location.pathname)
  ) {
    return <Navigate to="/404" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
