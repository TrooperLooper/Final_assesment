import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Delay scroll to after exit animation completes (0.5s transition)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Small delay to ensure smooth transition

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
