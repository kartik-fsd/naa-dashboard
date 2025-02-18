import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]); // Ensure this effect runs on route changes

  return <>{children}</>; // Ensure children are correctly rendered
};

export default Wrapper;
