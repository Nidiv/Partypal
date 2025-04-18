<!-- src/views/Chat.vue -->
<template>
  <div class="pt-20 px-4">
    <h2 class="text-xl font-bold mb-4 text-[#6a1b9a]">Chat</h2>
    <chatbox />
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
