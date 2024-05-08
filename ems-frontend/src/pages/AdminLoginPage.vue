<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

// stores
const authStore = useAuthStore();

const userEmail = ref(null);
const secret = ref(null);

const error = computed(() => authStore.authError);

function login(event) {
  const email = userEmail.value;
  const password = secret.value;

  authStore.verifyPasswordForAdmin({ email, password });
}
</script>
<template>
  <div class="login-page">
    <div class="card flex justify-content-center">
      <div class="form-container">
        <h1 class="login-heading">Login</h1>
        <label for="username">Username</label>
        <InputText
          id="username"
          v-model="userEmail"
          aria-describedby="username-help"
        />

        <label for="password">Password</label>
        <InputText
          id="password"
          v-model="secret"
          aria-describedby="password-help"
        />

        <Button label="Sign In" class="button" @click="login" />

        <div v-if="error">
          <span class="error">{{ error }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

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

    .error {
      color: red;
      font-weight: 700;
      font-size: 16px;
    }
  }
}
</style>
