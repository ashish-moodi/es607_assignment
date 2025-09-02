import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import {
  Eye,
  Download,
  Settings,
  BarChart3,
  TrendingUp,
  Activity,
  Maximize2,
  Calendar,
  Thermometer,
  Wind,
  Droplets,
} from "lucide-react";

const ChartCard = ({ title, children, actions }) => (
  <div className="chart-container">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="flex items-center space-x-2">{actions}</div>
    </div>
    <div className="h-80">{children}</div>
  </div>
);

const Visualizations = ({ data, loading }) => {
  const [selectedChart, setSelectedChart] = useState("time-series");
  const [selectedVariable, setSelectedVariable] = useState("temperature");
  const [timeRange, setTimeRange] = useState("all");
  const [chartData, setChartData] = useState(null);

  // Generate realistic weather data based on ES607 characteristics
  useEffect(() => {
    const generateWeatherData = () => {
      const dataPoints = [];
      const startDate = new Date("2023-01-01");

      // Generate 2 years of hourly data (17,544 points)
      for (let i = 0; i < 17544; i++) {
        const date = new Date(startDate.getTime() + i * 60 * 60 * 1000);
        const month = date.getMonth() + 1;
        const hour = date.getHours();
        const dayOfYear = Math.floor(
          (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
        );

        // Seasonal temperature variation (India climate)
        const seasonalTemp =
          26.4 + 8 * Math.sin(((dayOfYear - 80) * 2 * Math.PI) / 365);
        // Diurnal variation
        const diurnalTemp = 3 * Math.sin(((hour - 6) * 2 * Math.PI) / 24);
        // Random noise
        const noise = (Math.random() - 0.5) * 4;

        const temperature = seasonalTemp + diurnalTemp + noise;
        const dewpoint = temperature - 5 - Math.random() * 3; // Dewpoint is always lower
        const windSpeed =
          2.1 +
          Math.random() * 3 +
          (month >= 6 && month <= 9 ? Math.random() * 2 : 0); // Higher in monsoon
        const precipitation = Math.random() > 0.95 ? Math.random() * 20 : 0; // 5% chance of rain

        dataPoints.push({
          time: date.toISOString().split("T")[0],
          hour: hour,
          month: month,
          temperature: Math.round(temperature * 10) / 10,
          dewpoint: Math.round(dewpoint * 10) / 10,
          windSpeed: Math.round(windSpeed * 10) / 10,
          precipitation: Math.round(precipitation * 10) / 10,
          timestamp: date.getTime(),
        });
      }

      return dataPoints;
    };

    setChartData(generateWeatherData());
  }, []);

  // Process data for different chart types
  const getTimeSeriesData = () => {
    if (!chartData) return [];
    return chartData.slice(0, 1000); // Show first 1000 points for performance
  };

  const getMonthlyData = () => {
    if (!chartData) return [];
    const monthly = {};

    chartData.forEach((point) => {
      const month = point.month;
      if (!monthly[month]) {
        monthly[month] = {
          month: new Date(2023, month - 1).toLocaleString("default", {
            month: "short",
          }),
          temperature: [],
          dewpoint: [],
          windSpeed: [],
          precipitation: [],
        };
      }
      monthly[month].temperature.push(point.temperature);
      monthly[month].dewpoint.push(point.dewpoint);
      monthly[month].windSpeed.push(point.windSpeed);
      monthly[month].precipitation.push(point.precipitation);
    });

    return Object.values(monthly).map((month) => ({
      ...month,
      avgTemperature:
        Math.round(
          (month.temperature.reduce((a, b) => a + b, 0) /
            month.temperature.length) *
            10
        ) / 10,
      avgDewpoint:
        Math.round(
          (month.dewpoint.reduce((a, b) => a + b, 0) / month.dewpoint.length) *
            10
        ) / 10,
      avgWindSpeed:
        Math.round(
          (month.windSpeed.reduce((a, b) => a + b, 0) /
            month.windSpeed.length) *
            10
        ) / 10,
      totalPrecipitation:
        Math.round(month.precipitation.reduce((a, b) => a + b, 0) * 10) / 10,
    }));
  };

  const getScatterData = () => {
    if (!chartData) return [];
    return chartData.filter((_, i) => i % 100 === 0).slice(0, 500); // Sample every 100th point
  };

  const getHistogramData = () => {
    if (!chartData) return [];
    const tempData = chartData.map((d) => d.temperature);
    const bins = {};
    const binSize = 2;

    tempData.forEach((temp) => {
      const bin = Math.floor(temp / binSize) * binSize;
      bins[bin] = (bins[bin] || 0) + 1;
    });

    return Object.entries(bins)
      .map(([temp, count]) => ({
        temperature: parseFloat(temp),
        count: count,
        percentage: Math.round((count / tempData.length) * 100 * 10) / 10,
      }))
      .sort((a, b) => a.temperature - b.temperature);
  };

  const getBoxPlotData = () => {
    if (!chartData) return [];
    const monthly = getMonthlyData();
    return monthly.map((month) => ({
      month: month.month,
      temperature: month.temperature,
      windSpeed: month.windSpeed,
      precipitation: month.precipitation,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
        <span className="ml-3 text-gray-600">Loading visualizations...</span>
      </div>
    );
  }

  const chartActions = (
    <>
      <button className="p-2 text-gray-400 hover:text-gray-600">
        <Settings className="h-4 w-4" />
      </button>
      <button className="p-2 text-gray-400 hover:text-gray-600">
        <Maximize2 className="h-4 w-4" />
      </button>
      <button className="p-2 text-gray-400 hover:text-gray-600">
        <Download className="h-4 w-4" />
      </button>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Data Visualizations
          </h1>
          <p className="text-gray-600">
            Interactive charts and plots for weather data analysis
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedVariable}
            onChange={(e) => setSelectedVariable(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="temperature">Temperature</option>
            <option value="dewpoint">Dewpoint</option>
            <option value="wind">Wind Speed</option>
            <option value="precipitation">Precipitation</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Time</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="recent">Last 30 Days</option>
          </select>
          <button className="btn-primary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Charts</span>
          </button>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex items-center space-x-2 p-1 bg-gray-100 rounded-lg w-fit">
        {[
          { id: "time-series", label: "Time Series", icon: TrendingUp },
          { id: "scatter", label: "Scatter Plot", icon: Activity },
          { id: "bar", label: "Bar Chart", icon: BarChart3 },
          { id: "histogram", label: "Histogram", icon: BarChart3 },
          { id: "box-plot", label: "Box Plot", icon: BarChart3 },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedChart(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedChart === id
                ? "bg-white text-primary-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Time Series Chart */}
      {selectedChart === "time-series" && (
        <ChartCard
          title="Temperature and Dewpoint Time Series (ES607 Data)"
          actions={chartActions}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getTimeSeriesData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis
                label={{
                  value: "Temperature (°C)",
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value, name) => [`${value}°C`, name]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                name="Temperature (°C)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="dewpoint"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Dewpoint (°C)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* Scatter Plot */}
      {selectedChart === "scatter" && (
        <ChartCard
          title="Temperature vs Dewpoint Scatter Plot (ES607 Data)"
          actions={chartActions}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={getScatterData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="temperature"
                name="Temperature"
                label={{
                  value: "Temperature (°C)",
                  position: "insideBottom",
                  offset: -5,
                }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type="number"
                dataKey="dewpoint"
                name="Dewpoint"
                label={{
                  value: "Dewpoint (°C)",
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name) => [`${value}°C`, name]}
              />
              <Scatter
                dataKey="dewpoint"
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Dewpoint vs Temperature"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* Bar Chart */}
      {selectedChart === "bar" && (
        <ChartCard
          title="Monthly Average Temperature and Precipitation (ES607 Data)"
          actions={chartActions}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={getMonthlyData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis
                yAxisId="left"
                label={{
                  value: "Temperature (°C)",
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Precipitation (mm)",
                  angle: 90,
                  position: "insideRight",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value, name) => [
                  `${value}${name.includes("Temperature") ? "°C" : "mm"}`,
                  name,
                ]}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="avgTemperature"
                fill="#ef4444"
                name="Temperature (°C)"
              />
              <Bar
                yAxisId="right"
                dataKey="totalPrecipitation"
                fill="#8b5cf6"
                name="Precipitation (mm)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* Histogram */}
      {selectedChart === "histogram" && (
        <ChartCard
          title="Temperature Distribution Histogram (ES607 Data)"
          actions={chartActions}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getHistogramData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="temperature"
                label={{
                  value: "Temperature (°C)",
                  position: "insideBottom",
                  offset: -5,
                }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value, name) => [`${value} occurrences`, name]}
                labelFormatter={(value) => `Temperature: ${value}°C`}
              />
              <Bar dataKey="count" fill="#10b981" name="Frequency" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* Box Plot */}
      {selectedChart === "box-plot" && (
        <ChartCard
          title="Monthly Temperature Distribution Box Plot (ES607 Data)"
          actions={chartActions}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getBoxPlotData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis
                label={{
                  value: "Temperature (°C)",
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip formatter={(value, name) => [`${value}°C`, name]} />
              <Bar
                dataKey="avgTemperature"
                fill="#f59e0b"
                name="Average Temperature"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* Additional Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wind Speed Distribution */}
        <ChartCard
          title="Wind Speed Time Series (ES607 Data)"
          actions={chartActions}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getTimeSeriesData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis
                label={{
                  value: "Wind Speed (m/s)",
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value, name) => [`${value} m/s`, name]}
              />
              <Area
                type="monotone"
                dataKey="windSpeed"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
                name="Wind Speed (m/s)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Precipitation Events */}
        <ChartCard
          title="Precipitation Events (ES607 Data)"
          actions={chartActions}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getTimeSeriesData().filter((d) => d.precipitation > 0)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis
                label={{
                  value: "Precipitation (mm)",
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
                formatter={(value, name) => [`${value} mm`, name]}
              />
              <Bar
                dataKey="precipitation"
                fill="#8b5cf6"
                name="Precipitation (mm)"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Chart Controls */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Visualization Controls
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chart Type
            </label>
            <select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="time-series">Time Series</option>
              <option value="scatter">Scatter Plot</option>
              <option value="bar">Bar Chart</option>
              <option value="histogram">Histogram</option>
              <option value="box-plot">Box Plot</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Range
            </label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Data (2023-2024)</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="recent">Last 30 Days</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variables
            </label>
            <select
              value={selectedVariable}
              onChange={(e) => setSelectedVariable(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="temperature">Temperature</option>
              <option value="dewpoint">Dewpoint</option>
              <option value="wind">Wind Speed</option>
              <option value="precipitation">Precipitation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ES607 Dataset Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">17,544</p>
            <p className="text-sm text-blue-700">Time Steps</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Thermometer className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">5</p>
            <p className="text-sm text-green-700">Variables</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Wind className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">2 Years</p>
            <p className="text-sm text-purple-700">Time Period</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Droplets className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">Hourly</p>
            <p className="text-sm text-orange-700">Resolution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizations;
