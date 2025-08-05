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
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-background-secondary) 100%);
  padding: var(--spacing-lg);
}

.login-card {
  background: var(--card-background-color);
  padding: var(--spacing-3xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--card-shadow-elevated);
  border: 1px solid var(--color-border);
  text-align: center;
  width: 100%;
  max-width: 420px;
  position: relative;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
}

.login-title {
  font-size: var(--font-size-heading2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2xl);
  letter-spacing: -0.02em;
}

.login-form .form-group {
  margin-bottom: var(--spacing-xl);
  text-align: left;
}

.login-form label {
  display: block;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 100%;
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-background-secondary);
  color: var(--color-text-primary);
  font-size: var(--font-size-body);
  font-family: var(--font-family);
  transition: all var(--transition-fast);
  box-sizing: border-box;
}

.login-form input[type="text"]:focus,
.login-form input[type="password"]:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  background-color: var(--color-surface);
}

.primary-button {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
  color: var(--color-background);
  padding: var(--spacing-lg) var(--spacing-xl);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family);
  transition: all var(--transition-fast);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.primary-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--card-shadow-hover);
}

.primary-button:active {
  transform: translateY(0);
}

.error-message {
  color: var(--color-error);
  margin-top: var(--spacing-lg);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-md);
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.2);
  border-radius: var(--border-radius-sm);
}
</style>
