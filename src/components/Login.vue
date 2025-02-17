<template>
  <div
    class="flex flex-col items-center space-y-4 p-6 bg-black font-zen shadow-md w-full h-screen"
  >
    <h3 class="text-black font-bold">Login</h3>
    <div class="bg-white w-2/5 p-6 rounded-md shadow-md">
      <!-- Username -->
      <div class="flex flex-col">
        <label for="user-name" class="text-black font-medium">Username:</label>
        <input
          id="user-name"
          type="text"
          placeholder="Enter your username"
          class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Password -->
      <div class="flex items-center gap-4 w-full">
        <div class="flex-1 relative">
          <label for="password" class="text-black font-medium">Password:</label>
          <input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 font-medium"
          >
            {{ showPassword ? "Hide" : "Show" }}
          </button>
        </div>
      </div>

      <!-- Login Button -->
      <button
        class="bg-blue-500 text-white rounded-md py-2 px-4 w-full mt-4 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
      >
        Login
      </button>

      <!-- Redirect to Sigup Page -->
      <div class="text-center mt-4">
        Don't have an account?
        <button
          class="text-blue-500 hover:text-blue-700 underline font-medium focus:outline-none"
          @click="$router.push('/signup')"
        >
          SignUp
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
    };
  },
  name: "login",
};
</script>
