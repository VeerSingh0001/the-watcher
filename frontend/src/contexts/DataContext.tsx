import { createContext, useContext, useEffect, useState } from "react";

interface TypeContext {
  isLoading: boolean;
  networkMetrics: NetworkMetric[] | undefined;

  totalPackets: number | undefined;
  alerts: number | undefined;
  vaild: number | undefined;
}

interface NetworkMetric {
  hour: string;
  packets: number;
}

const DataContext = createContext<TypeContext | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}
export default function DataProvider(props: Readonly<Props>) {
  const [isLoading, setIsLoading] = useState(true);
  const [networkMetrics, setNetwordMetrics] = useState<NetworkMetric[]>();
  const [totalPackets, setTotalPackets] = useState<number>();
  const [alerts, setAlerts] = useState<number>();
  const [vaild, setValid] = useState<number>();

  useEffect(function () {
    setIsLoading(true);
    setTimeout(function () {
      setTotalPackets(1000);
      setAlerts(700);
      setValid(300);

      setNetwordMetrics([
        { hour: "00:00", packets: 120 },
        { hour: "01:00", packets: 98 },
        { hour: "02:00", packets: 87 },
        { hour: "03:00", packets: 76 },
        { hour: "04:00", packets: 95 },
        { hour: "05:00", packets: 110 },
        { hour: "06:00", packets: 150 },
        { hour: "07:00", packets: 180 },
        { hour: "08:00", packets: 210 },
        { hour: "09:00", packets: 240 },
        { hour: "10:00", packets: 230 },
        { hour: "11:00", packets: 200 },
      ]);

      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <DataContext.Provider
      value={{ totalPackets, alerts, vaild, isLoading, networkMetrics }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useData context must be use inside DataProvider");

  return context;
}
