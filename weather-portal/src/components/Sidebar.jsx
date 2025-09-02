import React from "react";
import {
  BarChart3,
  Shield,
  TrendingUp,
  Eye,
  Settings2,
  Database,
  FileText,
  HelpCircle,
} from "lucide-react";

const Sidebar = ({ activeTab, onTabChange, dataLoaded }) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      description: "Overview and key metrics",
    },
    {
      id: "quality",
      label: "Data Quality",
      icon: Shield,
      description: "Quality assessment and cleaning",
    },
    {
      id: "statistics",
      label: "Statistics",
      icon: TrendingUp,
      description: "Statistical analysis and metrics",
    },
    {
      id: "visualizations",
      label: "Visualizations",
      icon: Eye,
      description: "Charts and interactive plots",
    },
    {
      id: "processing",
      label: "Data Processing",
      icon: Settings2,
      description: "Data cleaning and transformation",
    },
  ];

  const additionalItems = [
    {
      id: "raw-data",
      label: "Raw Data",
      icon: Database,
      description: "View original dataset",
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      description: "Generate analysis reports",
    },
    {
      id: "help",
      label: "Help & Docs",
      icon: HelpCircle,
      description: "Documentation and support",
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Main Analysis
            </h2>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  disabled={!dataLoaded && item.id !== "dashboard"}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary-50 text-primary-700 border border-primary-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                    ${
                      !dataLoaded && item.id !== "dashboard"
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  `}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-primary-600" : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        isActive ? "text-primary-900" : "text-gray-900"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`text-xs ${
                        isActive ? "text-primary-600" : "text-gray-500"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Additional Tools
            </h2>
            {additionalItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  disabled={!dataLoaded && item.id !== "reports"}
                  className={`
                     w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200
                     text-gray-600 hover:bg-gray-50 hover:text-gray-900
                     ${
                       !dataLoaded && item.id !== "reports"
                         ? "opacity-50 cursor-not-allowed"
                         : "cursor-pointer"
                     }
                   `}
                >
                  <Icon className="h-5 w-5 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Data Status Card */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div
              className={`h-2 w-2 rounded-full ${
                dataLoaded ? "bg-green-400" : "bg-yellow-400"
              }`}
            ></div>
            <span className="text-xs font-medium text-gray-700">
              {dataLoaded ? "Data Ready" : "Loading..."}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {dataLoaded
              ? "ES607 dataset loaded and processed"
              : "Initializing weather data analysis..."}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
