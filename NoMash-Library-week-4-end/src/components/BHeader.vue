<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        
        <!-- Conditional rendering: display different content based on login status -->
        <li v-if="!isAuthenticated" class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>

          <!-- Firebase Login -->
        <li v-if="!isAuthenticated" class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>

        <li v-if="!isAuthenticated" class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>
        
        <li v-if="isAuthenticated" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" @click="toggleDropdown" aria-expanded="false">
            Welcome, {{ currentUser }}
          </a>
          <ul v-show="showDropdown" class="dropdown-menu show">
            <li><a class="dropdown-item" href="#" @click="handleLogout">Logout</a></li>
          </ul>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// Get router instance
const router = useRouter()

// Reactive state
const isAuthenticated = ref(false)
const currentUser = ref('')
const showDropdown = ref(false)

// Check authentication status
const checkAuthStatus = () => {
  const authStatus = localStorage.getItem('isAuthenticated')
  const user = localStorage.getItem('currentUser')
  
  isAuthenticated.value = authStatus === 'true'
  currentUser.value = user || ''
}

// Toggle dropdown menu
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Logout handler
const handleLogout = () => {
  // Clear login status
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('currentUser')
  
  // Update component state
  isAuthenticated.value = false
  currentUser.value = ''
  showDropdown.value = false
  
  // Dispatch custom event to notify other components of status update
  window.dispatchEvent(new CustomEvent('auth-status-changed'))
  
  // Redirect to home page
  router.push('/')
  
  console.log('User logged out successfully')
}

// Check authentication status when component mounts
onMounted(() => {
  checkAuthStatus()
  
  // Listen for localStorage changes (when other components update login status)
  window.addEventListener('storage', checkAuthStatus)
  
  // Listen for custom events to synchronize state
  window.addEventListener('auth-status-changed', checkAuthStatus)
})

// Clean up event listeners when component unmounts
onUnmounted(() => {
  window.removeEventListener('storage', checkAuthStatus)
  window.removeEventListener('auth-status-changed', checkAuthStatus)
})
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
