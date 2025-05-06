import BarChartComponent from "../components/BarChartComponent";
import BoxPreview from "../components/BoxPreview";
import NetworkWatcher from "../components/NetworkWatcher";
import PieChartComponent from "../components/PieChartComponent";

export default function Home() {
  return (
    <div className="p-2">
      <div className="flex gap-2">
        <BoxPreview />
        {/* <BarChartComponent /> */}
        <NetworkWatcher />
      </div>
      <div className="flex gap-2 justify-between">
        <PieChartComponent />
        <PieChartComponent />
        <PieChartComponent />
        <PieChartComponent />
      </div>
    </div>
  );
}
