<template>
  <PageTemplate title="Ecosystem Health Index" subtitle="Assessing water table levels, biodiversity, and microclimate shifts">
    <div class="ecosystem-health-dashboard">

    <div class="dashboard-grid">
      <!-- Section 1: Water Table Levels & Recharge Rates -->
      <div class="section-card">
        <h3>Water Table Levels & Recharge Rates</h3>
        <div class="kpis">
          <div class="kpi-item">
            <span class="kpi-value">{{ currentWaterTableLevel }} m</span>
            <span class="kpi-label">Current Water Table Level</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">{{ monthlyRechargeRate }} mm/month</span>
            <span class="kpi-label">Monthly Recharge Rate</span>
          </div>
        </div>
        <div class="chart-container">
          <apexchart type="line" :options="waterTableLevelChartOptions" :series="waterTableLevelSeries"></apexchart>
          <apexchart type="bar" :options="monthlyRechargeRateChartOptions" :series="monthlyRechargeRateSeries"></apexchart>
        </div>
        <div class="value-card">
          <span class="value-label">Current vs. Historical Average:</span>
          <span class="value-data">{{ waterTableComparison }}</span>
        </div>
      </div>

      <!-- Section 2: Pollinator Counts, Bird Census, Faunal Activity -->
      <div class="section-card">
        <h3>Pollinator Counts, Bird Census, Faunal Activity</h3>
        <div class="kpis">
          <div class="kpi-item">
            <span class="kpi-value">{{ totalPollinatorSightings }}</span>
            <span class="kpi-label">Total Pollinator Sightings</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">{{ totalBirdCount }}</span>
            <span class="kpi-label">Total Bird Count</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">{{ numberOfUniqueSpecies }}</span>
            <span class="kpi-label">Unique Species</span>
          </div>
        </div>
        <div class="chart-container">
          <apexchart type="bar" :options="speciesBreakdownChartOptions" :series="speciesBreakdownSeries"></apexchart>
          <apexchart type="line" :options="keySpeciesTrendChartOptions" :series="keySpeciesTrendSeries"></apexchart>
        </div>
        <div class="value-card">
          <span class="value-label">Biodiversity Score:</span>
          <span class="value-data">{{ biodiversityScore }}</span>
        </div>
      </div>

      <!-- Section 3: Microclimate Shifts Across Zones -->
      <div class="section-card">
        <h3>Microclimate Shifts Across Zones</h3>
        <div class="kpis">
          <div class="kpi-item">
            <span class="kpi-value">{{ currentAverageTemperature }} °C</span>
            <span class="kpi-label">Avg. Temperature</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">{{ currentAverageHumidity }} %</span>
            <span class="kpi-label">Avg. Humidity</span>
          </div>
        </div>
        <div class="chart-container">
          <apexchart type="radar" :options="microclimateRadarChartOptions" :series="microclimateRadarSeries"></apexchart>
          <apexchart type="line" :options="temperatureTrendChartOptions" :series="temperatureTrendSeries"></apexchart>
        </div>
      </div>

      <!-- Section 4: Soil Organic Carbon % -->
      <div class="section-card">
        <h3>Soil Organic Carbon %</h3>
        <div class="kpis">
          <div class="kpi-item">
            <span class="kpi-value">{{ latestSoilOrganicCarbon }} %</span>
            <span class="kpi-label">Latest SOC %</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">{{ yearOverYearChange }} %</span>
            <span class="kpi-label">Year-over-Year Change</span>
          </div>
        </div>
        <div class="chart-container">
          <apexchart type="line" :options="socTrendChartOptions" :series="socTrendSeries"></apexchart>
          <apexchart type="bar" :options="plotComparisonChartOptions" :series="plotComparisonSeries"></apexchart>
        </div>
      </div>
    </div>
    </div>
  </PageTemplate>
</template>

<script>
import { ref } from 'vue';
import PageTemplate from '../../components/PageTemplate.vue';

