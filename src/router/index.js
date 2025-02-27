import { createRouter, createWebHistory } from "vue-router";
import Auth from "../components/Auth.vue"; // Combined Login & Signup
import Home from "../components/Home.vue"; // Ensure Home.vue exists
import Vendorhome from "../components/Vendorhome.vue"; // Ensure Vendorhome.vue exists
import AboutUs from "../components/AboutUs.vue"; // Import the new About Us page
import ServicePage from "../components/Services.vue"; // Import the new Service page
import ContactUsPage from "../components/ContactUs.vue"; // Import the new Service page

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
  {
    path: "/vendorhome",
    name: "Vendorhome",
    component: Vendorhome,
  },
  {
    path: "/aboutus", // ✅ Add the About Us route
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/services", // ✅ Add the About Us route
    name: "Services",
    component: ServicePage,
  },
  {
    path: "/contactus", // ✅ Add the About Us route
    name: "ContactUs",
    component: ContactUsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
