<!-- src/views/Chat.vue -->
<template>
  <div class="pt-20 px-4 flex justify-center">
    <div class="w-full max-w-2xl">
      <!-- 🧾 Title -->
      <h2 class="text-2xl font-bold mb-6 text-center text-[#6a1b9a]">
        Event Chat
      </h2>

      <!-- 💬 Chatbox -->
      <chatbox />
    </div>
  </div>
</template>

<script>
import Chatbox from "../components/Chatbox.vue";

export default {
  components: {
    Chatbox,
  },
};
</script>
