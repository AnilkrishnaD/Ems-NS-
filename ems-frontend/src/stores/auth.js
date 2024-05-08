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
      authError: null,
      verifyError: null,
      verifySuccess: null,
    };
  },
  getters: {
    hasAccessToken: (state) =>
      state.token !== null && state.token !== undefined,
    resetEmailVerified: (state) => state.resetPassword.emailVerified,
  },
  actions: {
    // sign in methods

    // for admin
    async verifyPasswordForAdmin({ email, password }) {
      try {
        const response = await apiAuth.post("/auth/adminlogin", {
          email,
          password,
        });
        // console.log(response, "response");

        if (response.data.loginStatus) {
          this.token = response.data.token;
          cookie.set("bearer", response.data.token);
          router.push("/dashboard");
        } else {
          this.authError = response.data.Error;
          setTimeout(() => {
            this.authError = null;
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    },

    // for employee
    async verifyPasswordForEmployee({ email, password }) {
      try {
        const response = await apiAuth.post("/employee/employee_login", {
          email,
          password,
        });
        // console.log(response, "response");

        if (response.data.loginStatus) {
          this.token = response.data.token;
          cookie.set("valid", true);
          router.push(`/empployeedetails/${result.data.id}`);
        } else {
          this.authError = response.data.Error;
          setTimeout(() => {
            this.authError = null;
          }, 3000);
        }
      } catch (error) {
        console.log(error);
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
