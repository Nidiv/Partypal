<template>
  <div>
    <!-- Show Navbar and Footer only if the current route is NOT login/signup -->
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
      const hiddenRoutes = ["/auth"];
      return hiddenRoutes.includes(this.$route.path);
    },
  },
};
</script>
