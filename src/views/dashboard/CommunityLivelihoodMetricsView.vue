<template>
  <div class="tab-content">
    <h2 class="tab-title">Community & Livelihood Metrics</h2>

    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Labour Days Generated</h3>
        <apexchart type="bar" :options="labourDaysChartOptions" :series="labourDaysSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>Women/Tribal Employment %</h3>
        <apexchart type="radialBar" :options="employmentChartOptions" :series="employmentSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>Training Hours</h3>
        <p class="metric-value">500+</p>
        <p class="metric-description">Local Capacity Building: <span>Ongoing</span></p>
      </div>

      <div class="metric-card">
        <h3>Household Nutrition & Income</h3>
        <p class="metric-description">Linked to project zones.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CommunityLivelihoodMetricsView',
  setup() {
    const labourDaysSeries = ref([
      {
        name: 'Labour Days',
        data: [120, 150, 130, 180, 160, 200],
      },
    ]);

    const labourDaysChartOptions = ref({
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
        categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
        labels: {
          style: {
            colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color'),
          },
        },
      },
      yaxis: {
        title: {
          text: 'Labour Days',
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

    const employmentSeries = ref([60]); // Percentage for radial bar

    const employmentChartOptions = ref({
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
      labels: ['Employment %'],
    });

    return {
      labourDaysSeries,
      labourDaysChartOptions,
      employmentSeries,
      employmentChartOptions,
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