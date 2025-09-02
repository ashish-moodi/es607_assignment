import React, { useState } from "react";
import {
  Settings2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Database,
  Filter,
  Zap,
  Shield,
  Download,
} from "lucide-react";

const ProcessingStep = ({ step, status, description, duration }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "running":
        return <div className="loading-spinner h-5 w-5"></div>;
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200";
      case "running":
        return "bg-blue-50 border-blue-200";
      case "error":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor(status)}`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon(status)}
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{step}</h4>
          <p className="text-sm text-gray-600">{description}</p>
          {duration && (
            <p className="text-xs text-gray-500 mt-1">Duration: {duration}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ProcessingMethod = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
  disabled,
}) => (
  <div
    className="card hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <div className="text-right">
        <button
          className={`btn-primary ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={disabled}
        >
          <Play className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

const DataProcessing = ({ onProcessData, loading }) => {
  const [processingSteps, setProcessingSteps] = useState([
    {
      step: "Data Validation",
      description: "Checking data integrity and format",
      status: "completed",
      duration: "0.5s",
    },
    {
      step: "Missing Data Detection",
      description: "Identifying gaps in time series",
      status: "completed",
      duration: "1.2s",
    },
    {
      step: "Outlier Detection",
      description: "Finding statistical outliers",
      status: "completed",
      duration: "2.1s",
    },
    {
      step: "Physical Consistency Check",
      description: "Validating meteorological relationships",
      status: "completed",
      duration: "0.8s",
    },
    {
      step: "Data Cleaning",
      description: "Applying cleaning algorithms",
      status: loading ? "running" : "pending",
      duration: loading ? "Processing..." : null,
    },
    {
      step: "Quality Assessment",
      description: "Calculating final quality metrics",
      status: "pending",
      duration: null,
    },
  ]);

  const processingMethods = [
    {
      title: "Complete Data Cleaning",
      description:
        "Apply all cleaning algorithms including missing data filling, outlier removal, and smoothing",
      icon: Shield,
      color: "bg-green-500",
      method: "complete",
    },
    {
      title: "Missing Data Interpolation",
      description:
        "Fill missing values using forward/backward fill and linear interpolation",
      icon: Database,
      color: "bg-blue-500",
      method: "interpolation",
    },
    {
      title: "Outlier Detection & Removal",
      description: "Identify and handle statistical outliers using IQR method",
      icon: Filter,
      color: "bg-yellow-500",
      method: "outliers",
    },
    {
      title: "Noise Reduction",
      description:
        "Apply Gaussian smoothing to reduce noise in wind and precipitation data",
      icon: Zap,
      color: "bg-purple-500",
      method: "smoothing",
    },
  ];

  const handleProcessData = (method) => {
    onProcessData(method);

    // Update processing steps
    setProcessingSteps((prev) =>
      prev.map((step, index) => {
        if (index === 4) {
          return { ...step, status: "running" };
        }
        if (index === 5) {
          return { ...step, status: "pending" };
        }
        return step;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Processing</h1>
          <p className="text-gray-600">
            Clean and transform your weather data for analysis
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Processed Data</span>
          </button>
        </div>
      </div>

      {/* Processing Methods */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Processing Methods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {processingMethods.map((method, index) => (
            <ProcessingMethod
              key={index}
              {...method}
              onClick={() => handleProcessData(method.method)}
              disabled={loading}
            />
          ))}
        </div>
      </div>

      {/* Processing Steps */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Processing Pipeline
        </h2>
        <div className="space-y-3">
          {processingSteps.map((step, index) => (
            <ProcessingStep key={index} {...step} />
          ))}
        </div>
      </div>

      {/* Processing Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Data Points Processed</p>
              <p className="text-2xl font-bold text-gray-900">17,544</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Issues Fixed</p>
              <p className="text-2xl font-bold text-gray-900">10,562</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Processing Time</p>
              <p className="text-2xl font-bold text-gray-900">4.6s</p>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Configuration */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Processing Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Missing Data Handling
            </h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="missing-data"
                  className="mr-2"
                  defaultChecked
                />
                <span className="text-sm">Forward/Backward Fill</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="missing-data" className="mr-2" />
                <span className="text-sm">Linear Interpolation</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="missing-data" className="mr-2" />
                <span className="text-sm">Spline Interpolation</span>
              </label>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Outlier Detection
            </h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="outlier-detection"
                  className="mr-2"
                  defaultChecked
                />
                <span className="text-sm">IQR Method (1.5x)</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="outlier-detection" className="mr-2" />
                <span className="text-sm">Z-Score Method (3σ)</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="outlier-detection" className="mr-2" />
                <span className="text-sm">Modified Z-Score</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Log */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Processing Log
        </h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
          <div>[2024-01-15 10:30:15] Starting data processing pipeline...</div>
          <div>
            [2024-01-15 10:30:16] Loading ES607 dataset (17,544 time steps)
          </div>
          <div>[2024-01-15 10:30:17] Validating data format and structure</div>
          <div>
            [2024-01-15 10:30:18] Detecting missing values: 12,368,520 found
          </div>
          <div>[2024-01-15 10:30:19] Identifying outliers using IQR method</div>
          <div>
            [2024-01-15 10:30:20] Checking physical consistency constraints
          </div>
          <div>
            [2024-01-15 10:30:21] Found 10,562 temperature-dewpoint
            inconsistencies
          </div>
          <div>
            [2024-01-15 10:30:22] Applying forward/backward fill for missing
            data
          </div>
          <div>[2024-01-15 10:30:23] Fixing physical inconsistencies</div>
          <div>
            [2024-01-15 10:30:24] Applying Gaussian smoothing (σ=2) to wind data
          </div>
          <div>
            [2024-01-15 10:30:25] Applying Gaussian smoothing (σ=2) to
            precipitation data
          </div>
          <div>[2024-01-15 10:30:26] Calculating final quality metrics</div>
          <div className="text-yellow-400">
            [2024-01-15 10:30:27] Processing completed successfully!
          </div>
          <div className="text-blue-400">
            [2024-01-15 10:30:28] Quality score improved from 65/100 to 85/100
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProcessing;
