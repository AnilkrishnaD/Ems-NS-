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
