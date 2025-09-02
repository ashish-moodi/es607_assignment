import React, { useState } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Settings,
  Download,
} from "lucide-react";

const QualityMetric = ({
  title,
  before,
  after,
  unit,
  improvement,
  color = "green",
}) => {
  const isImprovement = improvement > 0;
  const changePercent = Math.abs(improvement);

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <div
          className={`flex items-center space-x-1 ${
            isImprovement ? "text-green-600" : "text-red-600"
          }`}
        >
          {isImprovement ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            {isImprovement ? "+" : "-"}
            {changePercent.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Before</span>
          <span className="font-medium">
            {before} {unit}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">After</span>
          <span className="font-medium text-green-600">
            {after} {unit}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              color === "green"
                ? "bg-green-500"
                : color === "blue"
                ? "bg-blue-500"
                : color === "red"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
            style={{ width: `${Math.min(100, (after / before) * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const IssueCard = ({ issue, onFix }) => (
  <div className="card">
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        {issue.severity === "high" ? (
          <AlertTriangle className="h-5 w-5 text-red-500" />
        ) : issue.severity === "medium" ? (
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        ) : (
          <CheckCircle className="h-5 w-5 text-green-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900">{issue.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
        <div className="mt-2 flex items-center space-x-4">
          <span className="text-xs text-gray-500">
            {issue.count.toLocaleString()} occurrences
          </span>
          <span className="text-xs text-gray-500">
            {issue.percentage.toFixed(2)}% of data
          </span>
        </div>
        {issue.status === "fixed" && (
          <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Fixed
          </div>
        )}
      </div>
    </div>
  </div>
);

const DataQuality = ({ dataQuality, onProcessData, loading }) => {
  const [selectedMetric, setSelectedMetric] = useState("overall");

  const qualityMetrics = [
    {
      id: "overall",
      title: "Overall Quality Score",
      before: 65,
      after: dataQuality?.score || 85,
      unit: "/100",
      improvement: (dataQuality?.score || 85) - 65,
      color: "green",
    },
    {
      id: "missing",
      title: "Missing Data",
      before: 10.91,
      after: 0,
      unit: "%",
      improvement: 10.91,
      color: "green",
    },
    {
      id: "variability",
      title: "Data Variability",
      before: 308.6,
      after: 45.2,
      unit: "% CV",
      improvement: 263.4,
      color: "blue",
    },
    {
      id: "consistency",
      title: "Physical Consistency",
      before: 99.99,
      after: 100,
      unit: "%",
      improvement: 0.01,
      color: "green",
    },
  ];

  const issues = [
    {
      title: "Temperature-Dewpoint Inconsistencies",
      description:
        "Points where dewpoint temperature exceeds air temperature (physically impossible)",
      count: 10562,
      percentage: 0.01,
      severity: "high",
      status: "fixed",
    },
    {
      title: "Missing Data Points",
      description:
        "Gaps in time series data due to sensor failures or data transmission issues",
      count: 12368520,
      percentage: 10.91,
      severity: "high",
      status: "fixed",
    },
    {
      title: "High Variability in Wind Data",
      description:
        "Excessive noise in wind speed measurements indicating potential sensor issues",
      count: 0,
      percentage: 0,
      severity: "medium",
      status: "fixed",
    },
    {
      title: "Outlier Values",
      description:
        "Extreme values that may indicate measurement errors or unusual weather events",
      count: 1250,
      percentage: 0.7,
      severity: "low",
      status: "identified",
    },
  ];

  const handleCleanData = () => {
    onProcessData("clean");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Data Quality Assessment
          </h1>
          <p className="text-gray-600">
            Comprehensive analysis and improvement of weather data quality
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <button
            onClick={handleCleanData}
            disabled={loading}
            className="btn-primary flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Processing..." : "Clean Data"}</span>
          </button>
        </div>
      </div>

      {/* Quality Score Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Quality Improvement Summary
          </h2>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-gray-600">
              Score: {dataQuality?.score || 85}/100
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {qualityMetrics.map((metric) => (
            <QualityMetric key={metric.id} {...metric} />
          ))}
        </div>
      </div>

      {/* Issues and Fixes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Issues Identified & Fixed
          </h3>
          <div className="space-y-4">
            {issues.map((issue, index) => (
              <IssueCard key={index} issue={issue} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quality Metrics
          </h3>
          <div className="space-y-4">
            <div className="card">
              <h4 className="font-medium text-gray-900 mb-3">
                Data Completeness
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Before</span>
                  <span className="text-red-600">89.09%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">After</span>
                  <span className="text-green-600">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="card">
              <h4 className="font-medium text-gray-900 mb-3">
                Physical Consistency
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Before</span>
                  <span className="text-yellow-600">99.99%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">After</span>
                  <span className="text-green-600">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="card">
              <h4 className="font-medium text-gray-900 mb-3">
                Data Smoothness
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Before</span>
                  <span className="text-red-600">High Noise</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">After</span>
                  <span className="text-green-600">Smooth</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Status */}
      {loading && (
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="loading-spinner"></div>
            <div>
              <h4 className="font-medium text-gray-900">Processing Data...</h4>
              <p className="text-sm text-gray-600">
                Applying cleaning algorithms and quality improvements
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataQuality;
