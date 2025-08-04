<template>
  <div class="tab-content">
    <h2 class="tab-title">Field Data Tracker</h2>

    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Crop Health Score</h3>
        <apexchart type="radialBar" :options="cropHealthChartOptions" :series="cropHealthSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>Recent Field Logs</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Practice</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-07-28</td>
                <td>Mulching</td>
                <td>Applied organic mulch to Zone B.</td>
              </tr>
              <tr>
                <td>2024-07-25</td>
                <td>Pest Monitoring</td>
                <td>No significant pest activity detected.</td>
              </tr>
              <tr>
                <td>2024-07-20</td>
                <td>Compost Application</td>
                <td>Compost applied to agri-zones.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="chart-card">
      <h3>Biomass Sampling Data</h3>
      <apexchart type="bar" :options="biomassChartOptions" :series="biomassSeries"></apexchart>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'FieldDataTrackerView',
  setup() {
    const cropHealthSeries = ref([85]); // Percentage for radial bar

    const cropHealthChartOptions = ref({
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
      labels: ['Health Score'],
    });

    const biomassSeries = ref([
      {
        name: 'Biomass (kg/m²)',
        data: [1.2, 1.5, 1.3, 1.8, 1.6, 2.0],
      },
    ]);

    const biomassChartOptions = ref({
      chart: {
        type: 'bar',
        height: 250,
        toolbar: {
          show: false,
        },
      },
      colors: [getComputedStyle(document.documentElement).getPropertyValue('--color-primary')],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Plot 1', 'Plot 2', 'Plot 3', 'Plot 4', 'Plot 5', 'Plot 6'],
        labels: {
          style: {
            colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color'),
          },
        },
      },
      yaxis: {
        title: {
          text: 'Biomass (kg/m²)',
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
      cropHealthSeries,
      cropHealthChartOptions,
      biomassSeries,
      biomassChartOptions,
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

.table-container {
  width: 100%;
  overflow-x: auto;
  margin-top: var(--spacing-md);
}

table {
  width: 100%;
  border-collapse: collapse;
  color: var(--color-text-secondary);
}

th, td {
  border: 1px solid #444;
  padding: var(--spacing-sm);
  text-align: left;
}

th {
  background-color: #333;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.chart-card {
  background-color: #2C2C2C;
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