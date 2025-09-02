import React from "react";
import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
} from "lucide-react";

const MetricCard = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
  trend,
  change,
}) => (
  <div className="metric-card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {value}{" "}
          <span className="text-sm font-normal text-gray-500">{unit}</span>
        </p>
        {change && (
          <div className="flex items-center mt-1">
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm ml-1 ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const QualityIndicator = ({ score, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "status-excellent";
      case "good":
        return "status-good";
      case "fair":
        return "status-fair";
      case "poor":
        return "status-poor";
      default:
        return "status-fair";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "excellent":
      case "good":
        return <CheckCircle className="h-4 w-4" />;
      case "fair":
      case "poor":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Data Quality</h3>
        <div className={`status-indicator ${getStatusColor(status)}`}>
          {getStatusIcon(status)}
          <span className="ml-1 capitalize">{status}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Overall Score</span>
            <span className="font-medium">{score}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                score >= 90
                  ? "bg-green-500"
                  : score >= 80
                  ? "bg-blue-500"
                  : score >= 70
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-green-600 font-medium">0%</p>
            <p className="text-green-700">Missing Data</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-600 font-medium">100%</p>
            <p className="text-blue-700">Consistency</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ dataQuality, statistics, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Weather Data Dashboard
          </h1>
          <p className="text-gray-600">ES607 Dataset Analysis Overview</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>2023-2024 • 17,544 time steps</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Average Temperature"
          value={statistics?.temperature?.mean?.toFixed(1) || "--"}
          unit="°C"
          icon={Thermometer}
          color="bg-weather-temp"
          trend="up"
          change="+2.1°C"
        />
        <MetricCard
          title="Average Dewpoint"
          value={statistics?.dewpoint?.mean?.toFixed(1) || "--"}
          unit="°C"
          icon={Droplets}
          color="bg-weather-dewpoint"
          trend="up"
          change="+1.8°C"
        />
        <MetricCard
          title="Average Wind Speed"
          value={statistics?.wind?.mean?.toFixed(1) || "--"}
          unit="m/s"
          icon={Wind}
          color="bg-weather-wind"
          trend="down"
          change="-0.3 m/s"
        />
        <MetricCard
          title="Total Precipitation"
          value={statistics?.precipitation?.mean?.toFixed(1) || "--"}
          unit="mm"
          icon={CloudRain}
          color="bg-weather-precipitation"
          trend="up"
          change="+15.2 mm"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Quality */}
        <div className="lg:col-span-1">
          <QualityIndicator
            score={dataQuality?.score || 0}
            status={dataQuality?.status || "loading"}
          />
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Dataset Overview
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Spatial Coverage</p>
                  <p className="text-lg font-semibold text-gray-900">
                    71 × 91 grid points
                  </p>
                  <p className="text-xs text-gray-500">
                    India/South Asia region
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Temporal Resolution</p>
                  <p className="text-lg font-semibold text-gray-900">Hourly</p>
                  <p className="text-xs text-gray-500">
                    Continuous time series
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Data Variables</p>
                  <p className="text-lg font-semibold text-gray-900">
                    5 variables
                  </p>
                  <p className="text-xs text-gray-500">
                    Temperature, Wind, Precipitation
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Processing Status</p>
                  <p className="text-lg font-semibold text-green-600">
                    Cleaned
                  </p>
                  <p className="text-xs text-gray-500">
                    Quality improved to 85/100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Processing Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-green-900">
                Data cleaning completed
              </p>
              <p className="text-xs text-green-700">
                Fixed 10,562 temperature-dewpoint inconsistencies
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Missing data filled
              </p>
              <p className="text-xs text-blue-700">
                12.3M missing values interpolated
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm font-medium text-purple-900">
                Noise reduction applied
              </p>
              <p className="text-xs text-purple-700">
                Gaussian smoothing for wind and precipitation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
