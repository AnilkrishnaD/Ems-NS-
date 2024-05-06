/* eslint-disable prettier/prettier */
import _ from "lodash";
import cookie from "store";
import { defineStore } from "pinia";
import router from "@/router";
import api from "@/plugins/api";
import apiAuth from "@/plugins/api-auth";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      token: cookie.get("bearer"),
      passwordVerified: false,
      authError: null,
      signupError: null,
      justSignedUp: false,
      newUser: null,
      verifyError: null,
      verifySuccess: null,
      resetPassword: {
        token: null,
        email: null,
        emailVerified: false,
        success: false,
      },
      resetPasswordError: null,
      tokenVerified: true,
      changePasswordSuccess: false,
      changePasswordError: null,
    };
  },
  getters: {
    hasAccessToken: (state) =>
      state.token !== null && state.token !== undefined,
    resetEmailVerified: (state) => state.resetPassword.emailVerified,
  },
  actions: {
    // sign in methods
    async verifyPassword({ username, password }) {
      try {
        const response = await apiAuth.post("/auth/verify_password", {
          username,
          password,
        });
        this.tokenOTP = response.data.token;
        this.passwordVerified = true;
      } catch (error) {
        this.tokenOTP = null;
        this.authError = error.response.data.msg;
        setTimeout(() => {
          this.authError = null;
        }, 3000);
      }
    },

    async logout() {
      try {
        this.token = null;
        cookie.remove("bearer");
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },

    clearPasswordError() {
      this.changePasswordError = null;
      this.resetPassword.success = false;
    },
  },
});
