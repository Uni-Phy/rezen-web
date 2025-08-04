<template>
  <div class="tab-content">
    <h2 class="tab-title">Carbon Credit Engine</h2>

    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Carbon Sequestered (Tonnes)</h3>
        <apexchart type="bar" :options="carbonSequesteredChartOptions" :series="carbonSequesteredSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>MRV Eligibility Scoring</h3>
        <apexchart type="radialBar" :options="mrvScoreChartOptions" :series="mrvScoreSeries"></apexchart>
      </div>

      <div class="metric-card">
        <h3>Credit Issuance Prediction</h3>
        <p class="metric-value">1,500 - 1,800 Credits</p>
        <p class="metric-description">Confidence Interval: 90%</p>
      </div>

      <div class="metric-card">
        <h3>LiDAR + Plot-based Calibration</h3>
        <p class="metric-description">Data calibrated and verified.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CarbonCreditEngineView',
  setup() {
    const carbonSequesteredSeries = ref([
      {
        name: 'Baseline',
        data: [100, 120, 110, 130, 125, 140],
      },
      {
        name: 'Actual',
        data: [110, 130, 125, 145, 135, 150],
      },
    ]);

    const carbonSequesteredChartOptions = ref({
      chart: {
        type: 'bar',
        height: 250,
        toolbar: {
          show: false,
        },
      },
      colors: [
        getComputedStyle(document.documentElement).getPropertyValue('--color-secondary'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
      ],
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
        categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
        labels: {
          style: {
            colors: getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color'),
          },
        },
      },
      yaxis: {
        title: {
          text: 'Tonnes of Carbon',
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

    const mrvScoreSeries = ref([88]); // Percentage for radial bar

    const mrvScoreChartOptions = ref({
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
      labels: ['Eligibility Score'],
    });

    return {
      carbonSequesteredSeries,
      carbonSequesteredChartOptions,
      mrvScoreSeries,
      mrvScoreChartOptions,
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