import { createRouter, createWebHistory } from "vue-router";

import Auth from "../components/Auth.vue";
import Home from "../components/Home.vue";
import Vendorhome from "../components/vendor/Vendorhome.vue";
import AboutUs from "../components/AboutUs.vue";
import ServicePage from "../components/Services.vue";
import ContactUsPage from "../components/ContactUs.vue";
import NotFound from "../components/NotFound.vue";
import AdminHome from "../components/admin/AdminHome.vue";
import VendorServices from "../components/vendor/VendorServices.vue";
import MyBookings from "../components/MyBookings.vue";
import ViewDetails from "../components/vendor/ViewDetails.vue";
import VerifyPayment from "../components/VerifyPayment.vue";
import BookingHistory from "../components/vendor/BookingHistory.vue";
import Messages from "../components/vendor/Messages.vue";
import Chat from "../views/Chat.vue";
import VendorDashboard from "../components/vendor/Dashboard.vue";

const routes = [
  { path: "/", redirect: "/auth" },
  { path: "/auth", name: "Auth", component: Auth },

  // User-only routes (allowed only when role is null or "user")
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { allowedRoles: ["user"] },
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUs,
    meta: { allowedRoles: ["user"] },
  },
  {
    path: "/services",
    name: "Services",
    component: ServicePage,
    meta: { allowedRoles: ["user"] },
  },
  {
    path: "/contactus",
    name: "ContactUs",
    component: ContactUsPage,
    meta: { allowedRoles: ["user"] },
  },
  {
    path: "/my-bookings",
    name: "MyBookings",
    component: MyBookings,
    meta: { allowedRoles: ["user"] },
  },
  {
    path: "/verifypayment",
    name: "VerifyPayment",
    component: VerifyPayment,
    meta: { allowedRoles: ["user"] },
  },

  // Vendor-only routes
  {
    path: "/vendorhome",
    name: "Vendorhome",
    component: Vendorhome,
    meta: { allowedRoles: ["vendor"] },
  },
  {
    path: "/vendorservices",
    name: "VendorServices",
    component: VendorServices,
    meta: { allowedRoles: ["vendor"] },
  },
  {
    path: "/viewdetails",
    name: "ViewDetails",
    component: ViewDetails,
    meta: { allowedRoles: ["vendor"] },
  },
  {
    path: "/bookinghistory",
    name: "BookingHistory",
    component: BookingHistory,
    meta: { allowedRoles: ["vendor"] },
  },
  {
    path: "/vendordashboard",
    name: "VendorDashboard",
    component: VendorDashboard,
    meta: { allowedRoles: ["vendor"] },
  },
  {
    path: "/Messages",
    name: "Messages",
    component: Messages,
    meta: { allowedRoles: ["vendor"] },
  },

  // Admin-only route
  {
    path: "/adminhome",
    name: "AdminHome",
    component: AdminHome,
    meta: { allowedRoles: ["admin"] },
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    meta: { allowedRoles: ["user", "vendor"] },
  },

  // Catch-all route
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let role = localStorage.getItem("userRole");
  if (!role) role = "user";

  const allowed = to.meta.allowedRoles;

  if (allowed && !allowed.includes(role)) {
    // Redirect based on actual role
    if (role === "vendor") return next("/vendorhome");
    if (role === "admin") return next("/adminhome");
    return next("/auth");
  }

  next();
});

export default router;
