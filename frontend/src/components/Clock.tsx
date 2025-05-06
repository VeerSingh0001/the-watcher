import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(function () {
    setInterval(function () {
      const date = new Date();
      setNow(date);
    }, 1000);
  }, []);

  return (
    <p>
      {now.toLocaleTimeString()} | {now.toDateString()}
    </p>
  );
}
