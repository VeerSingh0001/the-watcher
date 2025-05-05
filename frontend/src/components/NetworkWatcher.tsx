import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useData } from "../contexts/DataContext";

export default function NetworkWatcher() {
  const { networkMetrics } = useData();
  return (
    <div className=" w-full h-50 bg-gray-900 p-2">
      <h3 style={{ margin: 0, color: "#fff" }}>Network Traffic</h3>
      <p style={{ margin: "0 0 1rem 0", color: "#aaa", fontSize: ".8rem" }}>
        Active Packets Per Hour
      </p>
      <ResponsiveContainer height={140}>
        <BarChart
          data={networkMetrics}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          barCategoryGap={0}
          barGap={0}
        >
          <XAxis dataKey="hour" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(21% 0.034 264.665)",
              border: "1px solid #fff",
            }}
            itemStyle={{ color: "#fff" }}
          />
          <Bar dataKey="packets" fill="oklch(27.8% 0.033 256.848)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
