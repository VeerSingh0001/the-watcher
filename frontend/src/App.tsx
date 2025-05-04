import BarChartComponent from "./components/BarChartComponent";
import BarChart from "./components/BarChartComponent";
import BoxPreview from "./components/BoxPreview";
import Header from "./components/Header";
import LogTable from "./components/LogTable";
import PieChartComponent from "./components/PieChartComponent";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="body p-2">
        <div className="flex">
          <BoxPreview />
          <BarChartComponent />
        </div>
        <div className="container flex gap-10">
          <div className="charts flex-row gap-10">
            <div className="flex gap-3">
              <PieChartComponent />
              <PieChartComponent />
            </div>
            <div className="flex gap-3">
              <PieChartComponent />
              <PieChartComponent />
            </div>
          </div>
          <LogTable />
        </div>
      </div>
    </div>
  );
}

export default App;
