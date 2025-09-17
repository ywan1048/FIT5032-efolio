<template>
  <div class="container mt-5">
    <h1>Sign In</h1>
    <div class="mb-3">
      <input
        type="text"
        placeholder="Email"
        v-model="email"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="form-control"
      />
    </div>
    <button @click="signin" class="btn btn-success">
      Sign in via Firebase
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Login Successful!");
      console.log("Current user:", auth.currentUser);

    
      if (email.value === "admin@test.com") {
        console.log("Role: Admin");
        localStorage.setItem("role", "admin");
      } else {
        console.log("Role: User");
        localStorage.setItem("role", "user");
      }

 
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", email.value);

     
      window.dispatchEvent(new CustomEvent("auth-status-changed"));


      router.push("/");
    })
    .catch((error) => {
      console.error(error.code, error.message);
      alert("Login failed: " + error.message);
    });
};
</script>
