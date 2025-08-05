<template>
  <div class="regenerative-dashboard">
    <!-- KPI Overview Cards -->
    <div class="kpi-overview">
      <div class="kpi-card ecosystem">
        <div class="kpi-icon">🌱</div>
        <div class="kpi-content">
          <div class="kpi-value">385 <span class="kpi-unit">ppm</span></div>
          <div class="kpi-label">CO₂ Concentration</div>
          <div class="kpi-trend positive">↓ 2.3% from last month</div>
        </div>
      </div>
      
      <div class="kpi-card soil">
        <div class="kpi-icon">🌍</div>
        <div class="kpi-content">
          <div class="kpi-value">3.2<span class="kpi-unit">%</span></div>
          <div class="kpi-label">Soil Carbon Content</div>
          <div class="kpi-trend positive">↑ 1.1% from last month</div>
        </div>
      </div>
      
      <div class="kpi-card biomass">
        <div class="kpi-icon">🌾</div>
        <div class="kpi-content">
          <div class="kpi-value">127 <span class="kpi-unit">t/ha</span></div>
          <div class="kpi-label">Biomass Density</div>
          <div class="kpi-trend positive">↑ 5.7% from last month</div>
        </div>
      </div>
      
      <div class="kpi-card projects">
        <div class="kpi-icon">📍</div>
        <div class="kpi-content">
          <div class="kpi-value">2,340 <span class="kpi-unit">ha</span></div>
          <div class="kpi-label">Project Areas</div>
          <div class="kpi-trend positive">↑ 12 ha this week</div>
        </div>
      </div>
    </div>

    <!-- Interactive 3D Map Section -->
    <div class="map-section">
      <div class="map-controls">
        <button @click="toggleNightMode" class="control-btn" :class="{ active: nightMode }">
          {{ nightMode ? '☀️' : '🌙' }} {{ nightMode ? 'Day' : 'Night' }}
        </button>
        <button @click="resetView" class="control-btn">
          🎯 Reset View
        </button>
      </div>
      
      <ThreeDMapView :nightModeControl="nightMode" />
    </div>

    <!-- Analytics Charts Grid -->
    <div class="analytics-grid">
      <div class="chart-card co2-chart">
        <div class="chart-header">
          <h4>🌱 CO₂ Trends</h4>
          <span class="chart-period">Last 12 months</span>
        </div>
        <apexchart type="area" :options="co2ChartOptions" :series="co2Series"></apexchart>
      </div>
      
      <div class="chart-card soil-chart">
        <div class="chart-header">
          <h4>🌍 Soil Carbon Progress</h4>
          <span class="chart-period">Last 12 months</span>
        </div>
        <apexchart type="line" :options="soilChartOptions" :series="soilSeries"></apexchart>
      </div>
      
      <div class="chart-card biomass-chart">
        <div class="chart-header">
          <h4>🌾 Biomass Growth</h4>
          <span class="chart-period">Last 12 months</span>
        </div>
        <apexchart type="bar" :options="biomassChartOptions" :series="biomassSeries"></apexchart>
      </div>
      
      <div class="chart-card projects-chart">
        <div class="chart-header">
          <h4>📍 Project Expansion</h4>
          <span class="chart-period">Last 12 months</span>
        </div>
        <apexchart type="area" :options="projectsChartOptions" :series="projectsSeries"></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ThreeDMapView from '../../components/ThreeDMapView.vue';
