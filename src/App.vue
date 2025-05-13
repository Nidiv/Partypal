<template>
  <div>
    <!-- Show Navbar and Footer only if the current route is NOT in the hidden list -->
    <Navbar v-if="!hideNavAndFooter" />
    <router-view />
    <Footer v-if="!hideNavAndFooter" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  computed: {
    hideNavAndFooter() {
      const hiddenRoutes = [
        "Auth",
        "Vendorhome",
        "NotFound",
        "AdminHome",
        "VendorServices",
        "ViewDetails",
<<<<<<< HEAD
        "Chat",
        "BookingHistory",
=======
        "BookingHistory",
        "VendorDashboard",
>>>>>>> 92a9aa6 (Dashboard added)
      ];
      return hiddenRoutes.includes(this.$route.name); // ✅ Use `this.$route.name`
    },
  },
};
</script>
