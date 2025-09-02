import React, { useState, useEffect } from "react";
import {
  Cloud,
  Thermometer,
  Wind,
  Droplets,
  BarChart3,
  Settings,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import DataQuality from "./components/DataQuality";
import Statistics from "./components/Statistics";
import Visualizations from "./components/Visualizations";
import DataProcessing from "./components/DataProcessing";
import Reports from "./components/Reports";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataQuality, setDataQuality] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [rawData, setRawData] = useState(null);
  const [cleanedData, setCleanedData] = useState(null);

  // Mock data loading simulation
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate data loading
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock data quality results
      setDataQuality({
        score: 85,
        status: "good",
        issues: [
          { type: "missing_data", count: 0, percentage: 0 },
          { type: "outliers", count: 1250, percentage: 0.7 },
          { type: "inconsistencies", count: 0, percentage: 0 },
        ],
        improvements: {
          missingData: { before: 10.91, after: 0 },
          variability: { before: 308.6, after: 45.2 },
          consistency: { before: 99.99, after: 100 },
        },
      });

      // Mock statistics
      setStatistics({
        temperature: { mean: 26.4, std: 4.6, min: 13.3, max: 40.5 },
        dewpoint: { mean: 17.3, std: 4.7, min: 1.7, max: 24.4 },
        wind: { mean: 2.1, std: 1.8, min: 0.0, max: 14.5 },
        precipitation: { mean: 0.8, std: 2.9, min: 0.0, max: 332.1 },
      });

      setDataLoaded(true);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleDataProcessing = async (processingType) => {
    setLoading(true);
    // Simulate data processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update data quality after processing
    if (processingType === "clean") {
      setDataQuality((prev) => ({
        ...prev,
        score: 92,
        status: "excellent",
      }));
    }

    setLoading(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            dataQuality={dataQuality}
            statistics={statistics}
            loading={loading}
          />
        );
      case "quality":
        return (
          <DataQuality
            dataQuality={dataQuality}
            onProcessData={handleDataProcessing}
            loading={loading}
          />
        );
      case "statistics":
        return <Statistics statistics={statistics} loading={loading} />;
      case "visualizations":
        return (
          <Visualizations data={cleanedData || rawData} loading={loading} />
        );
      case "processing":
        return (
          <DataProcessing
            onProcessData={handleDataProcessing}
            loading={loading}
          />
        );
      case "reports":
        return <Reports />;
      default:
        return (
          <Dashboard
            dataQuality={dataQuality}
            statistics={statistics}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        dataLoaded={dataLoaded}
        loading={loading}
        onRefresh={() => window.location.reload()}
      />

      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          dataLoaded={dataLoaded}
        />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