export default {
  name: 'LiveProjectMapView',
  components: { ThreeDMapView },
  setup() {
    const ndviSeries = ref([
      {
        name: 'NDVI',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 100, 80, 70],
      },
    ]);

    const ndviChartOptions = ref({
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      colors: [getComputedStyle(document.documentElement).getPropertyValue('--color-primary')],
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color'),
          },
        },
      },
      yaxis: {
        title: {
          text: 'NDVI Value',
          style: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color'),
          },
        },
        labels: {
          style: {
            colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color'),
          },
        },
      },
      grid: {
        borderColor: '#444',
      },
      tooltip: {
        theme: 'dark',
      },
    });

    const selectedIndex = ref('co2');
    const isAnimating = ref(false);
    const animationSpeed = ref(1);
    
    const liveStats = ref({
      activeProjects: 12,
      dataPoints: 1547,
      lastUpdated: new Date()
    });

    // Sample data for different indices
    const indexData = {
      co2: {
        points: [
          [37.7749, -122.4194, 0.8], // San Francisco
          [34.0522, -118.2437, 0.5], // Los Angeles
          [40.7128, -74.0060, 0.9],  // New York
          [41.8781, -87.6298, 0.6],  // Chicago
          [29.7604, -95.3698, 0.7],  // Houston
        ],
        max: 1,
        legend: [
          { label: 'Low (300-350 ppm)', color: '#00FF00' },
          { label: 'Medium (350-400 ppm)', color: '#FFFF00' },
          { label: 'High (400+ ppm)', color: '#FF0000' }
        ]
      },
      soilCarbon: {
        points: [
          [37.7749, -122.4194, 0.3],
          [34.0522, -118.2437, 0.7],
          [40.7128, -74.0060, 0.4],
          [41.8781, -87.6298, 0.8],
          [29.7604, -95.3698, 0.6],
        ],
        max: 1,
        legend: [
          { label: 'Low (0-2%)', color: '#FF4444' },
          { label: 'Medium (2-4%)', color: '#FFAA00' },
          { label: 'High (4%+)', color: '#00AA00' }
        ]
      },
      biomass: {
        points: [
          [37.7749, -122.4194, 0.6],
          [34.0522, -118.2437, 0.4],
          [40.7128, -74.0060, 0.2],
          [41.8781, -87.6298, 0.8],
          [29.7604, -95.3698, 0.9],
        ],
        max: 1,
        legend: [
          { label: 'Low (0-50 t/ha)', color: '#FFDD44' },
          { label: 'Medium (50-150 t/ha)', color: '#88CC00' },
          { label: 'High (150+ t/ha)', color: '#004400' }
        ]
      }
    };

    const currentMetrics = ref([
      { name: 'Average CO₂', value: '385 ppm', trend: 'negative', trendIcon: '↓', change: '-2.3% this month' },
      { name: 'Soil Carbon', value: '3.2%', trend: 'positive', trendIcon: '↑', change: '+1.1% this month' },
      { name: 'Biomass Density', value: '127 t/ha', trend: 'positive', trendIcon: '↑', change: '+5.7% this month' },
      { name: 'Project Areas', value: '2,340 ha', trend: 'positive', trendIcon: '↑', change: '+12 ha this week' }
    ]);

    const trendSeries = ref([
      {
        name: 'CO₂ Concentration',
        data: [390, 388, 385, 382, 380, 378, 375, 373, 370, 368, 365, 362],
      },
    ]);

    const trendChartOptions = ref({
      chart: {
        height: 350,
        type: 'line',
        toolbar: { show: false },
        background: 'transparent'
      },
      colors: ['#4CAF50'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: '#BDBDBD' } },
      },
      yaxis: {
        title: {
          text: 'Index Value',
          style: { color: '#BDBDBD' },
        },
        labels: { style: { colors: '#BDBDBD' } },
      },
      grid: { borderColor: '#444' },
      tooltip: { theme: 'dark' },
    });

    const updateHeatmap = () => {
      // Update legend
      currentLegend.value = indexData[selectedIndex.value].legend;
      
      // Update chart data based on selected index
      if (selectedIndex.value === 'co2') {
        trendSeries.value = [{
          name: 'CO₂ Concentration',
          data: [390, 388, 385, 382, 380, 378, 375, 373, 370, 368, 365, 362]
        }];
      } else if (selectedIndex.value === 'soilCarbon') {
        trendSeries.value = [{
          name: 'Soil Carbon Content',
          data: [2.1, 2.3, 2.5, 2.7, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6]
        }];
      } else if (selectedIndex.value === 'biomass') {
        trendSeries.value = [{
          name: 'Biomass Density',
          data: [85, 90, 95, 100, 105, 110, 115, 120, 125, 127, 130, 135]
        }];
      }
    };

    const toggleAnimation = () => {
      isAnimating.value = !isAnimating.value;
    };

    const currentLegend = ref([
      { label: 'Low', color: '#00FF00' },
      { label: 'Medium', color: '#FFFF00' },
      { label: 'High', color: '#FF0000' }
    ]);

    const indexLabels = {
      co2: "CO₂ Concentration",
      soilCarbon: "Soil Carbon Content",
      biomass: "Biomass Density"
    };

    const formatTime = (date) => {
      return date.toLocaleTimeString();
    }

    // Initialize with default data
    updateHeatmap();
    
    // Update stats periodically
    setInterval(() => {
      liveStats.value.lastUpdated = new Date();
      liveStats.value.dataPoints += Math.floor(Math.random() * 5);
    }, 5000);

    // New chart series for the 4 separate charts
    const co2Series = ref([{
      name: 'CO₂ Levels',
      data: [390, 388, 385, 382, 380, 378, 375, 373, 370, 368, 365, 362]
    }]);
    
    const soilSeries = ref([{
      name: 'Soil Carbon',
      data: [2.1, 2.3, 2.5, 2.7, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6]
    }]);
    
    const biomassSeries = ref([{
      name: 'Biomass',
      data: [85, 90, 95, 100, 105, 110, 115, 120, 125, 127, 130, 135]
    }]);
    
    const projectsSeries = ref([{
      name: 'Project Areas',
      data: [2100, 2150, 2200, 2230, 2250, 2280, 2300, 2310, 2320, 2330, 2340, 2350]
    }]);
    
    // Chart options for each type
    const co2ChartOptions = ref({
      chart: { type: 'area', height: 200, toolbar: { show: false }, sparkline: { enabled: true } },
      colors: ['#4CAF50'],
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.2 } },
      stroke: { curve: 'smooth', width: 2 },
      tooltip: { theme: 'dark' }
    });
    
    const soilChartOptions = ref({
      chart: { type: 'line', height: 200, toolbar: { show: false }, sparkline: { enabled: true } },
      colors: ['#FF6B35'],
      stroke: { curve: 'smooth', width: 3 },
      tooltip: { theme: 'dark' }
    });
    
    const biomassChartOptions = ref({
      chart: { type: 'bar', height: 200, toolbar: { show: false }, sparkline: { enabled: true } },
      colors: ['#FFD23F'],
      plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
      tooltip: { theme: 'dark' }
    });
    
    const projectsChartOptions = ref({
      chart: { type: 'area', height: 200, toolbar: { show: false }, sparkline: { enabled: true } },
      colors: ['#6C5CE7'],
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.2 } },
      stroke: { curve: 'smooth', width: 2 },
      tooltip: { theme: 'dark' }
    });
    
    const nightMode = ref(false);
    
    const toggleNightMode = () => {
      nightMode.value = !nightMode.value;
    };
    
    const resetView = () => {
      // Reset view logic
    };

    return {
      ndviSeries,
      ndviChartOptions,
      selectedIndex,
      isAnimating,
      animationSpeed,
      liveStats,
      updateHeatmap,
      toggleAnimation,
      currentLegend,
      indexLabels,
      formatTime,
      currentMetrics,
      trendSeries,
      trendChartOptions,
      co2Series,
      soilSeries,
      biomassSeries,
      projectsSeries,
      co2ChartOptions,
      soilChartOptions,
      biomassChartOptions,
      projectsChartOptions,
      nightMode,
      toggleNightMode,
      resetView
    };
  },
};
</script>

