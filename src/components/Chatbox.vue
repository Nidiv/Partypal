<template>
  <div class="p-4 max-w-xl mx-auto bg-white rounded shadow font-zen">
    <!-- 🔙 Go Back -->
    <button
      @click="goBack"
      class="mb-4 text-sm text-primary hover:underline flex items-center gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back to {{ userRole === "vendor" ? "Bookings" : "Services" }}
    </button>

    <!-- 🧾 Chat Window -->
    <div
      class="h-64 overflow-y-auto border p-3 mb-4 bg-gray-50 rounded"
      ref="chatWindow"
    >
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="mb-2 flex"
        :class="
          msg.senderId?._id === senderId ? 'justify-end' : 'justify-start'
        "
      >
        <div
          :class="[
            'px-3 py-2 rounded-lg max-w-xs break-words text-sm',
            msg.senderId?._id === senderId
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800',
          ]"
        >
          {{ msg.content }}
        </div>
      </div>
    </div>

    <!-- ✏️ Message Input -->
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type your message..."
      class="w-full border p-2 rounded focus:ring focus:ring-primary"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newMessage: "",
      messages: [],
      polling: null,
      userId: "",
      userRole: "",
      vendorId: "",
      senderId: "", // _id of logged in user (vendor or user)
      receiverId: "",
    };
  },
  mounted() {
    const query = this.$route.query;
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const loggedInId = user?.id || user?._id;
    this.userRole = user?.role;

    if (!loggedInId || !this.userRole) {
      console.error("❌ User not logged in.");
      return;
    }

    if (this.userRole === "user" && query.vendorId) {
      this.userId = loggedInId;
      this.vendorId = query.vendorId;
      this.senderId = this.userId;
      this.receiverId = this.vendorId;
    } else if (this.userRole === "vendor" && query.userId) {
      this.userId = query.userId;
      this.vendorId = loggedInId;
      this.senderId = this.vendorId;
      this.receiverId = this.userId;
    } else {
      console.error("❌ Missing vendorId or userId in URL.");
      return;
    }

    this.fetchMessages();
    this.polling = setInterval(this.fetchMessages, 3000);
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  methods: {
    goBack() {
      if (this.userRole === "vendor") {
        this.$router.push("/bookinghistory");
      } else {
        this.$router.push("/services");
      }
    },
    async fetchMessages() {
      try {
        const res = await axios.get(
          "http://localhost:8081/api/chat/conversation",
          {
            params: {
              userId: this.userId,
              vendorId: this.vendorId,
            },
          }
        );
        this.messages = res.data;
        this.$nextTick(() => {
          const chatWindow = this.$refs.chatWindow;
          if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
        });
      } catch (err) {
        console.error(
          "❌ Failed to fetch messages:",
          err.response?.data || err.message
        );
      }
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;
      try {
        await axios.post("http://localhost:8081/api/chat/send", {
          senderId: this.senderId,
          receiverId: this.receiverId,
          content: this.newMessage,
        });
        this.newMessage = "";
        this.fetchMessages();
      } catch (err) {
        console.error(
          "❌ Failed to send message:",
          err.response?.data || err.message
        );
      }
    },
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
