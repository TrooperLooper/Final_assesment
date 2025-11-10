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
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + (safeText[i] ?? ""));
      i++;
      if (i >= safeText.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayed}</span>;
};

export default TypedText;
