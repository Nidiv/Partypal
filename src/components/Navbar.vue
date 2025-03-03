<template>
  <div class="font-zen text-gray-800">
    <nav
      class="bg-[#6a1b9a] text-white py-4 px-6 flex justify-between items-center fixed top-0 w-full shadow-md z-50 transition-all duration-300"
    >
      <!-- Make PartyPal a clickable link -->
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
        <li>
          <router-link to="/contactus" class="relative py-1 font-medium group">
            Contact Us
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
        </li>
      </ul>
      <!-- Logout Button -->
      <button
        @click="logout"
        class="bg-white text-[#6a1b9a] px-5 py-2 rounded-md font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:bg-opacity-95 hover:scale-105"
      >
        Logout
      </button>
    </nav>
    <!-- Add a spacer to prevent content from being hidden under the fixed navbar -->
    <div class="h-16"></div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("authToken"); // Remove auth token
      this.$router.push("/auth"); // Redirect to Auth page
    },
  },
};
</script>
