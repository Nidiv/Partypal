import { createRouter, createWebHistory } from "vue-router";
import Auth from "../components/Auth.vue"; // Login & Signup Page
import Home from "../components/Home.vue"; // Home Page
import Vendorhome from "../components/vendor/Vendorhome.vue"; // Vendor Dashboard
import AboutUs from "../components/AboutUs.vue"; // About Us Page
import ServicePage from "../components/Services.vue"; // Services Page
import ContactUsPage from "../components/ContactUs.vue"; // Contact Us Page
import NotFound from "../components/NotFound.vue"; // 404 Page (Not Found)
import AdminHome from "../components/admin/AdminHome.vue";
import VendorServices from "../components/vendor/VendorServices.vue"; // Vendor Services
import MyBookings from "../components/MyBookings.vue";
import ViewDetails from "../components/vendor/ViewDetails.vue"; // Vendor Services
import VerifyPayment from "../components/VerifyPayment.vue"; //Verify Payment
import BookingHistory from "../components/vendor/BookingHistory.vue"; //User Booking

const routes = [
  { path: "/", redirect: "/auth" }, // Redirect to Auth page
  { path: "/auth", name: "Auth", component: Auth },
  { path: "/home", name: "Home", component: Home },
  { path: "/vendorhome", name: "Vendorhome", component: Vendorhome },
  { path: "/viewdetails", name: "ViewDetails", component: ViewDetails },
  { path: "/verifypayment", name: "VerifyPayment", component: VerifyPayment },
  {
    path: "/vendorservices",
    name: "VendorServices",
    component: VendorServices,
  },
  {
    path: "/bookinghistory",
    name: "BookingHistory",
    component: BookingHistory,
  },
  { path: "/aboutus", name: "AboutUs", component: AboutUs },
  { path: "/services", name: "Services", component: ServicePage },
  { path: "/contactus", name: "ContactUs", component: ContactUsPage },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }, // ✅ Catch-all route for invalid URLs
  {
    path: "/adminhome",
    name: "AdminHome",
    component: AdminHome,
  },
  {
    path: "/my-bookings",
    name: "MyBookings",
    component: MyBookings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
