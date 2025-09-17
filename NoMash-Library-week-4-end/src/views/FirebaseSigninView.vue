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

      // 保存状态到 localStorage，BHeader.vue 就能显示用户
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", email.value);

      // 通知全局状态更新
      window.dispatchEvent(new CustomEvent("auth-status-changed"));

      // 跳转到首页
      router.push("/");
    })
    .catch((error) => {
      console.error(error.code, error.message);
      alert("Login failed: " + error.message);
    });
};
</script>
