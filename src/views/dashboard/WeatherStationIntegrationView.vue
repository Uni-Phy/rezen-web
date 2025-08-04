<template>
  <div class="tab-content">
    <h2 class="tab-title">Weather Station Integration</h2>

    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Current Temperature</h3>
        <p class="metric-value">28°C</p>
        <apexchart type="line" :options="tempChartOptions" :series="tempSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>Daily Rainfall</h3>
        <p class="metric-value">5.2 mm</p>
        <apexchart type="bar" :options="rainfallChartOptions" :series="rainfallSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>Humidity</h3>
        <p class="metric-value">65%</p>
      </div>

      <div class="metric-card">
        <h3>Soil Moisture</h3>
        <p class="metric-value">35%</p>
      </div>
    </div>

    <div class="alert-system-placeholder chart-card">
      <h3>Alert System</h3>
      <p>Real-time alerts for anomalies (e.g., drought stress, heatwaves) would be displayed here.</p>
      <ul>
        <li><span class="alert-status critical">Critical:</span> Drought stress detected in Zone A.</li>
        <li><span class="alert-status warning">Warning:</span> High temperature alert for next 24 hours.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'WeatherStationIntegrationView',
  setup() {
    const tempSeries = ref([
      {
        name: 'Temperature (°C)',
        data: [25, 26, 27, 28, 27, 29, 30, 29, 28, 27, 26, 25],
      },
    ]);

    const tempChartOptions = ref({
      chart: {
        height: 200,
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
        categories: ['1h ago', '2h ago', '3h ago', '4h ago', '5h ago', '6h ago', '7h ago', '8h ago', '9h ago', '10h ago', '11h ago', '12h ago'],
        labels: {
          style: {
            colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color'),
          },
        },
      },
      yaxis: {
        title: {
          text: 'Temperature (°C)',
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

    const rainfallSeries = ref([
      {
        name: 'Rainfall (mm)',
        data: [2.3, 1.5, 0.0, 5.2, 0.0, 0.8, 3.1],
      },
    ]);

    const rainfallChartOptions = ref({
      chart: {
        height: 200,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      colors: [getComputedStyle(document.documentElement).getPropertyValue('--color-primary')],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        labels: {
          style: {
            colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color'),
          },
        },
      },
      yaxis: {
        title: {
          text: 'Rainfall (mm)',
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
      tempSeries,
      tempChartOptions,
      rainfallSeries,
      rainfallChartOptions,
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
  margin-bottom: var(--spacing-xl);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.metric-card {
  background-color: #2C2C2C;
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  text-align: center;
}

.metric-card h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
}

.metric-value {
  font-size: var(--font-size-heading1);
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.alert-system-placeholder {
  background-color: #2C2C2C;
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
}

.alert-system-placeholder h3 {
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
}

.alert-system-placeholder ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.alert-system-placeholder li {
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
</style>