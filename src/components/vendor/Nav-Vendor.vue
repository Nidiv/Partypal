<template>
  <aside class="w-64 min-h-screen bg-[#4e0072] p-6 shadow-md">
    <h1 class="text-2xl font-bold text-white mb-6">PartyPal</h1>
    <nav class="flex flex-col space-y-4">
      <a href="#" class="text-white hover:text-[#9c4f96] transition block"
        >Dashboard</a
      >
      <a href="#" class="text-white hover:text-[#9c4f96] transition block"
        >My Services</a
      >
      <a href="#" class="text-white hover:text-[#9c4f96] transition block"
        >Messages</a
      > 
      <a href="#" class="text-white hover:text-[#9c4f96] transition block"
        >Profile</a
      >
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
  methods: {
    logout() {
      localStorage.removeItem("authToken"); // Remove auth token
      this.$router.push("/auth"); // Redirect to Auth page
    },
  },
};
</script>
