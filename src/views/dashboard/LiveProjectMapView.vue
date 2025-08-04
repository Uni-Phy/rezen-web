<template>
  <div class="tab-content">
    <h2 class="tab-title">Live Project Map View</h2>
    <div class="map-placeholder">
      <h3>Interactive Map Placeholder</h3>
      <p>Real-time satellite imagery (NDVI, canopy, biomass).</p>
      <p>Parcel-level polygon overlays (forest, agri-zones, buffer, restoration zones).</p>
      <p>Weather overlays (precipitation, temperature, soil moisture).</p>
      <p>Map integration would go here using a library like Leaflet or Mapbox.</p>
    </div>

    <div class="chart-card">
      <h3>NDVI Trend Over Time</h3>
      <apexchart type="line" :options="ndviChartOptions" :series="ndviSeries"></apexchart>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

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

    return {
      ndviSeries,
      ndviChartOptions,
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
</style>