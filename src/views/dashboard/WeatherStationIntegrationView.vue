<template>
  <div class="weather-station-dashboard">
    <h2 class="dashboard-title">Weather Station Integration</h2>

    <div class="dashboard-sections-grid">
      <!-- Real-time and Historical Metrics Section -->
      <div class="section-card metrics-section">
        <h3>Real-time and Historical Metrics</h3>

        <div class="kpi-grid">
          <div class="kpi-card">
            <h4>Current Temperature</h4>
            <p class="kpi-value">28°C</p>
          </div>
          <div class="kpi-card">
            <h4>Current Humidity</h4>
            <p class="kpi-value">65%</p>
          </div>
          <div class="kpi-card">
            <h4>Current Wind Speed</h4>
            <p class="kpi-value">15 km/h</p>
          </div>
          <div class="kpi-card">
            <h4>Current Soil Moisture</h4>
            <p class="kpi-value">35%</p>
          </div>
        </div>

        <div class="chart-row">
          <div class="chart-card">
            <h4>Rainfall Analysis (Last 30 Days)</h4>
            <!-- Bar Chart for Daily Rainfall -->
            <apexchart type="bar" :options="dailyRainfallChartOptions" :series="dailyRainfallSeries"></apexchart>
          </div>
          <div class="chart-card">
            <h4>Cumulative Monthly Rainfall (Last 12 Months)</h4>
            <!-- Line Chart for Cumulative Monthly Rainfall -->
            <apexchart type="line" :options="cumulativeRainfallChartOptions" :series="cumulativeRainfallSeries"></apexchart>
          </div>
        </div>

        <div class="chart-row">
          <div class="chart-card">
            <h4>Temperature Analysis (Last 30 Days)</h4>
            <!-- Dual-Axis Line Chart for Daily High and Low Temperatures -->
            <apexchart type="line" :options="tempAnalysisChartOptions" :series="tempAnalysisSeries"></apexchart>
          </div>
        </div>

        <div class="chart-row">
          <div class="chart-card">
            <h4>Humidity (Last 24 Hours)</h4>
            <!-- Line Chart for Humidity over last 24 hours -->
            <apexchart type="line" :options="humidity24hChartOptions" :series="humidity24hSeries"></apexchart>
          </div>
          <div class="chart-card">
            <h4>Humidity (Last 30 Days)</h4>
            <!-- Line Chart for Humidity over last 30 days -->
            <apexchart type="line" :options="humidity30dChartOptions" :series="humidity30dSeries"></apexchart>
          </div>
        </div>

        <div class="chart-row">
          <div class="chart-card">
            <h4>Soil Analysis (Last 7 Days)</h4>
            <!-- Dual-Axis Line Chart for Soil Temperature and Soil Moisture -->
            <apexchart type="line" :options="soilAnalysisChartOptions" :series="soilAnalysisSeries"></apexchart>
          </div>
        </div>

        <div class="chart-row">
          <div class="chart-card">
            <h4>Average Wind Speed (Last 30 Days)</h4>
            <!-- Bar Chart for Average Wind Speed -->
            <apexchart type="bar" :options="windSpeedChartOptions" :series="windSpeedSeries"></apexchart>
          </div>
          <div class="chart-card">
            <h4>Wind Direction Distribution</h4>
            <!-- Radar Chart for Wind Direction -->
            <apexchart type="radar" :options="windDirectionChartOptions" :series="windDirectionSeries"></apexchart>
          </div>
        </div>
      </div>

      <!-- Alert System for Anomalies Section -->
      <div class="section-card alert-section">
        <h3>Alert System for Anomalies</h3>

        <div class="kpi-grid">
          <div class="kpi-card">
            <h4>Active Alerts</h4>
            <p class="kpi-value">3</p>
          </div>
        </div>

        <div class="chart-card">
          <h4>Recent Alerts History</h4>
          <!-- Timeline Chart or List for Alert History -->
          <ul class="alert-list">
            <li><span class="alert-status critical">Critical:</span> Drought stress detected in Zone A (2024-07-28 10:30 AM)</li>
            <li><span class="alert-status warning">Warning:</span> High temperature alert for next 24 hours (2024-07-27 08:00 PM)</li>
            <li><span class="alert-status info">Info:</span> Unusual rainfall pattern observed (2024-07-26 03:15 PM)</li>
          </ul>
        </div>

        <div class="chart-card">
          <h4>Alert Severity Breakdown</h4>
          <!-- Pie Chart for Severity Level Distribution -->
          <apexchart type="pie" :options="alertSeverityChartOptions" :series="alertSeveritySeries"></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ApexCharts from 'apexcharts'; // Import ApexCharts

