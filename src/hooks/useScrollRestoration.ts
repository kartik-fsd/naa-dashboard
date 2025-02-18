import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useScrollRestoration = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if content is fully loaded
    if (document.readyState === "complete") {
      container.scrollTop = 0;
    } else {
      // Wait for content to load
      window.addEventListener(
        "load",
        () => {
          container.scrollTop = 0;
        },
        { once: true }
      );
    }
  }, [pathname]);

  return containerRef;
};
