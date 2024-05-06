<template>
  <div class="login-page">
    <div class="card flex justify-content-center">
      <div class="form-container">
        <h1 class="login-heading">Login</h1>
        <label for="username">Username</label>
        <InputText
          id="username"
          v-model="name"
          aria-describedby="username-help"
        />

        <label for="password">Password</label>
        <InputText
          id="password"
          v-model="password"
          aria-describedby="password-help"
        />

        <Button label="Sign In" class="button" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

import Button from "primevue/button";

const name = ref(null);
const password = ref(null);
</script>
<style lang="scss" scoped>
.login-page {
  background-color: #f3f4f6;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: white;
    color: #0c0c0c;
    padding: 8px;
    border-radius: 6px;

    label {
      text-align: start;
    }

    .login-heading {
      text-align: center;
      font-size: 32px;
      font-weight: 500;
    }
  }
}
</style>
