import LogFilters from "../components/LogFilters";
import LogTable from "../components/LogTable";

export default function Analytics() {
  return (
    <div className="m-4">
      <LogFilters />
      <LogTable />
    </div>
  );
}
