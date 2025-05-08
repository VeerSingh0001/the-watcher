import HorBar from "./HorBar";
import { useData } from "../contexts/DataContext";

export default function AlertSig() {
  const { alertSig: data } = useData();
  return (
    <HorBar
      data={data}
      color="oklch(42.4% 0.199 265.638)"
      title="Alert Signature"
    />
  );
}
