<template>
  <div class="tab-content">
    <h2 class="tab-title">Scenario Simulator & AI Assistant ("Gaia for Uniphy")</h2>

    <div class="simulator-section chart-card">
      <h3>Predictive Simulations</h3>
      <div class="form-grid">
        <div class="form-group">
          <label for="landUse">Land Use:</label>
          <select id="landUse" v-model="simulationInputs.landUse">
            <option value="forest">Forest</option>
            <option value="agri">Agricultural</option>
            <option value="restoration">Restoration Zone</option>
          </select>
        </div>
        <div class="form-group">
          <label for="practiceIntensity">Practice Intensity:</label>
          <input type="range" id="practiceIntensity" min="0" max="100" v-model="simulationInputs.practiceIntensity" />
          <span>{{ simulationInputs.practiceIntensity }}%</span>
        </div>
        <div class="form-group">
          <label for="rainfallPattern">Rainfall Pattern:</label>
          <select id="rainfallPattern" v-model="simulationInputs.rainfallPattern">
            <option value="normal">Normal</option>
            <option value="drought">Drought</option>
            <option value="heavy">Heavy Rainfall</option>
          </select>
        </div>
      </div>
      <button @click="runSimulation" class="primary-button">Run Simulation</button>
      <div v-if="simulationResult" class="simulation-result">
        <h4>Simulation Result:</h4>
        <p>{{ simulationResult }}</p>
      </div>
    </div>

    <div class="ai-assistant-section chart-card">
      <h3>AI Assistant (Gaia)</h3>
      <div class="chat-window">
        <div v-for="(message, index) in chatMessages" :key="index" :class="['chat-message', message.sender]">
          <p>{{ message.text }}</p>
        </div>
      </div>
      <div class="chat-input">
        <input type="text" v-model="userMessage" @keyup.enter="sendChatMessage" placeholder="Ask Gaia..." />
        <button @click="sendChatMessage" class="primary-button">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ScenarioSimulatorAIAssistantView',
  setup() {
    const simulationInputs = ref({
      landUse: 'forest',
      practiceIntensity: 50,
      rainfallPattern: 'normal',
    });
    const simulationResult = ref('');

    const chatMessages = ref([
      { sender: 'gaia', text: 'Hello! I am Gaia, your AI assistant. How can I help you today?' },
    ]);
    const userMessage = ref('');

    const runSimulation = () => {
      // Mock simulation logic
      const { landUse, practiceIntensity, rainfallPattern } = simulationInputs.value;
      simulationResult.value = `Simulating for ${landUse} with ${practiceIntensity}% intensity and ${rainfallPattern} rainfall. Expected outcome: Increased carbon sequestration and biodiversity.`;
    };

    const sendChatMessage = () => {
      if (userMessage.value.trim() === '') return;

      chatMessages.value.push({ sender: 'user', text: userMessage.value });

      // Canned responses for AI Assistant
      let gaiaResponse = '';
      const lowerCaseMessage = userMessage.value.toLowerCase();

      if (lowerCaseMessage.includes('carbon credits')) {
        gaiaResponse = 'Carbon credits are generated based on verified carbon sequestration. Our engine uses LiDAR and plot-based calibration for accurate measurement.';
      } else if (lowerCaseMessage.includes('biodiversity')) {
        gaiaResponse = 'Biodiversity indices track species count, camera trap sightings, and faunal activity to assess ecosystem health.';
      } else if (lowerCaseMessage.includes('weather')) {
        gaiaResponse = 'Our weather station integration provides real-time and historical data for rainfall, temperature, humidity, and soil moisture, along with anomaly alerts.';
      } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        gaiaResponse = 'Hello there! How can I assist you with your ecological restoration project?';
      } else {
        gaiaResponse = 'I am still learning, but I can provide information on carbon credits, biodiversity, and weather data. Please ask me about those topics!';
      }

      chatMessages.value.push({ sender: 'gaia', text: gaiaResponse });
      userMessage.value = ''; // Clear input
    };

    return {
      simulationInputs,
      simulationResult,
      runSimulation,
      chatMessages,
      userMessage,
      sendChatMessage,
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

.simulator-section, .ai-assistant-section {
  background-color: #2C2C2C;
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  margin-bottom: var(--spacing-xl);
}

.simulator-section h3, .ai-assistant-section h3 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-body);
}

.form-group input[type="range"],
.form-group select {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333;
  color: var(--color-text-primary);
  font-size: var(--font-size-body);
}

.form-group input[type="range"] {
  -webkit-appearance: none;
  height: 8px;
  background: #555;
  outline: none;
  opacity: 0.7;
  transition: opacity .2s;
}

.form-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
}

.form-group input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
}

.simulation-result {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: #333;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-primary);
}

.simulation-result h4 {
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
}

.simulation-result p {
  color: var(--color-text-primary);
}

.chat-window {
  height: 300px;
  border: 1px solid #444;
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  overflow-y: auto;
  margin-bottom: var(--spacing-md);
  background-color: #333;
}

.chat-message {
  margin-bottom: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 8px;
  max-width: 80%;
}

.chat-message.user {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  margin-left: auto;
  text-align: right;
}

.chat-message.gaia {
  background-color: #555;
  color: var(--color-text-primary);
  margin-right: auto;
  text-align: left;
}

.chat-input {
  display: flex;
  gap: var(--spacing-sm);
}

.chat-input input {
  flex-grow: 1;
  padding: var(--spacing-md);
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333;
  color: var(--color-text-primary);
  font-size: var(--font-size-body);
}

.chat-input input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.5);
}

.primary-button {
  background-color: var(--button-primary-background-color);
  color: var(--button-primary-text-color);
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--button-primary-border-radius);
  cursor: pointer;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  transition: background-color 0.3s ease;
}

.primary-button:hover {
  opacity: 0.9;
}
</style>