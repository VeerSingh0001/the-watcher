import { useData } from "../contexts/DataContext";

export default function BoxPreview() {
  const { totalPackets, alerts, vaild } = useData();
  return (
    <div className="w-80 p-2">
      <div className="py-2 text-center">
        <h4 className="font-bold text-base">Total</h4>
        <p className="text-2xl p-2">{totalPackets}</p>
      </div>
      <div className="flex">
        <div className="py-2 flex-1/2 bg-green-700 flex-row text-center ">
          <h4 className="font-bold text-xs">Valid</h4>
          <p className="text-2xl p-2">{vaild}</p>
        </div>
        <div className="py-2 flex-1/2 bg-red-700 flex-row text-center ">
          <h4 className="font-bold text-xs">Alerts</h4>
          <p className="text-2xl p-2">{alerts}</p>
        </div>
      </div>
    </div>
  );
}
