<template>
  <div class="container mt-5">
    <h1>Create an Account</h1>
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
    <button @click="register" class="btn btn-primary">
      Save to Firebase
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Register Successful!");
      alert("Register Successful!");
      router.push("/FireLogin"); // 注册成功后跳转到登录页
    })
    .catch((error) => {
      console.error(error.code, error.message);
      alert("Error: " + error.message);
    });
};
</script>
