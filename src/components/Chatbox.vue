<template>
  <div class="p-4 max-w-xl mx-auto bg-white rounded shadow">
    <div
      class="h-64 overflow-y-auto border p-3 mb-4 bg-gray-50"
      ref="chatWindow"
    >
      <div v-for="(msg, i) in messages" :key="i" class="mb-2">
        <span
          :class="
            msg.senderId === senderId ? 'text-blue-600' : 'text-purple-700'
          "
        >
          <strong>{{ msg.senderId === senderId ? "You" : "Them" }}:</strong>
        </span>
        {{ msg.content }}
      </div>
    </div>
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type your message..."
      class="w-full border p-2 rounded"
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
      senderId: "", // new
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
