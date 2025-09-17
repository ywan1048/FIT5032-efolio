<template>
  <div class="container mt-5">
    <div class="login">
      <h1 class="text-center">Login to Library</h1>
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <form @submit.prevent="handleLogin" class="mt-4">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <div
              v-if="errorMessage"
              :class="[
                'alert mt-3',
                errorMessage.includes('successful') ? 'alert-success' : 'alert-danger'
              ]"
              role="alert"
            >
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Get router instance
const router = useRouter()

// Reactive variables
const username = ref('')
const password = ref('')
const errorMessage = ref('')

// Hardcoded user credentials
const VALID_CREDENTIALS = {
  username: 'jimmy',
  password: 'areallybadguy'
}

// Login handler function
const handleLogin = () => {
  // Clear error message
  errorMessage.value = ''

  // Basic form validation
  if (!username.value || !password.value) {
    errorMessage.value = 'Please enter both username and password'
    return
  }

  // Validate user credentials
  if (
    username.value === VALID_CREDENTIALS.username &&
    password.value === VALID_CREDENTIALS.password
  ) {
    // Login successful
    console.log('Login successful!')

    // Store login status to localStorage
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentUser', username.value)

    // Dispatch custom event to notify other components of status update
    window.dispatchEvent(new CustomEvent('auth-status-changed'))

    // Show success message
    errorMessage.value = 'Login successful! Redirecting...'

    // Redirect to home page after delay
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } else {
    // Login failed
    errorMessage.value = 'Invalid username or password. Please try again.'
    console.log('Login failed:', { username: username.value, password: password.value })
  }
}
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.login {
  text-align: center;
}

.form-control:focus {
  border: 1px solid #275fda;
  box-shadow: 0 0 0 0.25rem rgba(39, 95, 218, 0.25);
}

.btn-primary {
  background-color: #275fda;
  border-color: #275fda;
}

.btn-primary:hover {
  background-color: #1e4bb8;
  border-color: #1e4bb8;
}

.alert {
  border-radius: 10px;
}
</style>
