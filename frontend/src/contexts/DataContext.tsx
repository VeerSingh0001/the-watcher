import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface TypeContext {
  isLoading: boolean;
  networkMetrics: NetworkMetric[] | undefined;

  totalPackets: number | undefined;
  alerts: number | undefined;
  vaild: number | undefined;
  severityCount: { name: string; value: number }[] | undefined;
  severitySigCount: { name: string; value: number }[] | undefined;
  alertCat: AlertCategoryData[] | undefined;
  alertSig: AlertCategoryData[] | undefined;
  ipCounts: string[] | undefined;
}

interface NetworkMetric {
  hour: string;
  packets: number;
}

type AlertCategoryData = {
  category: string;
  count: number;
};

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
  const [severityCount, setSeverityCount] =
    useState<{ name: string; value: number }[]>();
  const [severitySigCount, setSeveritySigCount] =
    useState<{ name: string; value: number }[]>();
  const [alertCat, setAlertCat] = useState<AlertCategoryData[]>();
  const [alertSig, setAlertSig] = useState<AlertCategoryData[]>();
  const [ipCounts, setIpCounts] = useState<string[]>();

  useEffect(function () {
    async function loadDashboardData() {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/dashboard");

        if (response.status !== 200) throw new Error("something wen't wrong");

        setTotalPackets(response.data.Data.Counts.total);
        setAlerts(response.data.Data.Counts.alerts);
        setValid(response.data.Data.Counts.safe);

        setNetwordMetrics(
          Object.entries(response.data.Data.timestamp).map(
            ([hour, packets]) => ({
              hour,
              packets,
            })
          )! as NetworkMetric[]
        );

        setSeverityCount([
          { name: "Safe", value: response.data.Data.severity_count[0]["1"] },
          { name: "Warm", value: response.data.Data.severity_count[1]["2"] },
          { name: "Danger", value: response.data.Data.severity_count[2]["3"] },
        ]);

        setSeveritySigCount([
          {
            name: "Informational",
            value: response.data.Data.signature_sev[0]["Informational"],
          },
          {
            name: "Major",
            value: response.data.Data.signature_sev[1]["Major"],
          },
          {
            name: "Minor",
            value: response.data.Data.signature_sev[2]["Minor"],
          },
        ]);

        setAlertCat(formatAlertCountData(response.data.Data.alert_cat_count));
        setAlertSig(formatAlertCountData(response.data.Data.alert_sig_count));

        setIpCounts(
          response.data.Data.ip_counts.reduce((acc: any, obj: any) => {
            for (const [ip, count] of Object.entries(obj)) {
              acc[ip] = (acc[ip] || 0) + count;
            }
            return acc;
          }, {})
        );

        setIsLoading(false);
      } catch (error) {
        throw error;
      }
    }
    loadDashboardData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        totalPackets,
        alerts,
        vaild,
        isLoading,
        networkMetrics,
        severityCount,
        alertCat,
        alertSig,
        ipCounts,
        severitySigCount,
      }}
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

type InputData = { [key: string]: number };
type OutputData = { category: string; count: number };

// Function to transform the input data to the desired format dynamically
function formatAlertCountData(input: InputData[]): OutputData[] {
  // Create a result map to accumulate counts by category
  const resultMap: { [category: string]: number } = {};

  // Loop through the input data
  input.forEach((item) => {
    // Extract category and count from the object
    const [categoryKey, count] = Object.entries(item)[0];

    // Use the categoryKey directly as the category
    if (resultMap[categoryKey]) {
      resultMap[categoryKey] += count;
    } else {
      resultMap[categoryKey] = count;
    }
  });

  // Convert the resultMap to an array of objects
  const output: OutputData[] = Object.entries(resultMap).map(
    ([category, count]) => ({
      category: category.length < 10 ? category : `${category.slice(0, 10)}...`,
      count,
    })
  );

  return output;
}
