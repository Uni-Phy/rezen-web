<template>
  <div class="tab-content">
    <h2 class="tab-title">Ecosystem Health Index</h2>

    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Soil Organic Carbon %</h3>
        <apexchart type="line" :options="socChartOptions" :series="socSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>Water Table Levels</h3>
        <apexchart type="radialBar" :options="waterTableChartOptions" :series="waterTableSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>Pollinator Counts</h3>
        <p class="metric-value">150+</p>
        <p class="metric-description">Bird Census: <span>75+ species</span></p>
      </div>

      <div class="metric-card">
        <h3>Microclimate Shifts</h3>
        <p class="metric-description">Monitoring ongoing across zones.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'EcosystemHealthIndexView',
  setup() {
    const socSeries = ref([
      {
        name: 'Soil Organic Carbon (%)',
        data: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3],
      },
    ]);

    const socChartOptions = ref({
      chart: {
        height: 250,
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
          text: 'SOC (%)',
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

    const waterTableSeries = ref([65]); // Percentage for radial bar

    const waterTableChartOptions = ref({
      chart: {
        height: 200,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Roboto, Arial, sans-serif',
              color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary'),
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '20px',
              fontFamily: 'Roboto, Arial, sans-serif',
              color: getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
              offsetY: 5,
              formatter: function (val) {
                return val + '%';
              }
            }
          }
        }
      },
      fill: {
        colors: [getComputedStyle(document.documentElement).getPropertyValue('--color-primary')]
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Water Level'],
    });

    return {
      socSeries,
      socChartOptions,
      waterTableSeries,
      waterTableChartOptions,
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

.metric-description {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
}
</style>