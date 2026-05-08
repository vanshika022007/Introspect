// components/session/Timer.jsx
import { useState, useEffect } from "react";

export default function Timer({ running }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-1.5 text-violet-600 font-mono font-semibold text-sm">
      <span>⏱</span>
      <span>{mm}:{ss}</span>
    </div>
  );
}