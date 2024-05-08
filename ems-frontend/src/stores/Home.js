/* eslint-disable prettier/prettier */
import _ from "lodash";
import cookie from "store";
import { defineStore } from "pinia";
import router from "@/router";
import api from "@/plugins/api";

export const useHomeStore = defineStore("home", {
  state: () => ({
    loadingStatus: "success",
    adminTotal: 3,
    empTotal: 10,
    salaryTotal: 30000,
    adimnRecords: [
      { email: "Anil", id: "1" },
      { email: "Sai", id: 2 },
    ],
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
          this.loadingStatus = "success";
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

    // admin count
    async fetchAdminCount() {
      this.loadingStatus = "loading";
      try {
        const response = await api.get(`/auth/admin_count`, {
          headers: { Authorization: `Bearer ${cookie.get("bearer")}` },
        });
        // console.log(response, "response");
        if (response.data.status) {
          this.adminTotal = result.data.Result[0].admin;
          this.loadingStatus = "success";
        }
      } catch (error) {
        console.log(error);
      }
    },

    // emp colunt
    async fetchEmployeeCount() {
      this.loadingStatus = "loading";
      try {
        const response = await api.get(`/auth/employee_count`, {
          headers: { Authorization: `Bearer ${cookie.get("bearer")}` },
        });
        // console.log(response, "response");
        if (response.data.status) {
          this.empTotal = result.data.Result[0].employee;
          this.loadingStatus = "success";
        }
      } catch (error) {
        console.log(error);
      }
    },

    // salary count
    async fetchSalaryCount() {
      this.loadingStatus = "loading";
      try {
        const response = await api.get(`/auth/admin_count`, {
          headers: { Authorization: `Bearer ${cookie.get("bearer")}` },
        });
        // console.log(response, "response");
        if (response.data.status) {
          this.salaryTotal = esult.data.Result[0].salaryOFEmp;
          this.loadingStatus = "success";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
