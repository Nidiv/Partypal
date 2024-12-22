<template>
  <div
    class="flex flex-col items-center space-y-4 p-6 bg-white font-zen rounded-md shadow-md w-full h-screen"
  >
    <!-- Tailwind Check123  -->
    <div class="bg-red-400 text-white p-4">Tailwind CSS is working!</div>
    <div class="bg-red-400 text-white p-4">Tailwind CSS is 2</div>
    <h3 class="text-black font-bold">Sign Up</h3>
    <div class="bg-white w-2/5 p-6 rounded-md shadow-md">
      <!-- Full Name -->
      <div class="flex flex-col">
        <label for="full-name" class="text-black font-medium">Full Name:</label>
        <input
          id="full-name"
          type="text"
          placeholder="Enter your full name"
          class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Email Address -->
      <div class="flex flex-col">
        <label for="email" class="text-black font-medium">Email Address:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email address"
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

      <!-- Phone Number -->
      <div class="flex flex-col">
        <label for="phone-number" class="text-black font-zen"
          >Phone Number:</label
        >
        <input
          id="phone-number"
          type="tel"
          placeholder="Enter your phone number"
          class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Role Selection -->
      <div class="flex flex-row items-center space-x-4">
        <span class="text-black font-medium">Role Selection:</span>
        <div class="flex items-center space-x-8">
          <!-- User Radio Button -->
          <label class="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="user"
              v-model="role"
              class="form-radio h-4 w-4 text-blue-600"
              checked
            />
            <span class="text-black">User</span>
          </label>

          <!-- Vendor Radio Button -->
          <label class="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="vendor"
              v-model="role"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="text-black">Vendor</span>
          </label>
        </div>
      </div>

      <!-- Register Button -->
      <button
        class="bg-blue-500 text-white rounded-md py-2 px-4 w-full mt-4 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
      >
        Register
      </button>

      <!-- Redirect to Login Page -->
      <div class="text-center mt-4">
        Already have an account?
        <button
          class="text-blue-500 hover:text-blue-700 underline font-medium focus:outline-none"
        >
          LOG IN
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false, // State to toggle password visibility
      role: "", // State for role selection
    };
  },
  name: "SignUp",
};
</script>
