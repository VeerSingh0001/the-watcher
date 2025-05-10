import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface TypeLogContext {
  category: "alerts" | "flows" | "stats";
  data?: TypeData[];
  setCategory?: React.Dispatch<
    React.SetStateAction<"alerts" | "flows" | "stats">
  >;
  loadMore?: () => void;
}

interface TypeData {
  id: number;
  src_ip: string;
  src_port: number;
  dest_ip: string;
  dest_port: string;
  timestamp: string;
  proto: string;
  alert_category: string;
  alert_severity: number;
  flow_alerted: string;
  flow_start: string;
  flow_end: string;
}

const LogContext = createContext<TypeLogContext>({
  category: "alerts",
});

export default function LogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [category, setCategory] = useState<"alerts" | "flows" | "stats">(
    "alerts"
  );
  const [data, setData] = useState<TypeData[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  function loadMore() {
    setCurrentPage((value) => value + 1);
  }

  useEffect(
    function () {
      setCurrentPage(1);
      setData(undefined);
    },
    [category]
  );

  useEffect(
    function () {
      async function loadData() {
        const response = await axios.get(
          `http://localhost:5000/api/analytics?page=${currentPage}&per_page=50`
        );

        console.log(response.data.data[category]);

        setData((current) =>
          current
            ? [...current, ...response.data.data[category]]
            : response.data.data[category]
        );
      }
      loadData();
    },
    [currentPage, category]
  );

  return (
    <LogContext.Provider value={{ category, setCategory, loadMore, data }}>
      {children}
    </LogContext.Provider>
  );
}

export function useLogs() {
  const context = useContext(LogContext);
  if (context === undefined)
    throw new Error("useLogs hook must be used inside LogProvider");

  return context;
}
