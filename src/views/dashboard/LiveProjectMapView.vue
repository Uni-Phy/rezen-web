<template>
  <div class="tab-content">
    <h2 class="tab-title">Live Project Map View</h2>
    
    <!-- Map Controls -->
    <div class="map-controls">
      <div class="control-group">
        <label>Select Index:</label>
        <select v-model="selectedIndex" @change="updateHeatmap" class="index-selector">
          <option value="co2">CO₂ Concentration</option>
          <option value="soilCarbon">Soil Carbon Content</option>
          <option value="biomass">Biomass Density</option>
        </select>
      </div>
      
      <div class="control-group">
        <label>Animation:</label>
        <button @click="toggleAnimation" class="animation-btn" :class="{ active: isAnimating }">
          {{ isAnimating ? 'Pause' : 'Play' }} Time-lapse
        </button>
      </div>
      
      <div class="control-group" v-if="isAnimating">
        <label>Speed: {{ animationSpeed }}x</label>
        <input type="range" v-model="animationSpeed" min="0.5" max="3" step="0.5" class="speed-slider">
      </div>
    </div>

    <!-- Map Container -->
    <div class="map-container">
      <div id="mapid" class="map-view"></div>
      
      <!-- Legend -->
      <div class="map-legend">
        <h4>{{ indexLabels[selectedIndex] }}</h4>
        <div class="legend-scale">
          <div class="legend-item" v-for="(item, index) in currentLegend" :key="index">
            <div class="legend-color" :style="{ backgroundColor: item.color }"></div>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
      
      <!-- Live Stats Panel -->
      <div class="stats-panel">
        <div class="stat-item">
          <span class="stat-label">Active Projects</span>
          <span class="stat-value">{{ liveStats.activeProjects }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Data Points</span>
          <span class="stat-value">{{ liveStats.dataPoints }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Last Updated</span>
          <span class="stat-value">{{ formatTime(liveStats.lastUpdated) }}</span>
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="chart-section">
      <div class="chart-card">
        <h3>{{ indexLabels[selectedIndex] }} Trend Over Time</h3>
        <apexchart type="line" :options="trendChartOptions" :series="trendSeries"></apexchart>
      </div>
      
      <!-- Real-time metrics -->
      <div class="metrics-grid">
        <div class="metric-card" v-for="metric in currentMetrics" :key="metric.name">
          <h4>{{ metric.name }}</h4>
          <div class="metric-value" :class="metric.trend">
            {{ metric.value }}
            <span class="trend-icon">{{ metric.trendIcon }}</span>
          </div>
          <div class="metric-change">{{ metric.change }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

export default {
  name: 'LiveProjectMapView',
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

    const map = ref(null);
    const heatmapLayer = ref(null);
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
      if (heatmapLayer.value) {
        map.value.removeLayer(heatmapLayer.value);
      }

      const data = indexData[selectedIndex.value];
      heatmapLayer.value = L.heatLayer(data.points, {
        radius: 25,
        max: data.max,
        gradient: {
          0.0: 'blue',
          0.3: 'cyan', 
          0.5: 'lime',
          0.7: 'yellow',
          1.0: 'red'
        }
      }).addTo(map.value);
      
      // Update legend
      currentLegend.value = data.legend;
      
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

    onMounted(() => {
      map.value = L.map('mapid').setView([39.8283, -98.5795], 3);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map.value);

      updateHeatmap();
      
      // Update stats periodically
      setInterval(() => {
        liveStats.value.lastUpdated = new Date();
        liveStats.value.dataPoints += Math.floor(Math.random() * 5);
      }, 5000);
    });

    return {
      ndviSeries,
      ndviChartOptions,
      map,
      heatmapLayer,
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
      trendChartOptions
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

  transition: all 0.3s ease;
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
</style>