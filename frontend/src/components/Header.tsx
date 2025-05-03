import React, { useEffect, useState } from "react";

export default function Header() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(function () {
    setInterval(function () {
      const date = new Date();
      setNow(date);
    }, 1000);
  }, []);

  return (
    <header className="bg-gray-950 p-2 flex justify-between items-center">
      <h1 className="title text-xl uppercase">The Watcher</h1>
      <p>
        {now.toLocaleTimeString()} | {now.toDateString()}
      </p>
    </header>
  );
}
