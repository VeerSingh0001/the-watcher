import { useData } from "../contexts/DataContext";
import HorBar from "./HorBar";

const AlertCat: React.FC = () => {
  const { alertCat: data } = useData();

  return (
    <HorBar
      data={data}
      color="oklch(54.1% 0.281 293.009)"
      title="Alert Categories"
    />
  );
};

export default AlertCat;
