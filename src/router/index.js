import { createRouter, createWebHistory } from "vue-router";
import Auth from "../components/Auth.vue"; // Combined Login & Signup
import Home from "../components/Home.vue"; // Ensure Home.vue exists

const routes = [
  {
    path: "/",
    redirect: "/auth", // Redirect to Auth.vue
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
