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

      <ul class="flex space-x-8">
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
        <li v-if="user">
          <router-link
            :to="`/chat?userId=${user._id}`"
            class="relative py-1 font-medium group"
          >
            Messages
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
        <!-- Add My Bookings link -->
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
        class="bg-white text-[#6a1b9a] px-5 py-2 rounded-md font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:bg-opacity-95 hover:scale-105"
      >
        Logout
      </button>
    </nav>
    <div class="h-16"></div>
  </div>
</template>

<script>
export default {
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
  },
};
</script>
