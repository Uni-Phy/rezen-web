<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Rezen Dashboard Login</h1>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="primary-button">Login</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();

    const login = () => {
      if (username.value === 'admin' && password.value === 'admin123') {
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/dashboard');
      } else {
        error.value = 'Invalid username or password';
      }
    };

    return {
      username,
      password,
      error,
      login,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-background);
}

.login-card {
  background-color: var(--card-background-color);
  padding: var(--card-padding);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  text-align: center;
  width: 100%;
  max-width: 90%; /* Allow it to take more width on larger screens */
  width: 400px; /* Set a preferred width */
}

.login-title {
  font-size: var(--font-size-heading2);
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
}

.login-form .form-group {
  margin-bottom: var(--spacing-lg);
  text-align: left;
}

.login-form label {
  display: block;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-body);
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: calc(100% - 20px); /* Adjust for padding */
  padding: var(--spacing-md);
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333;
  color: var(--color-text-primary);
  font-size: var(--font-size-body);
}

.login-form input[type="text"]:focus,
.login-form input[type="password"]:focus {
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
  width: 100%;
}

.primary-button:hover {
  background-color: darken(var(--color-primary), 10%); /* This will not work directly in CSS, needs SASS/LESS or JS */
  opacity: 0.9; /* Fallback for hover effect */
}

.error-message {
  color: #FF5252; /* A distinct error color */
  margin-top: var(--spacing-md);
  font-size: var(--font-size-small);
}
</style>