export default {
  name: 'EcosystemHealthIndexView',
  components: {
    PageTemplate
  },
  setup() {
    // Section 1: Water Table Levels & Recharge Rates
    const currentWaterTableLevel = ref(15.2); // meters below surface
    const monthlyRechargeRate = ref(75); // mm/month
    const waterTableComparison = ref('-2.5m vs Avg'); // Example comparison

    const waterTableLevelSeries = ref([
      {
        name: 'Water Table Level (m)',
        data: [18.5, 17.9, 17.2, 16.8, 16.5, 16.0, 15.8, 15.5, 15.2, 15.0, 14.8, 14.5, 14.2, 14.0, 13.8, 13.5, 13.2, 13.0, 12.8, 12.5, 12.2, 12.0, 11.8, 11.5],
      },
    ]);
    const waterTableLevelChartOptions = ref({
      chart: { height: 250, type: 'line', toolbar: { show: false } },
      colors: ['#007bff'],
      stroke: { curve: 'smooth' },
      xaxis: { categories: Array.from({length: 24}, (_, i) => `Month ${i + 1}`), labels: { style: { colors: '#ccc' } } },
      yaxis: { title: { text: 'Level (m)' }, labels: { style: { colors: '#ccc' } } },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    const monthlyRechargeRateSeries = ref([
      {
        name: 'Monthly Recharge Rate (mm)',
        data: [60, 70, 80, 75, 65, 90, 85, 70, 75, 80, 95, 100],
      },
    ]);
    const monthlyRechargeRateChartOptions = ref({
      chart: { height: 250, type: 'bar', toolbar: { show: false } },
      colors: ['#28a745'],
      plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], labels: { style: { colors: '#ccc' } } },
      yaxis: { title: { text: 'Recharge (mm)' }, labels: { style: { colors: '#ccc' } } },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    // Section 2: Pollinator Counts, Bird Census, Faunal Activity
    const totalPollinatorSightings = ref(1250);
    const totalBirdCount = ref(320);
    const numberOfUniqueSpecies = ref(85);
    const biodiversityScore = ref(7.8); // Example score

    const speciesBreakdownSeries = ref([
      {
        name: 'Birds',
        data: [120, 130, 140, 150, 160, 170],
      },
      {
        name: 'Insects',
        data: [300, 350, 400, 450, 500, 550],
      },
      {
        name: 'Mammals',
        data: [30, 35, 40, 45, 50, 55],
      },
    ]);
    const speciesBreakdownChartOptions = ref({
      chart: { height: 250, type: 'bar', stacked: true, toolbar: { show: false } },
      colors: ['#fd7e14', '#ffc107', '#17a2b8'],
      plotOptions: { bar: { horizontal: false } },
      xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'], labels: { style: { colors: '#ccc' } } },
      yaxis: { title: { text: 'Count' }, labels: { style: { colors: '#ccc' } } },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    const keySpeciesTrendSeries = ref([
      {
        name: 'Bee Count (per sq km)',
        data: [50, 55, 60, 58, 62, 65, 63, 68, 70, 67, 72, 75],
      },
    ]);
    const keySpeciesTrendChartOptions = ref({
      chart: { height: 250, type: 'line', toolbar: { show: false } },
      colors: ['#6f42c1'],
      stroke: { curve: 'smooth' },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], labels: { style: { colors: '#ccc' } } },
      yaxis: { title: { text: 'Count' }, labels: { style: { colors: '#ccc' } } },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    // Section 3: Microclimate Shifts Across Zones
    const currentAverageTemperature = ref(25.5);
    const currentAverageHumidity = ref(68.2);

    const microclimateRadarSeries = ref([
      {
        name: 'Zone A',
        data: [25, 70, 15],
      },
      {
        name: 'Zone B',
        data: [28, 65, 12],
      },
      {
        name: 'Zone C',
        data: [22, 75, 18],
      },
    ]);
    const microclimateRadarChartOptions = ref({
      chart: { height: 300, type: 'radar', toolbar: { show: false } },
      colors: ['#dc3545', '#ffc107', '#007bff'],
      xaxis: { categories: ['Avg Temp (°C)', 'Humidity (%)', 'Wind Speed (km/h)'], labels: { style: { colors: ['#ccc', '#ccc', '#ccc'] } } },
      yaxis: { show: false },
      plotOptions: { radar: { polygons: { strokeColors: '#444', fill: { colors: ['#333', '#222'] } } } },
      tooltip: { theme: 'dark' },
    });

    const temperatureTrendSeries = ref([
      {
        name: 'Zone A',
        data: [24, 25, 26, 25, 24, 23, 22, 23, 24, 25, 26, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15],
      },
      {
        name: 'Zone B',
        data: [26, 27, 28, 27, 26, 25, 24, 25, 26, 27, 28, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17],
      },
      {
        name: 'Zone C',
        data: [22, 23, 24, 23, 22, 21, 20, 21, 22, 23, 24, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13],
      },
    ]);
    const temperatureTrendChartOptions = ref({
      chart: { height: 250, type: 'line', toolbar: { show: false } },
      colors: ['#dc3545', '#ffc107', '#007bff'],
      stroke: { curve: 'smooth' },
      xaxis: { categories: Array.from({length: 24}, (_, i) => `${i}:00`), labels: { style: { colors: '#ccc' } } },
      yaxis: { title: { text: 'Temperature (°C)' }, labels: { style: { colors: '#ccc' } } },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    // Section 4: Soil Organic Carbon %
    const latestSoilOrganicCarbon = ref(2.8);
    const yearOverYearChange = ref(0.3); // Percentage point change

    const socTrendSeries = ref([
      {
        name: 'Soil Organic Carbon (%)',
        data: [1.5, 1.7, 1.9, 2.1, 2.3, 2.5, 2.6, 2.7, 2.8],
      },
    ]);
    const socTrendChartOptions = ref({
      chart: { height: 250, type: 'line', toolbar: { show: false } },
      colors: ['#6610f2'],
      stroke: { curve: 'smooth' },
      xaxis: { categories: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9'], labels: { style: { colors: '#ccc' } } },
      yaxis: { title: { text: 'SOC (%)' }, labels: { style: { colors: '#ccc' } } },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    const plotComparisonSeries = ref([
      {
        name: 'Soil Organic Carbon (%)',
        data: [2.5, 2.8, 2.3, 2.9, 2.7],
      },
    ]);
    const plotComparisonChartOptions = ref({
      chart: { height: 250, type: 'bar', toolbar: { show: false } },
      colors: ['#20c997'],
      plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: { categories: ['Plot A', 'Plot B', 'Plot C', 'Plot D', 'Plot E'], labels: { style: { colors: '#ccc' } } },
      yaxis: { title: { text: 'SOC (%)' }, labels: { style: { colors: '#ccc' } } },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });


    return {
      currentWaterTableLevel,
      monthlyRechargeRate,
      waterTableComparison,
      waterTableLevelSeries,
      waterTableLevelChartOptions,
      monthlyRechargeRateSeries,
      currentAverageTemperature,
      currentAverageHumidity,
      monthlyRechargeRateChartOptions,
      totalPollinatorSightings,
      totalBirdCount,
      numberOfUniqueSpecies,
      biodiversityScore,
      speciesBreakdownSeries,
      speciesBreakdownChartOptions,
      keySpeciesTrendSeries,
      keySpeciesTrendChartOptions,
      microclimateRadarSeries,
      microclimateRadarChartOptions,
      temperatureTrendSeries,
      temperatureTrendChartOptions,
      latestSoilOrganicCarbon,
      yearOverYearChange,
      socTrendSeries,
      socTrendChartOptions,
      plotComparisonSeries,
      plotComparisonChartOptions,
    };
  },
};
</script>

<style scoped>
.ecosystem-health-dashboard {
  padding: 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: var(--spacing-xl);
  auto-rows: min-content;
}

.section-card {
  background: var(--card-background-color);
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-normal);
}

.section-card:hover {
  box-shadow: var(--card-shadow-hover);
  transform: translateY(-2px);
}

.section-card h3 {
  color: var(--color-text-primary);
  font-size: var(--font-size-heading4);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
  text-align: center;
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.kpis {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.kpi-item {
  text-align: center;
  background: var(--color-background-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  transition: all var(--transition-fast);
  min-width: 140px;
}

.kpi-item:hover {
  background: var(--color-surface-elevated);
  transform: translateY(-1px);
}

.kpi-value {
  font-size: var(--font-size-heading3);
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  display: block;
  margin-bottom: var(--spacing-xs);
  line-height: var(--line-height-tight);
}

.kpi-label {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.chart-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.chart-container > * {
  background: var(--color-background-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .chart-container {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

.value-card {
  background: var(--color-surface-elevated);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all var(--transition-fast);
}

.value-card:hover {
  background: var(--card-background-elevated);
  transform: translateY(-1px);
}

.value-label {
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.value-data {
  font-size: var(--font-size-heading4);
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    gap: var(--spacing-md);
  }
  
  .section-card {
    padding: var(--spacing-lg);
  }
  
  .kpis {
    flex-direction: column;
  }
  
  .kpi-item {
    min-width: auto;
  }
}
</style>