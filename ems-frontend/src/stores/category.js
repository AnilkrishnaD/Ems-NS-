/* eslint-disable prettier/prettier */
import _ from "lodash";
import cookie from "store";
import { defineStore } from "pinia";
import router from "@/router";
import api from "@/plugins/api";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    loadingStatus: "loading",
    categoryList: [],
    error: null,
  }),
  actions: {
    // fetch categories
    async fetchCategories() {
      this.loadingStatus = "loading";
      try {
        const response = await api.get(`/category`, {
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

    // add category
    async addCategory(name) {
      try {
        const response = await api.post(`/auth/add_category`, name, {
          // corrected apipost to api.post
          headers: { Authorization: `Bearer ${cookie.get("bearer")}` },
        });
        if (response.data.status) {
          router.push("./dashboard/category");
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
