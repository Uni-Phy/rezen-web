<template>
  <div class="dashboard-container">
    <h2 class="dashboard-title">Carbon Credit Engine</h2>

    <!-- Section 1: LiDAR + Plot-Based Calibration -->
    <div class="dashboard-section">
      <h3>LiDAR + Plot-Based Calibration</h3>
      <div class="kpi-grid">
        <div class="kpi-card">
          <p class="kpi-value">0.92</p>
          <p class="kpi-label">Correlation Score (R-squared)</p>
        </div>
        <div class="kpi-card">
          <p class="kpi-value">150</p>
          <p class="kpi-label">Number of Calibration Plots</p>
        </div>
      </div>
      <div class="chart-grid">
        <div class="chart-card">
          <h4>LiDAR vs. Plot Data Scatter Plot</h4>
          <apexchart type="scatter" :options="lidarScatterChartOptions" :series="lidarScatterSeries"></apexchart>
        </div>
        <div class="chart-card">
          <h4>Biomass Density Heatmap (kg/ha)</h4>
          <apexchart type="heatmap" :options="biomassHeatmapChartOptions" :series="biomassHeatmapSeries"></apexchart>
        </div>
        <div class="chart-card">
          <h4>LiDAR vs. Ground-Truth Deviation</h4>
          <apexchart type="bar" :options="deviationBarChartOptions" :series="deviationBarSeries"></apexchart>
        </div>
      </div>
    </div>

    <!-- Section 2: Baseline vs. Actual Carbon Sequestered -->
    <div class="dashboard-section">
      <h3>Baseline vs. Actual Carbon Sequestered</h3>
      <div class="kpi-grid">
        <div class="kpi-card">
          <p class="kpi-value">12,500 tonnes</p>
          <p class="kpi-label">Total Baseline Sequestered Carbon</p>
        </div>
        <div class="kpi-card">
          <p class="kpi-value">13,200 tonnes</p>
          <p class="kpi-label">Total Actual Sequestered Carbon</p>
        </div>
      </div>
      <div class="chart-grid">
        <div class="chart-card">
          <h4>Baseline vs. Actual Carbon Over Time</h4>
          <apexchart type="line" :options="carbonLineChartOptions" :series="carbonLineSeries"></apexchart>
        </div>
        <div class="kpi-card single-value-card">
          <p class="kpi-value">700 tonnes</p>
          <p class="kpi-label">Performance Gap</p>
        </div>
      </div>
    </div>

    <!-- Section 3: Dynamic Control Area Generation -->
    <div class="dashboard-section">
      <h3>Dynamic Control Area Generation</h3>
      <div class="kpi-grid">
        <div class="kpi-card">
          <p class="kpi-value">25</p>
          <p class="kpi-label">Number of Generated Control Areas</p>
        </div>
        <div class="kpi-card">
          <p class="kpi-value">50 ha</p>
          <p class="kpi-label">Average Control Area Size</p>
        </div>
      </div>
      <div class="chart-grid">
        <div class="chart-card">
          <h4>Project & Control Area Map</h4>
          <!-- Placeholder for Map Component -->
          <div class="map-placeholder">Map visualization here</div>
        </div>
        <div class="chart-card">
          <h4>Control vs. Restoration Area Characteristics</h4>
          <apexchart type="bar" :options="characteristicsBarChartOptions" :series="characteristicsBarSeries"></apexchart>
        </div>
      </div>
    </div>

    <!-- Section 4: Real-time MRV (Measurement, Reporting & Verification) Eligibility Scoring -->
    <div class="dashboard-section">
      <h3>Real-time MRV (Measurement, Reporting & Verification) Eligibility Scoring</h3>
      <div class="kpi-grid">
        <div class="kpi-card">
          <apexchart type="radialBar" :options="mrvScoreChartOptions" :series="mrvScoreSeries"></apexchart>
          <p class="kpi-label">Real-time Eligibility Score</p>
        </div>
      </div>
      <div class="chart-grid">
        <div class="chart-card">
          <h4>Eligibility Score Trend</h4>
          <apexchart type="line" :options="mrvTrendChartOptions" :series="mrvTrendSeries"></apexchart>
        </div>
        <div class="chart-card">
          <h4>Contributing Factors</h4>
          <apexchart type="radar" :options="contributingFactorsChartOptions" :series="contributingFactorsSeries"></apexchart>
        </div>
      </div>
    </div>

    <!-- Section 5: Credit Issuance Prediction with Confidence Intervals -->
    <div class="dashboard-section">
      <h3>Credit Issuance Prediction with Confidence Intervals</h3>
      <div class="kpi-grid">
        <div class="kpi-card">
          <p class="kpi-value">1,750</p>
          <p class="kpi-label">Predicted Carbon Credits (Next 12 Months)</p>
        </div>
      </div>
      <div class="chart-grid">
        <div class="chart-card">
          <h4>Predicted Credit Issuance with Confidence Interval</h4>
          <apexchart type="line" :options="predictionLineChartOptions" :series="predictionLineSeries"></apexchart>
        </div>
        <div class="chart-card">
          <h4>Actual vs. Predicted Credit Issuance</h4>
          <apexchart type="bar" :options="historicalComparisonChartOptions" :series="historicalComparisonSeries"></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'CarbonCreditEngineView',
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    // Helper to get CSS variables
    const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name);

    // Section 1: LiDAR + Plot-Based Calibration
    const lidarScatterSeries = ref([
      {
        name: 'LiDAR vs. Plot Data',
        data: [
          { x: 10, y: 12 }, { x: 20, y: 22 }, { x: 30, y: 31 }, { x: 40, y: 43 }, { x: 50, y: 50 },
          { x: 60, y: 61 }, { x: 70, y: 73 }, { x: 80, y: 80 }, { x: 90, y: 92 }, { x: 100, y: 101 },
        ],
      },
    ]);
    const lidarScatterChartOptions = ref({
      chart: { type: 'scatter', height: 350, toolbar: { show: false } },
      xaxis: {
        title: { text: 'Manual Plot Data' },
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      yaxis: {
        title: { text: 'LiDAR Data' },
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      colors: [getCssVar('--color-primary')],
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    const biomassHeatmapSeries = ref([
      { name: 'Zone 1', data: [{ x: 'A', y: 10 }, { x: 'B', y: 20 }, { x: 'C', y: 30 }] },
      { name: 'Zone 2', data: [{ x: 'A', y: 40 }, { x: 'B', y: 50 }, { x: 'C', y: 60 }] },
      { name: 'Zone 3', data: [{ x: 'A', y: 70 }, { x: 'B', y: 80 }, { x: 'C', y: 90 }] },
    ]);
    const biomassHeatmapChartOptions = ref({
      chart: { type: 'heatmap', height: 350, toolbar: { show: false } },
      dataLabels: { enabled: false },
      colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
      xaxis: {
        type: 'category',
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      yaxis: {
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    const deviationBarSeries = ref([
      {
        name: 'Percentage Deviation',
        data: [5, -2, 8, -4, 10, -1, 6, -3, 7, -5],
      },
    ]);
    const deviationBarChartOptions = ref({
      chart: { type: 'bar', height: 350, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Plot 1', 'Plot 2', 'Plot 3', 'Plot 4', 'Plot 5', 'Plot 6', 'Plot 7', 'Plot 8', 'Plot 9', 'Plot 10'],
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      yaxis: {
        title: { text: 'Deviation (%)' },
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      colors: [getCssVar('--color-secondary')],
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    // Section 2: Baseline vs. Actual Carbon Sequestered
    const carbonLineSeries = ref([
      { name: 'Baseline Carbon', data: [1000, 1100, 1050, 1200, 1150, 1300, 1250, 1400, 1350, 1500, 1450, 1600] },
      { name: 'Actual Carbon', data: [1050, 1150, 1100, 1250, 1200, 1350, 1300, 1450, 1400, 1550, 1500, 1650] },
    ]);
    const carbonLineChartOptions = ref({
      chart: { type: 'line', height: 350, toolbar: { show: false } },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      yaxis: {
        title: { text: 'Carbon (tonnes)' },
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      colors: [getCssVar('--color-secondary'), getCssVar('--color-primary')],
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    // Section 3: Dynamic Control Area Generation
    const characteristicsBarSeries = ref([
      { name: 'Control Areas', data: [70, 85, 60] },
      { name: 'Restoration Areas', data: [80, 75, 90] },
    ]);
    const characteristicsBarChartOptions = ref({
      chart: { type: 'bar', height: 350, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Soil Type A', 'Elevation B', 'Land Cover C'],
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      yaxis: {
        title: { text: 'Value' },
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      colors: [getCssVar('--color-secondary'), getCssVar('--color-primary')],
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    // Section 4: Real-time MRV (Measurement, Reporting & Verification) Eligibility Scoring
    const mrvScoreSeries = ref([88]); // Percentage for radial bar
    const mrvScoreChartOptions = ref({
      chart: { height: 200, type: 'radialBar' },
      plotOptions: {
        radialBar: {
          hollow: { size: '70%' },
          dataLabels: {
            showOn: 'always',
            name: { show: true, fontSize: '16px', fontFamily: 'Roboto, Arial, sans-serif', color: getCssVar('--color-text-secondary'), offsetY: -10 },
            value: { show: true, fontSize: '20px', fontFamily: 'Roboto, Arial, sans-serif', color: getCssVar('--color-primary'), offsetY: 5, formatter: (val) => val + '%' },
          },
        },
      },
      fill: { colors: [getCssVar('--color-primary')] },
      stroke: { lineCap: 'round' },
      labels: ['Eligibility Score'],
    });

    const mrvTrendSeries = ref([
      { name: 'Eligibility Score', data: [70, 75, 80, 85, 88, 90, 87, 89, 91, 92, 90, 93] },
    ]);
    const mrvTrendChartOptions = ref({
      chart: { type: 'line', height: 350, toolbar: { show: false } },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      yaxis: {
        title: { text: 'Score (0-100)' },
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      colors: [getCssVar('--color-primary')],
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    const contributingFactorsSeries = ref([
      {
        name: 'Score Contribution',
        data: [80, 75, 90, 85, 95],
      },
    ]);
    const contributingFactorsChartOptions = ref({
      chart: { type: 'radar', height: 350, toolbar: { show: false } },
      xaxis: {
        categories: ['Biomass Growth', 'Weather Impact', 'Reporting Compliance', 'Land Use Change', 'Monitoring Frequency'],
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      yaxis: {
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      colors: [getCssVar('--color-primary')],
      stroke: { width: 2 },
      fill: { opacity: 0.5 },
      markers: { size: 4 },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    // Section 5: Credit Issuance Prediction with Confidence Intervals
    const predictionLineSeries = ref([
      { name: 'Predicted Credits', data: [100, 120, 150, 180, 200, 220, 250, 280, 300, 320, 350, 380] },
      { name: 'Upper Bound', data: [110, 130, 160, 190, 210, 230, 260, 290, 310, 330, 360, 390] },
      { name: 'Lower Bound', data: [90, 110, 140, 170, 190, 210, 240, 270, 290, 310, 340, 370] },
    ]);
    const predictionLineChartOptions = ref({
      chart: { type: 'line', height: 350, toolbar: { show: false } },
      xaxis: {
        categories: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'],
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      yaxis: {
        title: { text: 'Carbon Credits' },
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      colors: [getCssVar('--color-primary'), '#FF4560', '#00E396'], // Predicted, Upper, Lower
      stroke: { curve: 'smooth', width: [3, 1, 1] },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    const historicalComparisonSeries = ref([
      { name: 'Actual Credits', data: [90, 110, 145, 170, 195] },
      { name: 'Predicted Credits', data: [100, 120, 150, 180, 200] },
    ]);
    const historicalComparisonChartOptions = ref({
      chart: { type: 'bar', height: 350, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5'],
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      yaxis: {
        title: { text: 'Carbon Credits' },
        labels: { style: { colors: getCssVar('--chart-label-color') } },
      },
      colors: [getCssVar('--color-secondary'), getCssVar('--color-primary')],
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    return {
      lidarScatterSeries,
      lidarScatterChartOptions,
      biomassHeatmapSeries,
      biomassHeatmapChartOptions,
      deviationBarSeries,
      deviationBarChartOptions,
      carbonLineSeries,
      carbonLineChartOptions,
      characteristicsBarSeries,
      characteristicsBarChartOptions,
      mrvScoreSeries,
      mrvScoreChartOptions,
      mrvTrendSeries,
      mrvTrendChartOptions,
      contributingFactorsSeries,
      contributingFactorsChartOptions,
      predictionLineSeries,
      predictionLineChartOptions,
      historicalComparisonSeries,
      historicalComparisonChartOptions,
    };
  },
};
</script>

<style scoped>
.dashboard-container {
  padding: var(--spacing-lg);
  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  color: var(--color-text-primary);
}

.dashboard-title {
  font-size: var(--font-size-heading2);
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.dashboard-section {
  background-color: #2C2C2C;
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  margin-bottom: var(--spacing-xl);
}

.dashboard-section h3 {
  font-size: var(--font-size-heading3);
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-md);
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.kpi-card {
  background-color: var(--background-color-dark);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  text-align: center;
  box-shadow: var(--card-shadow);
}

.kpi-value {
  font-size: var(--font-size-heading1);
  color: var(--color-accent);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.kpi-label {
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.chart-card {
  background-color: var(--background-color-dark);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.chart-card h4 {
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.single-value-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px; /* Ensure it takes up similar space to a chart */
}

.map-placeholder {
  background-color: #3a3a3a;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text-secondary);
  border-radius: var(--border-radius);
  font-style: italic;
}
</style>