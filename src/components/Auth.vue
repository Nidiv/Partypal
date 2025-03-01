<template>
  <div
    class="flex flex-col items-center space-y-4 p-6 bg-black font-zen shadow-md w-full h-screen"
  >
    <h3 class="text-black font-bold">
      {{ formType === "login" ? "Login" : "Sign Up" }}
    </h3>
    <div class="bg-white w-2/5 p-6 rounded-md shadow-md">
      <!-- Username -->
      <div class="flex flex-col">
        <label for="user-name" class="text-black font-medium">Username:</label>
        <input
          id="user-name"
          v-model="username"
          type="text"
          placeholder="Enter your username"
          class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Email (Only for Signup) -->
      <div v-if="formType === 'signup'" class="flex flex-col">
        <label for="email" class="text-black font-medium">Email:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col">
        <label for="password" class="text-black font-medium">Password:</label>
        <div class="relative">
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            @keyup.enter="handleAuth"
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

      <!-- Role Selection (Only for Signup) -->
      <div
        v-if="formType === 'signup'"
        class="flex flex-row items-center space-x-4 mt-4"
      >
        <span class="text-black font-medium">Role Selection:</span>
        <div class="flex items-center space-x-8">
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

      <!-- Additional Fields for Vendor (Only in Signup and when Role is Vendor) -->
      <div
        v-if="formType === 'signup' && role === 'vendor'"
        class="mt-4 space-y-4"
      >
        <!-- Upload Citizenship Front Side and Back Side -->
        <div class="flex flex-col">
          <label for="documents" class="text-black font-medium"
            >Upload Citizenship Front side and Back side:</label
          >
          <input
            id="documents"
            type="file"
            accept="image/*"
            @change="handleFileUpload($event)"
            multiple
            class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p class="text-sm text-gray-600 mt-2">
            Note: Only 2 Image files can be selected.
          </p>
        </div>

        <!-- Choose Type of Service -->
        <div class="flex flex-col">
          <label class="text-black font-medium">Choose Type of Service:</label>
          <select
            v-model="serviceType"
            class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select a Service</option>
            <option value="catering">Catering</option>
            <option value="sound">Sound System</option>
            <option value="venue">Venue</option>
          </select>
        </div>
      </div>

      <!-- Login/Signup Button -->
      <button
        @click="handleAuth"
        class="bg-blue-500 text-white rounded-md py-2 px-4 w-full mt-4 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
      >
        {{ formType === "login" ? "Login" : "Sign Up" }}
      </button>

      <!-- Toggle Between Login & Signup -->
      <div class="text-center mt-4">
        <span v-if="formType === 'login'">Don't have an account?</span>
        <span v-else>Already have an account?</span>
        <button
          class="text-blue-500 hover:text-blue-700 underline font-medium focus:outline-none"
          @click="toggleForm"
        >
          {{ formType === "login" ? "Sign Up" : "Login" }}
        </button>
      </div>
    </div>

    <!-- Error Popup -->
    <div
      v-if="showErrorPopup"
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md shadow-md text-center">
        <p class="text-red-500">{{ errorMessage }}</p>
        <button
          @click="showErrorPopup = false"
          class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formType: "login", // 'login' or 'signup'
      username: "",
      email: "",
      password: "",
      role: "user", // Default selected role is 'user'
      serviceType: "",
      documents: [], // Array to store the selected documents
      showPassword: false,
      showErrorPopup: false,
      errorMessage: "",
    };
  },
  created() {
    // Redirect if user is already logged in
    const isLoggedIn = localStorage.getItem("authToken");
    if (isLoggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    toggleForm() {
      this.formType = this.formType === "login" ? "signup" : "login";
      // Reset role and other fields when switching to login
      if (this.formType === "login") {
        this.role = "user"; // Default role for login is user
        this.serviceType = ""; // Reset the service type
        this.documents = []; // Clear any previously uploaded documents
      }
    },
    async handleAuth() {
      if (this.formType === "login") {
        this.login();
      } else {
        this.signup();
      }
    },
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:8081/api/auth/login",
          {
            username: this.username,
            password: this.password,
          }
        );

        console.log(response.data.token);
        localStorage.setItem("authToken", response.data.token);

        // 🔹 Ensure user data exists before accessing role
        const userRole = response.data.user?.role || "user";
        localStorage.setItem("userRole", userRole);

        // 🔹 Redirect based on role
        this.$router.push(userRole === "vendor" ? "/vendorhome" : "/home");
      } catch (error) {
        // console.error("Login error:", error);

        // 🔹 Handle specific error cases
        if (error.response) {
          const { status, data } = error.response;

          if (status === 403) {
            this.errorMessage = "Your account is pending admin approval.";
          } else if (status === 404) {
            this.errorMessage = "User not found. Please check your username.";
          } else if (status === 400) {
            this.errorMessage = "Invalid password. Please try again.";
          } else {
            this.errorMessage = data?.message || `Error: ${status}`;
          }
        } else if (error.request) {
          this.errorMessage = "No response from server. Check your network.";
        } else {
          this.errorMessage = "An unexpected error occurred.";
        }

        this.showErrorPopup = true;
      }
    },

    async signup() {
      try {
        const formData = new FormData();
        formData.append("username", this.username);
        formData.append("email", this.email);
        formData.append("password", this.password);
        formData.append("role", this.role);

        // If the user is a vendor, append additional fields
        if (this.role === "vendor") {
          formData.append("serviceType", this.serviceType);
          if (this.documents.length > 0) {
            this.documents.forEach((file) => {
              formData.append("documents", file);
            });
          }
        }

        const response = await axios.post(
          "http://localhost:8081/api/auth/signup",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log(response.data.message); // Debugging success message

        // Show success message based on role
        if (this.role === "vendor") {
          this.successMessage =
            "Signup successful! Your account is pending admin approval.";
        } else {
          this.successMessage = "Signup successful! You can now log in.";

          // Auto-login for regular users
          const loginResponse = await axios.post(
            "http://localhost:8081/api/auth/login",
            {
              username: this.username,
              password: this.password,
            }
          );

          // Store token & role in localStorage
          localStorage.setItem("authToken", loginResponse.data.token);
          localStorage.setItem("userRole", loginResponse.data.user.role);

          // Redirect based on role
          this.$router.push("/home");
        }

        // Clear form fields after successful signup
        this.username = "";
        this.email = "";
        this.password = "";
        this.role = "user";
        this.serviceType = "";
        this.documents = [];
      } catch (error) {
        if (error.response) {
          this.errorMessage =
            error.response.data?.message || "Signup failed. Please try again.";
        } else {
          this.errorMessage = "Network error! Please check your connection.";
        }
        this.showErrorPopup = true;
      }
    },

    handleFileUpload(event) {
      const files = event.target.files;

      // Check if more than two files are selected
      if (files.length > 2) {
        this.showErrorPopup = true;
        this.errorMessage = "You can only upload two files at a time!";
      } else {
        // Ensure only image files are selected
        const validFiles = Array.from(files).filter((file) =>
          file.type.startsWith("image/")
        );

        // Check if any non-image files are selected
        if (validFiles.length !== files.length) {
          this.showErrorPopup = true;
          this.errorMessage = "Please select only image files!";
        } else {
          this.documents = validFiles;
        }
      }
    },
  },
};
</script>