<style scoped>
.tab-content {
  padding: var(--spacing-lg);
  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  color: var(--color-text-primary);
}

.tab-title {
  font-size: var(--font-size-heading3);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.map-placeholder {
  background-color: #333;
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.map-placeholder h3 {
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
}

.chart-card {
  background-color: #2C2C2C; /* Using card background color */
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  margin-top: var(--spacing-xl);
}

.chart-card h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
}

/* Map Controls */
.map-controls {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-md);
  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.control-group label {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.index-selector,
.speed-slider {
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  border: 1px solid #444;
  background-color: #333;
  color: var(--color-text-primary);
}

.animation-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-primary);
  background-color: transparent;
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.animation-btn:hover,
.animation-btn.active {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
}

/* Map Container */
.map-container {
  margin-top: 0;
  position: relative;
  margin-bottom: var(--spacing-xl);
}

.map-view {
  height: 500px;
  width: 100%;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--card-shadow);
}

/* Legend */
.map-legend {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(44, 44, 44, 0.9);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  z-index: 1000;
}

.map-legend h4 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--color-primary);
  font-size: var(--font-size-small);
}

.legend-scale {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-small);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

.card-panel {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  justify-content: center;
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md);
  background-color: var(--card-background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.card-panel .metric-card {
  flex: 1 1 calc(33.333% - 2 * var(--spacing-md));
  max-width: 300px;
}

@media (max-width: 768px) {
  .card-panel .metric-card {
    flex: 1 1 calc(50% - 2 * var(--spacing-md));
  }
}
.stats-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(44, 44, 44, 0.9);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  z-index: 1000;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-small);
}

