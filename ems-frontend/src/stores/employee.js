import _ from "lodash";
import cookie from "store";
import { defineStore } from "pinia";
import router from "@/router";
import api from "@/plugins/api";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    loadingStatus: "loading",
    empList: [],
    error: null,
  }),
  actions: {
    // fetch categories
    async fetchEmployees() {
      this.loadingStatus = "loading";
      try {
        const response = await api.get(`/auth/employee`, {
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

    // add employee
    async addEmployee(formData) {
      try {
        const response = await api.post(`/auth/add_employee`, formData, {
          // corrected apipost to api.post
          headers: { Authorization: `Bearer ${cookie.get("bearer")}` },
        });
        if (response.data.status) {
          router.push("./dashboard/employees");
        } else {
          this.error = response.data.Error;
          setTimeout(() => {
            this.error = null;
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //edit employee
    // delete employee
    async deleteEmployee(id) {
      try {
        const response = await api.delete(`/auth/delete_employee/${id}`, {
          // corrected apipost to api.post
          headers: { Authorization: `Bearer ${cookie.get("bearer")}` },
        });
        if (response.data.status) {
          this.fetchEmployees();
        } else {
          this.error = response.data.Error;
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
