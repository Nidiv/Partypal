<template>
  <aside class="w-64 min-h-screen bg-[#4e0072] p-6 shadow-md">
    <!-- PartyPal Logo (Clickable) -->
    <router-link
      to="/vendorhome"
      class="text-2xl font-bold text-white mb-6 block hover:text-[#9c4f96] transition"
    >
      PartyPal
    </router-link>

    <nav class="flex flex-col space-y-4">
      <router-link
        to="/vendordashboard"
        class="text-white hover:text-[#9c4f96] transition block"
      >
        Dashboard
      </router-link>
      <router-link
        to="/vendorservices"
        class="text-white hover:text-[#9c4f96] transition block"
      >
        My Services
      </router-link>
      <router-link
        to="/bookinghistory"
        class="text-white hover:text-[#9c4f96] transition block"
      >
        User Bookings
      </router-link>
      <router-link
        :to="`/chat?userId=${vendor._id}`"
        class="text-white hover:text-[#9c4f96] transition block"
        >Messages</router-link
      >
      <router-link
        to="/profile"
        class="text-white hover:text-[#9c4f96] transition block"
      >
        Profile
      </router-link>
      <button
        @click="logout"
        class="text-white hover:text-[#9c4f96] transition block text-left w-full"
      >
        Logout
      </button>
    </nav>
  </aside>
</template>

<script>
export default {
  computed: {
    vendor() {
      const stored = localStorage.getItem("loggedInUser");
      return stored ? JSON.parse(stored) : null;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("loggedInUser"); // Optional cleanup
      this.$router.push("/auth");
    },
  },
};
</script>
