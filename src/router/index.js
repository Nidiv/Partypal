import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import SignUp from "../components/Sign-Up.vue";

const routes = [
  {
    path: "/",
    redirect: "/login", // Default route redirects to SignUp
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