// Helper function to get CSS variables
const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name);

// Mock Data and Chart Options for Real-time and Historical Metrics

// Rainfall Analysis
const dailyRainfallSeries = ref([
  {
    name: 'Daily Rainfall (mm)',
    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) / 10),
  },
]);

const dailyRainfallChartOptions = ref({
  chart: {
    type: 'bar',
    height: 250,
    toolbar: { show: false },
  },
  colors: [getCssVar('--color-primary')],
  xaxis: {
    categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  yaxis: {
    title: { text: 'Rainfall (mm)', style: { color: getCssVar('--chart-label-color') } },
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  grid: { borderColor: '#444' },
  tooltip: { theme: 'dark' },
});

const cumulativeRainfallSeries = ref([
  {
    name: 'Cumulative Rainfall (mm)',
    data: Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 200) + 50),
  },
]);

const cumulativeRainfallChartOptions = ref({
  chart: {
    type: 'line',
    height: 250,
    toolbar: { show: false },
  },
  colors: [getCssVar('--color-accent')],
  stroke: { curve: 'smooth' },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  yaxis: {
    title: { text: 'Cumulative Rainfall (mm)', style: { color: getCssVar('--chart-label-color') } },
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  grid: { borderColor: '#444' },
  tooltip: { theme: 'dark' },
});

// Temperature Analysis
const tempAnalysisSeries = ref([
  {
    name: 'High Temp (°C)',
    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 25),
  },
  {
    name: 'Low Temp (°C)',
    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 15),
  },
]);

const tempAnalysisChartOptions = ref({
  chart: {
    type: 'line',
    height: 250,
    toolbar: { show: false },
  },
  colors: [getCssVar('--color-primary'), getCssVar('--color-secondary')],
  stroke: { curve: 'smooth' },
  xaxis: {
    categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  yaxis: [
    {
      title: { text: 'High Temp (°C)', style: { color: getCssVar('--chart-label-color') } },
      labels: { style: { colors: getCssVar('--chart-label-color') } },
    },
    {
      opposite: true,
      title: { text: 'Low Temp (°C)', style: { color: getCssVar('--chart-label-color') } },
      labels: { style: { colors: getCssVar('--chart-label-color') } },
    },
  ],
  grid: { borderColor: '#444' },
  tooltip: { theme: 'dark' },
});

// Humidity Analysis
const humidity24hSeries = ref([
  {
    name: 'Humidity (%)',
    data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 40) + 40),
  },
]);

const humidity24hChartOptions = ref({
  chart: {
    type: 'line',
    height: 250,
    toolbar: { show: false },
  },
  colors: [getCssVar('--color-primary')],
  stroke: { curve: 'smooth' },
  xaxis: {
    categories: Array.from({ length: 24 }, (_, i) => `${i}h`),
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  yaxis: {
    title: { text: 'Humidity (%)', style: { color: getCssVar('--chart-label-color') } },
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  grid: { borderColor: '#444' },
  tooltip: { theme: 'dark' },
});

const humidity30dSeries = ref([
  {
    name: 'Humidity (%)',
    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 40) + 40),
  },
]);

const humidity30dChartOptions = ref({
  chart: {
    type: 'line',
    height: 250,
    toolbar: { show: false },
  },
  colors: [getCssVar('--color-accent')],
  stroke: { curve: 'smooth' },
  xaxis: {
    categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  yaxis: {
    title: { text: 'Humidity (%)', style: { color: getCssVar('--chart-label-color') } },
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  grid: { borderColor: '#444' },
  tooltip: { theme: 'dark' },
});

// Soil Analysis
const soilAnalysisSeries = ref([
  {
    name: 'Soil Temperature (°C)',
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10) + 20),
  },
  {
    name: 'Soil Moisture (%)',
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 30) + 20),
  },
]);

