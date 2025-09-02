# ES607 Weather Data Portal

A modern, interactive web application for analyzing and visualizing weather data from the ES607 dataset. Built with React, Vite, and Tailwind CSS.

## Features

### 📊 **Interactive Dashboard**
- Real-time data quality metrics
- Key weather statistics overview
- Processing status indicators
- Quick access to all analysis tools

### 🔍 **Data Quality Assessment**
- Comprehensive quality scoring (0-100)
- Missing data analysis and visualization
- Physical consistency validation
- Before/after comparison charts

### 📈 **Statistical Analysis**
- Detailed statistical metrics for all variables
- Distribution analysis
- Advanced statistical measures (skewness, kurtosis, etc.)
- Exportable statistical reports

### 📊 **Interactive Visualizations**
- Time series plots with zoom and pan
- Scatter plots for correlation analysis
- Bar charts for seasonal analysis
- Multiple chart types and customization options

### ⚙️ **Data Processing Tools**
- Missing data interpolation
- Outlier detection and removal
- Noise reduction algorithms
- Physical consistency fixes
- Real-time processing pipeline

## Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
weather-portal/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Sidebar.jsx         # Main navigation
│   │   ├── Dashboard.jsx       # Overview dashboard
│   │   ├── DataQuality.jsx     # Quality assessment
│   │   ├── Statistics.jsx      # Statistical analysis
│   │   ├── Visualizations.jsx  # Charts and plots
│   │   └── DataProcessing.jsx  # Data cleaning tools
│   ├── App.jsx                 # Main application
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── package.json              # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── README.md                # This file
```

## Features Overview

### 🎯 **Data Quality Management**
- **Quality Scoring**: Automated 0-100 quality assessment
- **Issue Detection**: Identifies missing data, outliers, and inconsistencies
- **Visual Feedback**: Clear before/after comparisons
- **Processing Pipeline**: Step-by-step data cleaning workflow

### 📊 **Advanced Analytics**
- **Statistical Metrics**: Mean, median, mode, standard deviation, etc.
- **Distribution Analysis**: Skewness, kurtosis, coefficient of variation
- **Temporal Analysis**: Seasonal patterns and trends
- **Cross-variable Analysis**: Correlation and relationship studies

### 🎨 **Interactive Visualizations**
- **Multiple Chart Types**: Line, bar, scatter, area charts
- **Real-time Updates**: Dynamic data loading and updates
- **Customization**: Color schemes, time ranges, variable selection
- **Export Options**: Download charts and data

### ⚡ **Performance Features**
- **Fast Loading**: Optimized with Vite for quick development
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Accessibility**: WCAG compliant design patterns

## Data Processing Methods

### 1. **Missing Data Handling**
- Forward/Backward Fill
- Linear Interpolation
- Spline Interpolation

### 2. **Outlier Detection**
- IQR Method (1.5x multiplier)
- Z-Score Method (3σ threshold)
- Modified Z-Score

### 3. **Noise Reduction**
- Gaussian Smoothing
- Moving Average
- Median Filtering

### 4. **Physical Consistency**
- Temperature-Dewpoint Validation
- Wind Speed Constraints
- Precipitation Limits

## Usage Examples

### Viewing Data Quality
1. Navigate to "Data Quality" tab
2. Review quality score and issues
3. Click "Clean Data" to process
4. View before/after comparisons

### Creating Visualizations
1. Go to "Visualizations" tab
2. Select chart type and variables
3. Choose time range
4. Customize appearance
5. Export if needed

### Statistical Analysis
1. Open "Statistics" tab
2. Review summary metrics
3. Explore detailed tables
4. Analyze distributions
5. Export reports

## Customization

### Adding New Chart Types
1. Import new chart component in `Visualizations.jsx`
2. Add to chart type selector
3. Implement data transformation
4. Add to responsive container

### Extending Data Processing
1. Add new method to `DataProcessing.jsx`
2. Implement processing logic
3. Add to processing pipeline
4. Update quality metrics

### Styling Customization
- Modify `tailwind.config.js` for theme changes
- Update `src/index.css` for global styles
- Use Tailwind utility classes for component styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## Roadmap

### Upcoming Features
- [ ] Real-time data streaming
- [ ] Advanced machine learning models
- [ ] Custom dashboard creation
- [ ] API integration
- [ ] Multi-dataset support
- [ ] Collaborative features

### Performance Improvements
- [ ] Data virtualization for large datasets
- [ ] Web Workers for heavy computations
- [ ] Caching strategies
- [ ] Progressive loading

---

**Built with ❤️ for weather data analysis**
