<template>
  <div class="dashboard-container">
    <h2 class="dashboard-title">Project Portfolio Dashboard</h2>

    <div class="dashboard-grid">
      <!-- Section 1: Total Area Under Restoration -->
      <div class="dashboard-section">
        <h3>Total Area Under Restoration</h3>
        <div class="kpi-container">
          <p class="kpi-value">15,000 Hectares</p>
        </div>
        <div class="chart-container">
          <apexchart type="area" :options="areaRestorationChartOptions" :series="areaRestorationSeries"></apexchart>
        </div>
        <div class="chart-container">
          <apexchart type="donut" :options="restorationTypeChartOptions" :series="restorationTypeSeries"></apexchart>
        </div>
      </div>

      <!-- Section 2: Verified vs. Expected Carbon Credits -->
      <div class="dashboard-section">
        <h3>Verified vs. Expected Carbon Credits</h3>
        <div class="kpi-container">
          <p class="kpi-value">Expected: <span>100,000</span></p>
          <p class="kpi-value">Verified: <span>85,000</span></p>
          <p class="kpi-value">Rate: <span>85%</span></p>
        </div>
        <div class="chart-container">
          <apexchart type="line" :options="carbonCreditsLineChartOptions" :series="carbonCreditsLineSeries"></apexchart>
        </div>
        <div class="chart-container">
          <apexchart type="bar" :options="verifiedUnverifiedChartOptions" :series="verifiedUnverifiedSeries"></apexchart>
        </div>
      </div>

      <!-- Section 3: Biodiversity Indices -->
      <div class="dashboard-section">
        <h3>Biodiversity Indices</h3>
        <div class="kpi-container">
          <p class="kpi-value">Total Species Count: <span>450</span></p>
          <p class="kpi-value">Camera Trap Sightings: <span>1,200</span></p>
        </div>
        <div class="chart-container">
          <apexchart type="line" :options="cameraTrapChartOptions" :series="cameraTrapSeries"></apexchart>
        </div>
        <div class="chart-container">
          <apexchart type="bar" :options="topSpeciesChartOptions" :series="topSpeciesSeries"></apexchart>
        </div>
        <div class="chart-container">
          <apexchart type="radialBar" :options="biodiversityScoreChartOptions" :series="biodiversityScoreSeries"></apexchart>
        </div>
      </div>

      <!-- Section 4: Cumulative Rainfall and Extreme Weather Events Tracked -->
      <div class="dashboard-section">
        <h3>Cumulative Rainfall and Extreme Weather Events Tracked</h3>
        <div class="kpi-container">
          <p class="kpi-value">Rainfall (12 Months): <span>1,500 mm</span></p>
          <p class="kpi-value">Extreme Events (12 Months): <span>3</span></p>
        </div>
        <div class="chart-container">
          <apexchart type="bar" :options="rainfallChartOptions" :series="rainfallSeries"></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ProjectPortfolioDashboardView',
  setup() {
    // Mock Data for Section 1: Total Area Under Restoration
    const areaRestorationSeries = ref([{
      name: 'Restored Area',
      data: [1000, 1500, 2000, 2500, 3000, 4000, 5000, 7000, 9000, 11000, 13000, 15000]
    }]);
    const areaRestorationChartOptions = ref({
      chart: {
        type: 'area',
        height: 200,
        toolbar: { show: false },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      yaxis: {
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      colors: [getComputedStyle(document.documentElement).getPropertyValue('--color-primary')],
      tooltip: { theme: 'dark' },
      grid: { borderColor: '#444' },
    });

    const restorationTypeSeries = ref([44, 55, 13]);
    const restorationTypeChartOptions = ref({
      chart: {
        type: 'donut',
        height: 200,
      },
      labels: ['Regenerative Agriculture', 'Forest Regeneration', 'Wetland Restoration'],
      colors: [
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-secondary'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-accent'),
      ],
      legend: {
        labels: { colors: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary') },
      },
      dataLabels: { enabled: true },
      tooltip: { theme: 'dark' },
    });

    // Mock Data for Section 2: Verified vs. Expected Carbon Credits
    const carbonCreditsLineSeries = ref([
      {
        name: 'Expected Credits',
        data: [5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000]
      },
      {
        name: 'Verified Credits',
        data: [4500, 5500, 6500, 7500, 8500, 9500, 10500, 11500, 12500, 13500, 14500, 15500, 16500, 17500, 18500, 19500, 20500, 21500, 22500, 23500, 24500, 25500, 26500, 27500]
      }
    ]);
    const carbonCreditsLineChartOptions = ref({
      chart: {
        height: 200,
        type: 'line',
        toolbar: { show: false },
      },
      xaxis: {
        categories: Array.from({ length: 24 }, (_, i) => `Month ${i + 1}`),
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      yaxis: {
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      colors: [
        getComputedStyle(document.documentElement).getPropertyValue('--color-secondary'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
      ],
      tooltip: { theme: 'dark' },
      grid: { borderColor: '#444' },
    });

    const verifiedUnverifiedSeries = ref([
      {
        name: 'Verified',
        data: [70, 80, 65, 90, 75]
      },
      {
        name: 'Unverified',
        data: [30, 20, 35, 10, 25]
      }
    ]);
    const verifiedUnverifiedChartOptions = ref({
      chart: {
        type: 'bar',
        height: 200,
        stacked: true,
        toolbar: { show: false },
      },
      xaxis: {
        categories: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'],
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      yaxis: {
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      colors: [
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')
      ],
      legend: {
        labels: { colors: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary') },
      },
      tooltip: { theme: 'dark' },
      grid: { borderColor: '#444' },
    });

    // Mock Data for Section 3: Biodiversity Indices
    const cameraTrapSeries = ref([{
      name: 'Sightings',
      data: [50, 60, 70, 80, 75, 90, 100, 110, 105, 120, 115, 130]
    }]);
    const cameraTrapChartOptions = ref({
      chart: {
        type: 'line',
        height: 200,
        toolbar: { show: false },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      yaxis: {
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      colors: [getComputedStyle(document.documentElement).getPropertyValue('--color-primary')],
      tooltip: { theme: 'dark' },
      grid: { borderColor: '#444' },
    });

    const topSpeciesSeries = ref([{
      name: 'Sightings',
      data: [150, 120, 100, 90, 80, 70, 60, 50, 40, 30]
    }]);
    const topSpeciesChartOptions = ref({
      chart: {
        type: 'bar',
        height: 200,
        toolbar: { show: false },
      },
      xaxis: {
        categories: ['Deer', 'Wild Boar', 'Fox', 'Rabbit', 'Owl', 'Hawk', 'Snake', 'Lizard', 'Frog', 'Squirrel'],
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      yaxis: {
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      colors: [getComputedStyle(document.documentElement).getPropertyValue('--color-accent')],
      tooltip: { theme: 'dark' },
      grid: { borderColor: '#444' },
    });

    const biodiversityScoreSeries = ref([75]);
    const biodiversityScoreChartOptions = ref({
      chart: {
        height: 200,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: { size: '70%' },
          dataLabels: {
            showOn: 'always',
            name: { show: true, fontSize: '16px', color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary'), offsetY: -10 },
            value: { show: true, fontSize: '20px', color: getComputedStyle(document.documentElement).getPropertyValue('--color-primary'), offsetY: 5, formatter: function (val) { return val + '%'; } }
          }
        }
      },
      fill: { colors: [getComputedStyle(document.documentElement).getPropertyValue('--color-primary')] },
      stroke: { lineCap: 'round' },
      labels: ['Biodiversity Health Score'],
      tooltip: { theme: 'dark' },
    });

    // Mock Data for Section 4: Cumulative Rainfall and Extreme Weather Events Tracked
    const rainfallSeries = ref([
      {
        name: 'Monthly Rainfall',
        type: 'bar',
        data: [100, 120, 150, 130, 160, 180, 200, 190, 170, 140, 110, 90]
      },
      {
        name: 'Cumulative Rainfall',
        type: 'line',
        data: [100, 220, 370, 500, 660, 840, 1040, 1230, 1400, 1540, 1650, 1740]
      }
    ]);
    const rainfallChartOptions = ref({
      chart: {
        height: 200,
        type: 'line',
        stacked: false,
        toolbar: { show: false },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color') } },
      },
      yaxis: [
        {
          axisTicks: { show: true },
          axisBorder: { show: true, color: getComputedStyle(document.documentElement).getPropertyValue('--color-primary') },
          labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--color-primary') } },
          title: { text: 'Rainfall (mm)', style: { color: getComputedStyle(document.documentElement).getPropertyValue('--color-primary') } },
          tooltip: { enabled: true }
        },
        {
          axisTicks: { show: true },
          axisBorder: { show: true, color: getComputedStyle(document.documentElement).getPropertyValue('--color-secondary') },
          labels: { style: { colors: getComputedStyle(document.documentElement).getPropertyValue('--color-secondary') } },
          title: { text: 'Cumulative Rainfall (mm)', style: { color: getComputedStyle(document.documentElement).getPropertyValue('--color-secondary') } },
          opposite: true
        }
      ],
      annotations: {
        points: [
          { x: 'Mar', y: 150, marker: { size: 6, fillColor: '#FF4560', strokeColor: '#FF4560' }, label: { borderColor: '#FF4560', offsetY: 0, style: { color: '#fff', background: '#FF4560' }, text: 'Storm' } },
          { x: 'Jul', y: 200, marker: { size: 6, fillColor: '#00E396', strokeColor: '#00E396' }, label: { borderColor: '#00E396', offsetY: 0, style: { color: '#fff', background: '#00E396' }, text: 'Flood' } },
          { x: 'Sep', y: 170, marker: { size: 6, fillColor: '#FEB019', strokeColor: '#FEB019' }, label: { borderColor: '#FEB019', offsetY: 0, style: { color: '#fff', background: '#FEB019' }, text: 'Drought' } }
        ]
      },
      colors: [
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')
      ],
      tooltip: { theme: 'dark' },
      grid: { borderColor: '#444' },
    });

    return {
      areaRestorationSeries,
      areaRestorationChartOptions,
      restorationTypeSeries,
      restorationTypeChartOptions,
      carbonCreditsLineSeries,
      carbonCreditsLineChartOptions,
      verifiedUnverifiedSeries,
      verifiedUnverifiedChartOptions,
      cameraTrapSeries,
      cameraTrapChartOptions,
      topSpeciesSeries,
      topSpeciesChartOptions,
      biodiversityScoreSeries,
      biodiversityScoreChartOptions,
      rainfallSeries,
      rainfallChartOptions,
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
  font-size: var(--font-size-heading3);
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--spacing-lg);
  height: calc(100vh - 200px); /* Adjust based on header/footer height */
}

.dashboard-section {
  background-color: #2C2C2C;
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: auto; /* Enable scrolling for content within sections */
}

.dashboard-section h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
}

.kpi-container {
  margin-bottom: var(--spacing-lg);
}

.kpi-value {
  font-size: var(--font-size-heading1);
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.kpi-value span {
  color: var(--color-accent);
}

.chart-container {
  width: 100%;
  margin-bottom: var(--spacing-md);
}
</style>