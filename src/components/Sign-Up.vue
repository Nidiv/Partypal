<template>
  <div
    class="flex flex-col items-center space-y-4 p-6 bg-black font-zen shadow-md w-full min-h-screen"
  >
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

      <!-- Phone Number -->
      <div class="flex flex-col">
        <label for="phone-number" class="text-black font-medium"
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

      <!-- Additional Fields for Vendor -->
      <div v-if="role === 'vendor'" class="mt-4 space-y-4">
        <!-- Upload Citizenship (Front & Back) -->
        <div class="flex flex-col">
          <label for="citizenship" class="text-black font-medium">
            Upload Citizenship (Front & Back):
          </label>
          <input
            id="citizenship"
            type="file"
            accept="image/*"
            multiple
            @change="handleFileUpload"
            class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div
            v-if="citizenshipFiles.length"
            class="mt-2 space-y-1 text-sm text-gray-600"
          >
            <p v-for="(file, index) in citizenshipFiles" :key="index">
              {{ file.name }}
            </p>
          </div>
        </div>

        <!-- Choose Type of Service -->
        <div class="flex flex-col">
          <label class="text-black font-medium">Choose Type of Service:</label>
          <select
            v-model="serviceType"
            class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          >
            <option value="" disabled>Select your service</option>
            <option value="catering">Catering</option>
            <option value="sound-system">Sound System</option>
            <option value="venue">Venue</option>
          </select>
        </div>

        <!-- Pop-up Modal -->
        <div
          v-if="showPopup"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <p class="text-red-500 font-bold">
              You can only select up to 2 image files.
            </p>
            <button
              @click="showPopup = false"
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              OK
            </button>
          </div>
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
          @click="$router.push('/login')"
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
      role: "user", // Default role
      serviceType: "",
      citizenshipFiles: [],
      showPopup: false, // Controls modal visibility
    };
  },
  methods: {
    handleFileUpload(event) {
      const files = Array.from(event.target.files);

      if (files.length > 2) {
        this.showPopup = true;
        event.target.value = ""; // Reset input
        return;
      }

      this.citizenshipFiles = files; // Store selected files
    },
  },
};
</script>
