<template>
  <div class="flex">
    <!-- Sidebar -->
    <NavVendor />

    <!-- Main Content -->
    <div class="p-6 font-zen text-gray-800 w-full">
      <h1 class="text-2xl font-bold mb-4 text-primary">📨 Messages</h1>

      <div v-if="loading" class="text-gray-500">Loading messages...</div>
      <div v-else-if="users.length === 0" class="text-gray-400">
        No messages yet.
      </div>

      <ul v-else class="space-y-4">
        <li
          v-for="user in users"
          :key="user._id"
          class="flex items-center justify-between p-4 border rounded-md bg-white shadow"
        >
          <div class="text-lg font-semibold">{{ user.username }}</div>
          <router-link
            :to="`/chat?userId=${user._id}`"
            class="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h6m-6 4h4"
              />
            </svg>
            Chat
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavVendor from "@/components/vendor/Nav-Vendor.vue";

export default {
  components: { NavVendor },
  data() {
    return {
      users: [],
      loading: true,
    };
  },
  methods: {
    async fetchMessagedUsers() {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("http://localhost:8081/api/chat/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.users = res.data.users;
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchMessagedUsers();
  },
};
</script>

<style scoped>
.text-primary {
  color: #8b5cf6;
}
.font-zen {
  font-family: "Zen Kaku Gothic New", sans-serif;
}
</style>
