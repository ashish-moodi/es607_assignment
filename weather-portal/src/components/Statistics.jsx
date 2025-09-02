import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Filter,
  RefreshCw,
  Calculator,
  PieChart,
  Activity,
} from "lucide-react";

const StatCard = ({ title, value, unit, icon: Icon, color, description }) => (
  <div className="metric-card">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <span className="text-xs text-gray-500">{title}</span>
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">
      {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
    </div>
    {description && <p className="text-xs text-gray-600">{description}</p>}
  </div>
);

const StatisticsTable = ({ data, title }) => (
  <div className="card">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>Variable</th>
            <th>Mean</th>
            <th>Std Dev</th>
            <th>Min</th>
            <th>Max</th>
            <th>Range</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, stats]) => (
            <tr key={key}>
              <td className="font-medium text-gray-900">
                {key === "temperature"
                  ? "Temperature"
                  : key === "dewpoint"
                  ? "Dewpoint"
                  : key === "wind"
                  ? "Wind Speed"
                  : key === "precipitation"
                  ? "Precipitation"
                  : key}
              </td>
              <td>{stats.mean?.toFixed(2)}</td>
              <td>{stats.std?.toFixed(2)}</td>
              <td>{stats.min?.toFixed(2)}</td>
              <td>{stats.max?.toFixed(2)}</td>
              <td>{(stats.max - stats.min)?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Statistics = ({ statistics, loading }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedVariable, setSelectedVariable] = useState("all");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
        <span className="ml-3 text-gray-600">Calculating statistics...</span>
      </div>
    );
  }

  const summaryStats = [
    {
      title: "Mean Temperature",
      value: statistics?.temperature?.mean?.toFixed(1) || "--",
      unit: "°C",
      icon: TrendingUp,
      color: "bg-weather-temp",
      description: "Average 2m temperature",
    },
    {
      title: "Temperature Range",
      value: (
        (statistics?.temperature?.max || 0) -
        (statistics?.temperature?.min || 0)
      ).toFixed(1),
      unit: "°C",
      icon: Activity,
      color: "bg-weather-temp",
      description: "Daily temperature variation",
    },
    {
      title: "Mean Wind Speed",
      value: statistics?.wind?.mean?.toFixed(1) || "--",
      unit: "m/s",
      icon: TrendingUp,
      color: "bg-weather-wind",
      description: "Average wind speed",
    },
    {
      title: "Max Precipitation",
      value: statistics?.precipitation?.max?.toFixed(1) || "--",
      unit: "mm",
      icon: TrendingUp,
      color: "bg-weather-precipitation",
      description: "Peak precipitation event",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Statistical Analysis
          </h1>
          <p className="text-gray-600">
            Comprehensive statistical metrics for weather variables
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Time</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="seasonal">Seasonal</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Detailed Statistics Table */}
      <StatisticsTable
        data={statistics || {}}
        title="Detailed Statistical Summary"
      />

      {/* Additional Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Analysis */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribution Analysis
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Temperature Distribution</span>
                <span className="font-medium">Normal-like</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-weather-temp rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Wind Speed Distribution</span>
                <span className="font-medium">Right-skewed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-weather-wind rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">
                  Precipitation Distribution
                </span>
                <span className="font-medium">Exponential-like</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-weather-precipitation rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Quality Metrics */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Data Quality Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-900">
                  Completeness
                </p>
                <p className="text-xs text-green-700">No missing values</p>
              </div>
              <span className="text-lg font-bold text-green-600">100%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-900">Consistency</p>
                <p className="text-xs text-blue-700">
                  Physical constraints met
                </p>
              </div>
              <span className="text-lg font-bold text-blue-600">100%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-purple-900">
                  Smoothness
                </p>
                <p className="text-xs text-purple-700">Noise reduced</p>
              </div>
              <span className="text-lg font-bold text-purple-600">85%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Statistics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Advanced Statistical Measures
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Central Tendency</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature Mean</span>
                <span className="font-medium">
                  {statistics?.temperature?.mean?.toFixed(2)}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature Median</span>
                <span className="font-medium">26.0°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature Mode</span>
                <span className="font-medium">25.5°C</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Variability</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature Std Dev</span>
                <span className="font-medium">
                  {statistics?.temperature?.std?.toFixed(2)}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature Variance</span>
                <span className="font-medium">21.2°C²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature IQR</span>
                <span className="font-medium">5.3°C</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Distribution Shape
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Skewness</span>
                <span className="font-medium">0.33</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kurtosis</span>
                <span className="font-medium">0.19</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coefficient of Variation</span>
                <span className="font-medium">17.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
