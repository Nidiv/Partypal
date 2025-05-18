<template>
  <div class="font-zen text-gray-800">
    <nav
      class="bg-[#6a1b9a] text-white py-4 px-6 flex justify-between items-center fixed top-0 w-full shadow-md z-50 transition-all duration-300"
    >
      <router-link
        to="/home"
        class="text-2xl font-bold tracking-tight relative group"
      >
        PartyPal
        <span
          class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
        ></span>
      </router-link>

      <!-- Mobile menu button -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="!mobileMenuOpen"
            fill-rule="evenodd"
            d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
            clip-rule="evenodd"
          />
          <path
            v-else
            fill-rule="evenodd"
            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Desktop navigation -->
      <ul class="hidden md:flex space-x-8">
        <li>
          <router-link to="/home" class="relative py-1 font-medium group">
            Home
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
        </li>
        <li>
          <router-link to="/aboutus" class="relative py-1 font-medium group">
            About Us
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
        </li>
        <li>
          <router-link to="/services" class="relative py-1 font-medium group">
            Services
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
        </li>
        <li>
          <router-link to="/contactus" class="relative py-1 font-medium group">
            Contact Us
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/my-bookings"
            class="relative py-1 font-medium group"
          >
            My Bookings
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
        </li>
      </ul>

      <button
        @click="logout"
        class="hidden md:block bg-white text-[#6a1b9a] px-5 py-2 rounded-md font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:bg-opacity-95 hover:scale-105"
      >
        Logout
      </button>
    </nav>

    <!-- Mobile menu overlay -->
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      @click="closeMobileMenu"
    ></div>

    <!-- Mobile navigation -->
    <div
      v-show="mobileMenuOpen"
      class="fixed top-16 right-0 left-0 bg-[#6a1b9a] text-white shadow-lg py-4 z-40 md:hidden transform transition-transform duration-300"
      :class="mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'"
    >
      <ul class="flex flex-col space-y-4 px-6">
        <li>
          <router-link
            to="/home"
            class="block py-2 font-medium hover:bg-[#7b2aa8] px-3 rounded"
            @click="closeMobileMenu"
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link
            to="/aboutus"
            class="block py-2 font-medium hover:bg-[#7b2aa8] px-3 rounded"
            @click="closeMobileMenu"
          >
            About Us
          </router-link>
        </li>
        <li>
          <router-link
            to="/services"
            class="block py-2 font-medium hover:bg-[#7b2aa8] px-3 rounded"
            @click="closeMobileMenu"
          >
            Services
          </router-link>
        </li>
        <li>
          <router-link
            to="/contactus"
            class="block py-2 font-medium hover:bg-[#7b2aa8] px-3 rounded"
            @click="closeMobileMenu"
          >
            Contact Us
          </router-link>
        </li>
        <li>
          <router-link
            to="/my-bookings"
            class="block py-2 font-medium hover:bg-[#7b2aa8] px-3 rounded"
            @click="closeMobileMenu"
          >
            My Bookings
          </router-link>
        </li>
        <li>
          <button
            @click="logoutMobile"
            class="w-full text-left py-2 font-medium hover:bg-[#7b2aa8] px-3 rounded"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
    <div class="h-16"></div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const mobileMenuOpen = ref(false);

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
    };

    return {
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
    };
  },
  computed: {
    user() {
      const storedUser = localStorage.getItem("loggedInUser");
      return storedUser ? JSON.parse(storedUser) : null;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("loggedInUser");
      this.$router.push("/auth");
    },
    logoutMobile() {
      this.logout();
      this.closeMobileMenu();
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .nav-item {
    width: 100%;
  }
}
</style>
