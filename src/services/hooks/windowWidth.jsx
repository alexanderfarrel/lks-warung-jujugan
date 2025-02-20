import { useEffect, useState } from "react";

export default function useWindowWidth() {
  const isClient = typeof window === "object";
  const [windowWidth, setWindowWidth] = useState(
    isClient ? window.innerWidth : 0
  );

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  return windowWidth;
}
