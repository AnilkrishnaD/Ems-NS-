/* eslint-disable prettier/prettier */
import _ from "lodash";
import cookie from "store";
import { defineStore } from "pinia";
import router from "@/router";
import api from "@/plugins/api";

export const useHomeStore = defineStore("home", {
  state: () => ({
    loadingStatus: "loading",
    adminTotal: 0,
    empTotal: 0,
    salaryTotal: 0,
    adimnRecords: [],
    error: null,
  }),
  actions: {
    // fetch admin records
    async fetchAdminRecoreds() {
      this.loadingStatus = "loading";
      try {
        const response = await api.get(`/auth/admin_records`, {
          headers: { Authorization: `Bearer ${cookie.get("bearer")}` },
        });
        // console.log(response, "response");
        if (response.data.status) {
          this.categoryList = response.data.Result;
          this.loadingStatus = "sucsess";
        } else {
          this.error = response.data.Error;
          this.loadingStatus = "failure";
          setTimeout(() => {
            this.error = null;
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
