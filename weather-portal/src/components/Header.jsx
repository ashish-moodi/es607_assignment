import React from "react";
import {
  Cloud,
  RefreshCw,
  Download,
  Upload,
  Settings,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const Header = ({ dataLoaded, loading, onRefresh }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  ES607 Weather Data Portal
                </h1>
                <p className="text-sm text-gray-500">
                  Interactive Weather Data Analysis & Visualization
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Data Status */}
            <div className="flex items-center space-x-2">
              {dataLoaded ? (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Data Loaded</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-yellow-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Loading Data...</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onRefresh}
                disabled={loading}
                className="btn-secondary flex items-center space-x-1"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>

              <button className="btn-secondary flex items-center space-x-1">
                <Upload className="h-4 w-4" />
                <span>Import</span>
              </button>

              <button className="btn-primary flex items-center space-x-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>

              <button className="btn-secondary">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {loading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Processing data...</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