.stat-label {
  color: var(--color-text-secondary);
}

.stat-value {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

/* Chart Section */
.chart-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.metric-card {
  background-color: var(--card-background-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  text-align: center;
}

.metric-card h4 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.metric-value {
  font-size: var(--font-size-heading3);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
}

.metric-value.positive {
  color: var(--color-primary);
}

.metric-value.negative {
  color: #FF5252;
}

.trend-icon {
  margin-left: var(--spacing-xs);
  font-size: var(--font-size-small);
}

.metric-change {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
}

/* Regenerative Dashboard Styles */
.regenerative-dashboard {
  padding: var(--spacing-md);
  max-width: 100%;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  min-height: 100vh;
}

/* KPI Overview Cards */
.kpi-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.kpi-card {
  background: rgba(44, 44, 44, 0.95);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.kpi-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.15);
  border-color: rgba(76, 175, 80, 0.4);
}

.kpi-card:hover::before {
  opacity: 1;
}

.kpi-card.ecosystem { border-left: 4px solid #4CAF50; }
.kpi-card.soil { border-left: 4px solid #FF6B35; }
.kpi-card.biomass { border-left: 4px solid #FFD23F; }
.kpi-card.projects { border-left: 4px solid #6C5CE7; }

.kpi-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 50%;
  flex-shrink: 0;
}

.kpi-content {
  flex-grow: 1;
}

.kpi-value {
  font-size: var(--font-size-heading2);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
  line-height: 1.2;
}

.kpi-unit {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-normal);
  opacity: 0.8;
}

.kpi-label {
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  font-weight: var(--font-weight-medium);
}

.kpi-trend {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-success, #10b981);
}

.kpi-trend.positive {
  color: var(--color-success, #10b981);
}

.kpi-trend.negative {
  color: var(--color-error, #ef4444);
}

/* Map Section */
.map-section {
  margin-bottom: var(--spacing-xl);
  position: relative;
}

.map-controls {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 100;
  display: flex;
  gap: var(--spacing-sm);
}

.control-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(44, 44, 44, 0.9);
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--font-size-small);
  backdrop-filter: blur(10px);
}

.control-btn:hover,
.control-btn.active {
  background: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

/* Analytics Grid */
.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.chart-card {
  background: rgba(44, 44, 44, 0.95);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: rgba(76, 175, 80, 0.4);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.chart-header h4 {
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  margin: 0;
  font-weight: var(--font-weight-medium);
}

.chart-period {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
  opacity: 0.8;
}

/* Specific chart card colors */
.co2-chart { border-left: 4px solid #4CAF50; }
.soil-chart { border-left: 4px solid #FF6B35; }
.biomass-chart { border-left: 4px solid #FFD23F; }
.projects-chart { border-left: 4px solid #6C5CE7; }

/* Responsive Design */
@media (max-width: 1200px) {
  .kpi-overview {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  
  .analytics-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .regenerative-dashboard {
    padding: var(--spacing-sm);
  }
  
  .kpi-overview {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
  
  .kpi-card {
    padding: var(--spacing-md);
  }
  
  .kpi-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
  }
  
  .kpi-value {
    font-size: var(--font-size-heading3);
  }
  
  .analytics-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .map-controls {
    position: relative;
    top: auto;
    right: auto;
    margin-bottom: var(--spacing-md);
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .kpi-card {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-sm);
  }
  
  .control-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-xs);
  }
}
</style>
