import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectOnManual = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isManualNavigation = performance.getEntriesByType("navigation")[0]?.type === "navigate";
    const isOtpRoute = (location.pathname === "/otp" || location.pathname === "/ChangePassword" || location.pathname === "/register");

    if (isManualNavigation && isOtpRoute) {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default RedirectOnManual;
