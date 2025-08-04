<template>
  <div class="tab-content">
    <h2 class="tab-title">Project Portfolio Dashboard</h2>

    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Total Area Under Restoration</h3>
        <p class="metric-value">12,345 Hectares</p>
        <apexchart type="radialBar" :options="areaChartOptions" :series="areaSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>Verified vs Expected Carbon Credits</h3>
        <apexchart type="bar" :options="carbonCreditsChartOptions" :series="carbonCreditsSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>Biodiversity Indices</h3>
        <p class="metric-value">Species Count: <span>450+</span></p>
        <p class="metric-value">Camera Trap Sightings: <span>1,200+</span></p>
      </div>

      <div class="metric-card">
        <h3>Cumulative Rainfall</h3>
        <p class="metric-value">1,500 mm</p>
        <p class="metric-description">Extreme Weather Events Tracked: <span>3</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ProjectPortfolioDashboardView',
  setup() {
    const areaSeries = ref([75]); // Percentage for radial bar

    const areaChartOptions = ref({
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
      labels: ['Restoration Progress'],
    });

    const carbonCreditsSeries = ref([
      {
        name: 'Verified Credits',
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: 'Expected Credits',
        data: [53, 32, 33, 52, 13, 44],
      },
    ]);

    const carbonCreditsChartOptions = ref({
      chart: {
        type: 'bar',
        height: 250,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: [
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900,
                color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-primary'),
              }
            }
          }
        },
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
        labels: {
          style: {
            colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color'),
          },
        },
      },
      legend: {
        labels: {
          colors: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary'),
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
      areaSeries,
      areaChartOptions,
      carbonCreditsSeries,
      carbonCreditsChartOptions,
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
}

.metric-card {
  background-color: #2C2C2C; /* Using card background color */
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
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

.metric-value span {
  color: var(--color-accent);
}

.metric-description {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
}
</style>