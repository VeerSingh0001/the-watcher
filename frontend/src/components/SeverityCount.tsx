import { useData } from "../contexts/DataContext";
import PieChartComponent from "./PieChartComponent";

export default function SeverityCount() {
  const { severityCount } = useData();

  if (severityCount)
    return (
      <PieChartComponent
        title="Severity Count"
        data={severityCount}
        colors={[
          "oklch(72.3% 0.219 149.579)",
          "oklch(76.9% 0.188 70.08)",
          "oklch(63.7% 0.237 25.331)",
        ]}
      />
    );
  else <p>Loading...</p>;
}