const soilAnalysisChartOptions = ref({
  chart: {
    type: 'line',
    height: 250,
    toolbar: { show: false },
  },
  colors: [getCssVar('--color-primary'), getCssVar('--color-secondary')],
  stroke: { curve: 'smooth' },
  xaxis: {
    categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  yaxis: [
    {
      title: { text: 'Soil Temperature (°C)', style: { color: getCssVar('--chart-label-color') } },
      labels: { style: { colors: getCssVar('--chart-label-color') } },
    },
    {
      opposite: true,
      title: { text: 'Soil Moisture (%)', style: { color: getCssVar('--chart-label-color') } },
      labels: { style: { colors: getCssVar('--chart-label-color') } },
    },
  ],
  grid: { borderColor: '#444' },
  tooltip: { theme: 'dark' },
});

// Wind Analysis
const windSpeedSeries = ref([
  {
    name: 'Average Wind Speed (km/h)',
    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 5),
  },
]);

const windSpeedChartOptions = ref({
  chart: {
    type: 'bar',
    height: 250,
    toolbar: { show: false },
  },
  colors: [getCssVar('--color-primary')],
  xaxis: {
    categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  yaxis: {
    title: { text: 'Wind Speed (km/h)', style: { color: getCssVar('--chart-label-color') } },
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  grid: { borderColor: '#444' },
  tooltip: { theme: 'dark' },
});

const windDirectionSeries = ref([
  {
    name: 'Wind Direction',
    data: [40, 80, 60, 30, 90, 50, 70, 20], // Mock data for N, NE, E, SE, S, SW, W, NW
  },
]);

const windDirectionChartOptions = ref({
  chart: {
    type: 'radar',
    height: 250,
    toolbar: { show: false },
  },
  colors: [getCssVar('--color-accent')],
  xaxis: {
    categories: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
    labels: { style: { colors: getCssVar('--chart-label-color') } },
  },
  yaxis: {
    labels: { show: false },
  },
  plotOptions: {
    radar: {
      polygons: {
        strokeColors: '#444',
        fill: {
          colors: ['#2C2C2C', '#2C2C2C'],
        },
      },
    },
  },
  tooltip: { theme: 'dark' },
});

// Mock Data and Chart Options for Alert System for Anomalies
const alertSeveritySeries = ref([44, 55, 13]); // Critical, Warning, Info

const alertSeverityChartOptions = ref({
  chart: {
    type: 'pie',
    height: 250,
  },
  labels: ['Critical', 'Warning', 'Info'],
  colors: ['#FF5252', '#FFC107', '#2196F3'], // Red, Amber, Blue
  legend: {
    position: 'bottom',
    labels: {
      colors: getCssVar('--chart-label-color'),
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#fff'],
    },
    formatter: function (val, opts) {
      return opts.w.globals.series[opts.seriesIndex] + "%"
    }
  },
  tooltip: { theme: 'dark' },
});
</script>

<style scoped>
.weather-station-dashboard {
  padding: var(--spacing-lg);
  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  color: var(--color-text-primary);
}

.dashboard-title {
  font-size: var(--font-size-heading3);
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.dashboard-sections-grid {
  display: grid;
  grid-template-columns: 1fr; /* Single column for smaller screens */
  gap: var(--spacing-xl);
}

@media (min-width: 1024px) {
  .dashboard-sections-grid {
    grid-template-columns: 2fr 1fr; /* Two columns for larger screens */
  }
}

.section-card {
  background-color: #2C2C2C;
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  margin-bottom: var(--spacing-xl);
}

.section-card h3 {
  color: var(--color-accent);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-heading4);
  font-weight: var(--font-weight-medium);
  text-align: center;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.kpi-card {
  background-color: var(--color-background-soft);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  text-align: center;
  box-shadow: var(--card-shadow);
}

.kpi-card h4 {
  color: var(--color-text-secondary);
  font-size: var(--font-size-body);
  margin-bottom: var(--spacing-xs);
}

.kpi-value {
  font-size: var(--font-size-heading2);
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
}

.chart-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

@media (min-width: 768px) {
  .chart-row {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

.chart-card {
  background-color: var(--color-background-soft);
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.chart-card h4 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  text-align: center;
}

.alert-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.alert-list li {
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
}

.alert-status {
  font-weight: var(--font-weight-bold);
  margin-right: var(--spacing-xs);
}

.alert-status.critical {
  color: #FF5252; /* Red for critical alerts */
}

.alert-status.warning {
  color: #FFC107; /* Amber for warning alerts */
}

.alert-status.info {
  color: #2196F3; /* Blue for info alerts */
}
</style>