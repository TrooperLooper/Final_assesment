import React, { useEffect, useState } from "react";

const TypedText: React.FC<{
  text?: string;
  speed?: number;
  className?: string;
}> = ({ text = "", speed = 30, className = "" }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const safeText = typeof text === "string" ? text : "";

    if (safeText.length === 0) return;

    const interval = setInterval(() => {
      if (i < safeText.length) {
        setDisplayed(safeText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayed}</span>;
};

export default TypedText;
