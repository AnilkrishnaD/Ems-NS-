import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // route level code-splitting
  // this generates a separate chunk (About.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/LoginPage.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../pages/DashboardPage.vue"),

      children: [
        {
          path: "",
          name: "dashboard-home",
          component: () => import("../pages/admin/Home.vue"),
        },
        {
          path: "/dashboard/employees",
          name: "dashboard-employees",
          component: () => import("../pages/admin/Employees.vue"),
        },
        {
          path: "/dashboard/add-employee",
          name: "dashboard-add-employee",
          component: () => import("../pages/admin/AddEmployee.vue"),
        },
        {
          path: "/dashboard/edit-employee/:id",
          name: "dashboard-edit-employee", // Change the name to match the route
          component: () => import("../pages/admin/EditEmployee.vue"),
        },
        {
          path: "/dashboard/category",
          name: "dashboard-category",
          component: () => import("../pages/admin/Category.vue"),
        },
        {
          path: "/dashboard/addcategory",
          name: "dashboard-add-category",
          component: () => import("../pages/admin/AddCategory.vue"),
        },
        {
          path: "/dashboard/profile",
          name: "dashboard-profile",
          component: () => import("../pages/admin/Profile.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "home",
      component: () => import("../pages/HomePage.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  // const isAuthenticated = authStore.token;
  const isAuthenticated = true;
  const publicUrls = ["login"];

  if (!isAuthenticated && !publicUrls.includes(to.name)) {
    return { name: "login" };
  }
});

export default router;
