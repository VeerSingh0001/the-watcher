import { useData } from "../contexts/DataContext";
import PieChartComponent from "./PieChartComponent";

export default function SeveritySig() {
  const { severitySigCount } = useData();

  if (severitySigCount)
    return (
      <PieChartComponent
        title="Severity Signature"
        data={severitySigCount}
        colors={[
          "oklch(72.3% 0.219 149.579)",
          "oklch(76.9% 0.188 70.08)",
          "oklch(63.7% 0.237 25.331)",
        ]}
      />
    );
  else <p>Loading...</p>;
}
