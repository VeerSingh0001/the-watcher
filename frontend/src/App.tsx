import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import { useData } from "./contexts/DataContext";
import Loading from "./components/Loading";

function App() {
  const { isLoading } = useData();
  return (
    <div className="app">
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
