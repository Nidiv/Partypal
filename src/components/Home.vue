<template>
  <div>
    <h1>Welcome to Home Page</h1>
    <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded-md">
      Logout
    </button>
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
