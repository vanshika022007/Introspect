import { useEffect, useState } from "react";

export default function Timer({ duration = 30, onEnd }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  return (
    <div className="text-sm font-semibold text-gray-600">
      ⏱ {min}:{sec < 10 ? "0" : ""}{sec}
    </div>
  );
}