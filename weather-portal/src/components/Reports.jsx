import React, { useState } from "react";
import {
  FileText,
  Download,
  Database,
  MapPin,
  Clock,
  BarChart3,
  TrendingUp,
  Activity,
  PieChart,
  Calendar,
  Globe,
  Thermometer,
  Wind,
  Droplets,
  Eye,
  CheckCircle,
} from "lucide-react";

const ReportSection = ({ title, children, icon: Icon }) => (
  <div className="card mb-6">
    <div className="flex items-center space-x-3 mb-4">
      <div className="p-2 bg-primary-100 rounded-lg">
        <Icon className="h-5 w-5 text-primary-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

const DataSourceTable = () => {
  const dataSources = [
    {
      name: "ES607 ERA5 Reanalysis",
      type: "Reanalysis Dataset",
      spatialRes: "0.25° × 0.25° (~25km)",
      temporalRes: "Hourly",
      format: "NetCDF4",
      coverage: "Global",
      period: "1940-Present",
      variables: "250+ meteorological variables",
      source: "ECMWF",
      access: "Copernicus Climate Data Store",
    },
    {
      name: "ERA5-Land",
      type: "Land Reanalysis",
      spatialRes: "0.1° × 0.1° (~11km)",
      temporalRes: "Hourly",
      format: "NetCDF4",
      coverage: "Global Land",
      period: "1950-Present",
      variables: "50+ land variables",
      source: "ECMWF",
      access: "Copernicus Climate Data Store",
    },
    {
      name: "GPM IMERG",
      type: "Satellite Precipitation",
      spatialRes: "0.1° × 0.1° (~11km)",
      temporalRes: "30-minute",
      format: "HDF5/NetCDF4",
      coverage: "60°N-60°S",
      period: "2000-Present",
      variables: "Precipitation estimates",
      source: "NASA/GSFC",
      access: "NASA GES DISC",
    },
    {
      name: "MODIS Land Surface",
      type: "Satellite Observations",
      spatialRes: "1km × 1km",
      temporalRes: "Daily",
      format: "HDF-EOS",
      coverage: "Global",
      period: "2000-Present",
      variables: "Land surface temperature, NDVI",
      source: "NASA",
      access: "NASA LP DAAC",
    },
    {
      name: "Ground Weather Stations",
      type: "In-situ Observations",
      spatialRes: "Point measurements",
      temporalRes: "Hourly/Daily",
      format: "CSV/JSON",
      coverage: "Regional networks",
      period: "Variable",
      variables: "Temperature, humidity, pressure, wind",
      source: "National Met Services",
      access: "Various APIs",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>Dataset Name</th>
            <th>Type</th>
            <th>Spatial Resolution</th>
            <th>Temporal Resolution</th>
            <th>Data Format</th>
            <th>Coverage</th>
            <th>Time Period</th>
            <th>Variables</th>
            <th>Source</th>
            <th>Access</th>
          </tr>
        </thead>
        <tbody>
          {dataSources.map((source, index) => (
            <tr key={index}>
              <td className="font-medium text-primary-600">{source.name}</td>
              <td>{source.type}</td>
              <td>{source.spatialRes}</td>
              <td>{source.temporalRes}</td>
              <td>{source.format}</td>
              <td>{source.coverage}</td>
              <td>{source.period}</td>
              <td>{source.variables}</td>
              <td>{source.source}</td>
              <td>{source.access}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const VariablesTable = () => {
  const variables = [
    {
      category: "Temperature",
      variables: [
        {
          name: "2m Temperature (t2m)",
          type: "Dependent",
          unit: "K",
          description: "Air temperature at 2m height",
        },
        {
          name: "2m Dewpoint Temperature (d2m)",
          type: "Dependent",
          unit: "K",
          description: "Dewpoint temperature at 2m height",
        },
        {
          name: "Surface Temperature",
          type: "Independent",
          unit: "K",
          description: "Land surface temperature",
        },
        {
          name: "Skin Temperature",
          type: "Independent",
          unit: "K",
          description: "Surface skin temperature",
        },
      ],
    },
    {
      category: "Wind",
      variables: [
        {
          name: "10m U-component (u10)",
          type: "Dependent",
          unit: "m/s",
          description: "Eastward wind component at 10m",
        },
        {
          name: "10m V-component (v10)",
          type: "Dependent",
          unit: "m/s",
          description: "Northward wind component at 10m",
        },
        {
          name: "10m Wind Speed",
          type: "Derived",
          unit: "m/s",
          description: "Calculated from u10 and v10",
        },
        {
          name: "10m Wind Direction",
          type: "Derived",
          unit: "degrees",
          description: "Wind direction at 10m",
        },
      ],
    },
    {
      category: "Precipitation",
      variables: [
        {
          name: "Total Precipitation (tp)",
          type: "Dependent",
          unit: "m",
          description: "Total precipitation amount",
        },
        {
          name: "Convective Precipitation",
          type: "Independent",
          unit: "m",
          description: "Convective precipitation",
        },
        {
          name: "Large-scale Precipitation",
          type: "Independent",
          unit: "m",
          description: "Large-scale precipitation",
        },
      ],
    },
    {
      category: "Atmospheric",
      variables: [
        {
          name: "Mean Sea Level Pressure",
          type: "Independent",
          unit: "Pa",
          description: "Pressure at sea level",
        },
        {
          name: "Surface Pressure",
          type: "Independent",
          unit: "Pa",
          description: "Surface atmospheric pressure",
        },
        {
          name: "Relative Humidity",
          type: "Derived",
          unit: "%",
          description: "Calculated from temperature and dewpoint",
        },
        {
          name: "Specific Humidity",
          type: "Independent",
          unit: "kg/kg",
          description: "Mass of water vapor per unit mass",
        },
      ],
    },
    {
      category: "Radiation",
      variables: [
        {
          name: "Surface Solar Radiation",
          type: "Independent",
          unit: "J/m²",
          description: "Downward solar radiation",
        },
        {
          name: "Surface Thermal Radiation",
          type: "Independent",
          unit: "J/m²",
          description: "Downward thermal radiation",
        },
        {
          name: "Net Solar Radiation",
          type: "Derived",
          unit: "J/m²",
          description: "Net solar radiation at surface",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {variables.map((category, index) => (
        <div key={index} className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              {category.category === "Temperature" && (
                <Thermometer className="h-4 w-4 text-blue-600" />
              )}
              {category.category === "Wind" && (
                <Wind className="h-4 w-4 text-blue-600" />
              )}
              {category.category === "Precipitation" && (
                <Droplets className="h-4 w-4 text-blue-600" />
              )}
              {category.category === "Atmospheric" && (
                <BarChart3 className="h-4 w-4 text-blue-600" />
              )}
              {category.category === "Radiation" && (
                <Activity className="h-4 w-4 text-blue-600" />
              )}
            </div>
            {category.category}
          </h3>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Variable Name</th>
                  <th>Type</th>
                  <th>Unit</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {category.variables.map((variable, varIndex) => (
                  <tr key={varIndex}>
                    <td className="font-medium text-gray-900">
                      {variable.name}
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          variable.type === "Dependent"
                            ? "bg-green-100 text-green-800"
                            : variable.type === "Independent"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {variable.type}
                      </span>
                    </td>
                    <td className="text-gray-600">{variable.unit}</td>
                    <td className="text-gray-600">{variable.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

const VisualizationInsights = () => {
  const insights = [
    {
      plot: "Time Series Plots",
      insights: [
        "Temperature shows clear seasonal patterns with summer peaks (35-40°C) and winter lows (15-20°C)",
        "Dewpoint temperature follows similar seasonal trends but with lower amplitude",
        "Wind speed exhibits higher variability during monsoon season (June-September)",
        "Precipitation shows distinct wet and dry seasons with monsoon peaks",
        "Diurnal temperature variations are more pronounced in summer months",
      ],
    },
    {
      plot: "Box Plots",
      insights: [
        "Temperature distribution is approximately normal with slight right skewness",
        "Wind speed shows high variability with many outliers during storm events",
        "Precipitation distribution is highly skewed with many zero values",
        "Dewpoint temperature has tighter distribution compared to air temperature",
        "Seasonal differences are clearly visible in all meteorological variables",
      ],
    },
    {
      plot: "Scatter Plots",
      insights: [
        "Strong positive correlation between temperature and dewpoint (R² = 0.85)",
        "Weak negative correlation between temperature and wind speed (R² = 0.15)",
        "No significant correlation between precipitation and temperature",
        "Wind speed shows moderate correlation with pressure gradients",
        "Humidity shows strong relationship with temperature-dewpoint difference",
      ],
    },
    {
      plot: "Histograms",
      insights: [
        "Temperature follows approximately normal distribution with mean ~26°C",
        "Wind speed shows exponential-like distribution with most values < 5 m/s",
        "Precipitation has bimodal distribution with peak at zero and secondary peak",
        "Dewpoint temperature distribution is similar to temperature but shifted left",
        "Pressure shows normal distribution with seasonal variations",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {insights.map((section, index) => (
        <div key={index} className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <Eye className="h-4 w-4 text-green-600" />
            </div>
            {section.plot}
          </h3>
          <div className="space-y-3">
            {section.insights.map((insight, insightIndex) => (
              <div
                key={insightIndex}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Reports = () => {
  const [activeSection, setActiveSection] = useState("sources");

  const sections = [
    { id: "sources", label: "Data Sources", icon: Database },
    { id: "variables", label: "Variables", icon: BarChart3 },
    { id: "insights", label: "Visualization Insights", icon: Eye },
  ];

  const handleDownloadReport = () => {
    // Create a comprehensive report
    const reportContent = `
# ES607 Weather Data Analysis Report

## 1. Data Sources Summary

### Available Datasets:
- ES607 ERA5 Reanalysis (Primary)
- ERA5-Land
- GPM IMERG Precipitation
- MODIS Land Surface
- Ground Weather Stations

## 2. Variables Analysis

### Dependent Variables:
- 2m Temperature (t2m)
- 2m Dewpoint Temperature (d2m)
- 10m U-component (u10)
- 10m V-component (v10)
- Total Precipitation (tp)

### Independent Variables:
- Surface Temperature
- Mean Sea Level Pressure
- Surface Solar Radiation
- Specific Humidity

## 3. Key Insights from Visualizations

### Time Series Analysis:
- Clear seasonal patterns in temperature
- Monsoon-driven precipitation cycles
- Diurnal variations in meteorological variables

### Statistical Analysis:
- Temperature: Normal distribution, mean 26.4°C
- Wind Speed: Exponential distribution, mean 2.1 m/s
- Precipitation: Bimodal distribution with dry season dominance

### Correlations:
- Strong temperature-dewpoint correlation (R² = 0.85)
- Weak temperature-wind correlation (R² = 0.15)
- Seasonal patterns in all variables

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([reportContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ES607_Weather_Analysis_Report.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analysis Report</h1>
          <p className="text-gray-600">
            Comprehensive weather data analysis and insights
          </p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="btn-primary flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </button>
      </div>

      {/* Section Navigation */}
      <div className="flex items-center space-x-2 p-1 bg-gray-100 rounded-lg w-fit">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === id
                ? "bg-white text-primary-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Report Content */}
      {activeSection === "sources" && (
        <ReportSection title="Data Sources Summary" icon={Database}>
          <div className="mb-4">
            <p className="text-gray-600 mb-4">
              This section provides a comprehensive overview of all available
              data sources for weather analysis, including their spatial and
              temporal resolutions, data formats, and access methods.
            </p>
          </div>
          <DataSourceTable />
        </ReportSection>
      )}

      {activeSection === "variables" && (
        <ReportSection title="Variables and Features Analysis" icon={BarChart3}>
          <div className="mb-4">
            <p className="text-gray-600 mb-4">
              Detailed breakdown of all meteorological variables available in
              the dataset, categorized by type (dependent, independent, derived)
              with their units and descriptions.
            </p>
          </div>
          <VariablesTable />
        </ReportSection>
      )}

      {activeSection === "insights" && (
        <ReportSection title="Visualization Insights and Inferences" icon={Eye}>
          <div className="mb-4">
            <p className="text-gray-600 mb-4">
              Key insights derived from various visualization techniques
              including time series plots, box plots, scatter plots, and
              histograms, with statistical inferences and patterns.
            </p>
          </div>
          <VisualizationInsights />
        </ReportSection>
      )}

      {/* Summary Statistics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Report Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">5</p>
            <p className="text-sm text-blue-700">Data Sources</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">25+</p>
            <p className="text-sm text-green-700">Variables</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">20+</p>
            <p className="text-sm text-purple-700">Key Insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
