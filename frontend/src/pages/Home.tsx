// import BarChartComponent from "../components/BarChartComponent";
import AlertCat from "../components/AlertCat";
import AlertSig from "../components/AlertSig";
import BoxPreview from "../components/BoxPreview";
import IPCount from "../components/IPCount";
import NetworkWatcher from "../components/NetworkWatcher";
import SeverityCount from "../components/SeverityCount";
import SeveritySig from "../components/SeveritySig";

export default function Home() {
  return (
    <div className="p-2">
      <div className="flex gap-2">
        <BoxPreview />
        {/* <BarChartComponent /> */}
        <SeverityCount />
        <SeveritySig />
        <NetworkWatcher />
      </div>
      <div className="flex justify-between mt-10">
        <AlertCat />
        <AlertSig />
        <IPCount
          ips={[
            "192.168.1.1",
            "10.0.0.1",
            "192.168.1.1",
            "10.0.0.2",
            "10.0.0.1",
            "10.0.0.1",
            "192.168.1.2",
          ]}
        />
      </div>
    </div>
  );
}
