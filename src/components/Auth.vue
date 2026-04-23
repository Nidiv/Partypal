<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primaryLight to-primaryDark p-4"
    style="
      background: linear-gradient(to bottom right, #6a1b9a, #9c4f96, #4e0072);
    "
  >
    <div class="w-full max-w-md">
      <!-- Auth Card -->
      <div
        class="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]"
      >
        <!-- Header -->
        <div
          class="py-6 px-8"
          style="background: linear-gradient(to right, #6a1b9a, #9c4f96)"
        >
          <h2 class="text-3xl font-bold text-white text-center">
            {{ formType === "login" ? "Welcome Back" : "Create Account" }}
          </h2>
          <p class="text-center mt-2" style="color: rgba(255, 255, 255, 0.85)">
            {{
              formType === "login"
                ? "Login to access your account"
                : "Sign up to get started"
            }}
          </p>
        </div>

        <!-- Form Content -->
        <div class="p-8">
          <!-- Username -->
          <div class="mb-5">
            <label
              for="user-name"
              class="block text-sm font-medium mb-1"
              style="color: #2c3e50"
              >Username</label
            >
            <div class="relative">
              <span
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                style="color: #34495e"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <input
                id="user-name"
                v-model="username"
                type="text"
                placeholder="Enter your username"
                class="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style="focus-ring-color: #6a1b9a"
              />
            </div>
            <p v-if="errors.username" class="mt-1 text-xs text-red-500">
              {{ errors.username }}
            </p>
          </div>

          <!-- Email (Only for Signup) -->
          <div v-if="formType === 'signup'" class="mb-5">
            <label
              for="email"
              class="block text-sm font-medium mb-1"
              style="color: #2c3e50"
              >Email</label
            >
            <div class="relative">
              <span
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                style="color: #34495e"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
              </span>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style="focus-ring-color: #6a1b9a"
              />
            </div>
            <p v-if="errors.email" class="mt-1 text-xs text-red-500">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password -->
          <div class="mb-5">
            <label
              for="password"
              class="block text-sm font-medium mb-1"
              style="color: #2c3e50"
              >Password</label
            >
            <div class="relative">
              <span
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                style="color: #34495e"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password (min. 6 characters)"
                class="w-full pl-10 pr-14 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                style="focus-ring-color: #6a1b9a"
                @keyup.enter="handleAuth"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium transition-colors duration-200"
                style="color: #6a1b9a"
              >
                {{ showPassword ? "Hide" : "Show" }}
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs text-red-500">
              {{ errors.password }}
            </p>
            <p
              v-if="formType === 'signup'"
              class="mt-1 text-xs"
              style="color: #34495e"
            >
              Password must be at least 6 characters
            </p>
          </div>

          <!-- Password Strength Meter (Only for Signup) -->
          <div v-if="formType === 'signup' && password.length > 0" class="mb-5">
            <div class="flex items-center mb-1">
              <div class="flex-1 h-1 rounded-full bg-gray-200">
                <div
                  class="h-1 rounded-full transition-all duration-300"
                  :style="{
                    width: `${passwordStrength.score * 25}%`,
                    backgroundColor: passwordStrength.color,
                  }"
                ></div>
              </div>
              <span
                class="ml-2 text-xs"
                :style="{ color: passwordStrength.color }"
              >
                {{ passwordStrength.text }}
              </span>
            </div>
            <ul v-if="password.length > 0" class="space-y-1 mt-2">
              <li
                class="text-xs flex items-center"
                :style="{ color: password.length >= 6 ? '#27ae60' : '#e74c3c' }"
              >
                <span class="mr-1">{{ password.length >= 6 ? "✓" : "✗" }}</span>
                At least 6 characters
              </li>
              <li
                class="text-xs flex items-center"
                :style="{
                  color: /[A-Z]/.test(password) ? '#27ae60' : '#e74c3c',
                }"
              >
                <span class="mr-1">{{
                  /[A-Z]/.test(password) ? "✓" : "✗"
                }}</span>
                Uppercase letter
              </li>
              <li
                class="text-xs flex items-center"
                :style="{
                  color: /[0-9]/.test(password) ? '#27ae60' : '#e74c3c',
                }"
              >
                <span class="mr-1">{{
                  /[0-9]/.test(password) ? "✓" : "✗"
                }}</span>
                Number
              </li>
            </ul>
          </div>

          <!-- Role Selection (Only for Signup) -->
          <div
            v-if="formType === 'signup'"
            class="mb-5 p-4 rounded-lg"
            style="background-color: #f8f9fa"
          >
            <p class="text-sm font-medium mb-3" style="color: #2c3e50">
              I am a:
            </p>
            <div class="flex space-x-4">
              <label
                class="relative flex items-center p-3 rounded-lg border cursor-pointer hover:border-primary transition-all duration-200"
                :class="{ 'ring-2 border-primary': role === 'user' }"
                :style="
                  role === 'user'
                    ? 'background-color: rgba(106, 27, 154, 0.05); border-color: #6a1b9a; ring-color: #9c4f96;'
                    : 'border-color: #bdc3c7;'
                "
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  v-model="role"
                  class="absolute opacity-0"
                />
                <span
                  class="flex items-center justify-center w-6 h-6 mr-3 rounded-full border"
                  :style="
                    role === 'user'
                      ? 'border-color: #6a1b9a; background-color: #6a1b9a;'
                      : 'border-color: #34495e;'
                  "
                >
                  <svg
                    v-if="role === 'user'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <span class="text-sm font-medium" style="color: #2c3e50"
                    >User</span
                  >
                  <p class="text-xs" style="color: #34495e">
                    I want to book services
                  </p>
                </div>
              </label>

              <label
                class="relative flex items-center p-3 rounded-lg border cursor-pointer hover:border-primary transition-all duration-200"
                :class="{ 'ring-2 border-primary': role === 'vendor' }"
                :style="
                  role === 'vendor'
                    ? 'background-color: rgba(106, 27, 154, 0.05); border-color: #6a1b9a; ring-color: #9c4f96;'
                    : 'border-color: #bdc3c7;'
                "
              >
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  v-model="role"
                  class="absolute opacity-0"
                />
                <span
                  class="flex items-center justify-center w-6 h-6 mr-3 rounded-full border"
                  :style="
                    role === 'vendor'
                      ? 'border-color: #6a1b9a; background-color: #6a1b9a;'
                      : 'border-color: #34495e;'
                  "
                >
                  <svg
                    v-if="role === 'vendor'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <span class="text-sm font-medium" style="color: #2c3e50"
                    >Vendor</span
                  >
                  <p class="text-xs" style="color: #34495e">
                    I want to offer services
                  </p>
                </div>
              </label>
            </div>
          </div>

          <!-- Additional Fields for Vendor -->
          <div
            v-if="formType === 'signup' && role === 'vendor'"
            class="space-y-5 p-4 rounded-lg mb-5 transition-all duration-300"
            style="background-color: #f8f9fa"
          >
            <!-- Upload Documents -->
            <div>
              <label
                for="documents"
                class="block text-sm font-medium mb-1"
                style="color: #2c3e50"
                >Upload Citizenship Documents
                <span class="text-red-500">*</span></label
              >
              <div
                class="border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-200"
                :class="{ 'border-red-400': errors.documents }"
                style="border-color: #bdc3c7; hover-border-color: #6a1b9a"
              >
                <input
                  id="documents"
                  type="file"
                  accept="image/*"
                  @change="handleFileUpload($event)"
                  multiple
                  class="hidden"
                />
                <label for="documents" class="cursor-pointer block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style="color: #34495e"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <p class="mt-1 text-sm" style="color: #34495e">
                    <span
                      class="font-medium hover:text-primaryLight"
                      style="color: #6a1b9a"
                    >
                      Click to upload
                    </span>
                    or drag and drop
                  </p>
                  <p class="mt-1 text-xs" style="color: #34495e">
                    Front and back sides (2 images max)
                  </p>
                </label>
                <div
                  v-if="documents.length > 0"
                  class="mt-2 flex justify-center space-x-2"
                >
                  <span
                    v-for="(doc, index) in documents"
                    :key="index"
                    class="px-2 py-1 text-xs rounded-full"
                    style="
                      background-color: rgba(106, 27, 154, 0.1);
                      color: #6a1b9a;
                    "
                  >
                    {{ doc.name }}
                  </span>
                </div>
              </div>
              <p v-if="errors.documents" class="mt-1 text-xs text-red-500">
                {{ errors.documents }}
              </p>
            </div>

            <!-- Service Type -->
            <div>
              <label
                class="block text-sm font-medium mb-1"
                style="color: #2c3e50"
                >Service Type <span class="text-red-500">*</span></label
              >
              <div class="relative">
                <select
                  v-model="serviceType"
                  class="block w-full pl-3 pr-10 py-3 text-base border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                  :class="{ 'border-red-400': errors.serviceType }"
                  style="
                    border-color: #bdc3c7;
                    color: #2c3e50;
                    focus-ring-color: #6a1b9a;
                  "
                >
                  <option value="">Select a Service Type</option>
                  <option value="catering">Catering</option>
                  <option value="sound">Sound System</option>
                  <option value="venue">Venue</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
                  style="color: #34495e"
                >
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <p v-if="errors.serviceType" class="mt-1 text-xs text-red-500">
                {{ errors.serviceType }}
              </p>
            </div>
          </div>

          <!-- Auth Button -->
          <button
            @click="handleAuth"
            class="w-full py-3 rounded-lg text-white font-medium text-center transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style="
              background: linear-gradient(to right, #6a1b9a, #9c4f96);
              hover-background: linear-gradient(to right, #4e0072, #6a1b9a);
              focus-ring-color: #6a1b9a;
            "
          >
            {{ formType === "login" ? "Login" : "Sign Up" }}
          </button>

          <!-- Toggle Link -->
          <div class="text-center mt-6">
            <p class="text-sm" style="color: #34495e">
              {{
                formType === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"
              }}
              <button
                @click="toggleForm"
                class="font-medium transition-colors duration-200 focus:outline-none"
                style="color: #6a1b9a; hover-color: #9c4f96"
              >
                {{ formType === "login" ? "Sign Up" : "Login" }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Popup -->
    <div
      v-if="showErrorPopup"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300"
    >
      <div
        class="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100"
      >
        <div
          class="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4"
          style="background-color: rgba(106, 27, 154, 0.1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style="color: #6a1b9a"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-center mb-2" style="color: #2c3e50">
          Error
        </h3>
        <p class="text-center mb-6" style="color: #34495e">
          {{ errorMessage }}
        </p>
        <button
          @click="showErrorPopup = false"
          class="w-full py-2 rounded-lg text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style="
            background-color: #6a1b9a;
            hover-background-color: #4e0072;
            focus-ring-color: #6a1b9a;
          "
        >
          OK
        </button>
      </div>
    </div>

    <!-- Success Popup -->
    <div
      v-if="showSuccessPopup"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300"
    >
      <div
        class="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100"
      >
        <div
          class="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4"
          style="background-color: rgba(39, 174, 96, 0.1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style="color: #27ae60"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-center mb-2" style="color: #2c3e50">
          Success
        </h3>
        <p class="text-center mb-6" style="color: #34495e">
          {{ successMessage }}
        </p>
        <button
          @click="showSuccessPopup = false"
          class="w-full py-2 rounded-lg text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style="
            background-color: #27ae60;
            hover-background-color: #219653;
            focus-ring-color: #27ae60;
          "
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
      showSuccessPopup: false,
      errorMessage: "",
      successMessage: "",
      errors: {
        username: "",
        email: "",
        password: "",
        documents: "",
        serviceType: "",
      },
      formSubmitting: false,
    };
  },
  computed: {
    passwordStrength() {
      if (!this.password) {
        return { score: 0, text: "", color: "#bdc3c7" };
      }

      let score = 0;

      // Length check
      if (this.password.length >= 6) score += 1;
      if (this.password.length >= 8) score += 1;

      // Character variety check
      if (/[A-Z]/.test(this.password)) score += 1;
      if (/[0-9]/.test(this.password)) score += 1;
      if (/[^A-Za-z0-9]/.test(this.password)) score += 1;

      const strengthMap = [
        { text: "Very Weak", color: "#e74c3c" },
        { text: "Weak", color: "#e67e22" },
        { text: "Medium", color: "#f1c40f" },
        { text: "Strong", color: "#2ecc71" },
        { text: "Very Strong", color: "#27ae60" },
      ];

      return {
        score: score / 5,
        text: strengthMap[Math.min(score, 4)].text,
        color: strengthMap[Math.min(score, 4)].color,
      };
    },
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
      // Reset fields and errors when switching forms
      this.resetForm();
    },

    resetForm() {
      // Reset form fields when toggling between login and signup
      if (this.formType === "login") {
        this.role = "user";
        this.serviceType = "";
        this.documents = [];
        this.email = "";
      }

      // Clear all errors
      this.clearErrors();

      // Don't clear username/password to improve UX when switching forms
    },

    clearErrors() {
      for (const key in this.errors) {
        this.errors[key] = "";
      }
    },

    validateForm() {
      this.clearErrors();
      let isValid = true;

      // Username validation
      if (!this.username.trim()) {
        this.errors.username = "Username is required";
        isValid = false;
      } else if (this.username.length < 3) {
        this.errors.username = "Username must be at least 3 characters";
        isValid = false;
      }

      // Password validation
      if (!this.password) {
        this.errors.password = "Password is required";
        isValid = false;
      } else if (this.formType === "signup" && this.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters";
        isValid = false;
      }

      // Additional validation for signup
      if (this.formType === "signup") {
        // Email validation
        if (!this.email) {
          this.errors.email = "Email is required";
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
          this.errors.email = "Please enter a valid email address";
          isValid = false;
        }

        // Vendor-specific validations
        if (this.role === "vendor") {
          // Service type validation
          if (!this.serviceType) {
            this.errors.serviceType = "Please select a service type";
            isValid = false;
          }

          // Document validation
          if (this.documents.length === 0) {
            this.errors.documents = "Please upload your citizenship documents";
            isValid = false;
          }
        }
      }

      return isValid;
    },

    async handleAuth() {
      if (this.formSubmitting) return; // Prevent multiple submissions

      // Validate form before submitting
      if (!this.validateForm()) {
        return;
      }

      this.formSubmitting = true;

      if (this.formType === "login") {
        await this.login();
      } else {
        await this.signup();
      }

      this.formSubmitting = false;
    },

    async login() {
      try {
        const response = await axios.post(
          "https://partypal-2.onrender.com/api/auth/login",
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
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.user)
        ); // ✅ Store full user

        // 🔹 Redirect based on role
        this.$router.push(
          userRole === "admin"
            ? "/adminhome"
            : userRole === "vendor"
            ? "/vendorhome"
            : "/home"
        );
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
        // Client-side validation before submitting
        if (!this.validateForm()) {
          return;
        }

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
          "https://partypal-2.onrender.com/api/auth/signup",
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
          this.showSuccessPopup = true;

          // Switch to login form after 3 seconds
          setTimeout(() => {
            this.showSuccessPopup = false;
            this.formType = "login";
            this.resetForm();
          }, 3000);
        } else {
          this.successMessage = "Signup successful! You can now log in.";
          this.showSuccessPopup = true;

          // Auto-login for regular users
          try {
            const loginResponse = await axios.post(
              "https://partypal-2.onrender.com/api/auth/login",
              {
                username: this.username,
                password: this.password,
              }
            );

            // Store token & role in localStorage
            localStorage.setItem("authToken", loginResponse.data.token);
            localStorage.setItem("userRole", loginResponse.data.user.role);

            // Redirect based on role
            setTimeout(() => {
              this.showSuccessPopup = false;
              this.$router.push("/home");
            }, 1500);
          } catch (loginError) {
            // If auto-login fails, just stay on success message
            setTimeout(() => {
              this.showSuccessPopup = false;
              this.formType = "login";
              this.resetForm();
            }, 3000);
          }
        }
      } catch (error) {
        if (error.response) {
          // Handle specific API error responses
          const { status, data } = error.response;

          if (status === 409) {
            // Username or email already exists
            if (data.message.includes("Username")) {
              this.errors.username = "This username is already taken";
            } else if (data.message.includes("Email")) {
              this.errors.email = "This email is already registered";
            } else {
              this.errorMessage =
                data.message || "Signup failed. Please try again.";
              this.showErrorPopup = true;
            }
          } else if (status === 400) {
            // Validation errors from the server
            if (data.errors && Array.isArray(data.errors)) {
              // Process validation errors from the server
              data.errors.forEach((err) => {
                if (err.field === "username")
                  this.errors.username = err.message;
                else if (err.field === "email") this.errors.email = err.message;
                else if (err.field === "password")
                  this.errors.password = err.message;
                else if (err.field === "serviceType")
                  this.errors.serviceType = err.message;
                else if (err.field === "documents")
                  this.errors.documents = err.message;
              });
            } else {
              this.errorMessage =
                data.message || "Invalid form data. Please check your inputs.";
              this.showErrorPopup = true;
            }
          } else {
            this.errorMessage = data.message || `Error: ${status}`;
            this.showErrorPopup = true;
          }
        } else if (error.request) {
          this.errorMessage = "Network error! Please check your connection.";
          this.showErrorPopup = true;
        } else {
          this.errorMessage = "An unexpected error occurred.";
          this.showErrorPopup = true;
        }
      }
    },

    handleFileUpload(event) {
      const files = event.target.files;

      // Clear previous document errors
      this.errors.documents = "";

      // Check if more than two files are selected
      if (files.length > 2) {
        this.errors.documents = "You can only upload two files at a time!";
        return;
      }

      // Ensure only image files are selected
      const validFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      // Check if any non-image files are selected
      if (validFiles.length !== files.length) {
        this.errors.documents = "Please select only image files!";
      } else {
        this.documents = validFiles;
      }

      // Check file sizes
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
      for (const file of validFiles) {
        if (file.size > MAX_FILE_SIZE) {
          this.errors.documents = "File size must be less than 5MB";
          break;
        }
      }
    },

    // Check if we can enable the signup button (all required fields are filled)
    canSubmitSignup() {
      if (this.formType !== "signup") return true;

      const basicFields =
        this.username &&
        this.email &&
        this.password &&
        this.password.length >= 6;

      if (this.role === "user") {
        return basicFields;
      } else {
        return basicFields && this.serviceType && this.documents.length > 0;
      }
    },
  },
  watch: {
    // Reset errors on input change
    username() {
      this.errors.username = "";
    },
    email() {
      this.errors.email = "";
    },
    password() {
      this.errors.password = "";
    },
    serviceType() {
      this.errors.serviceType = "";
    },
  },
};
</script>

<style scoped>
/* Optional: Add transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Improve focus states for accessibility */
input:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(106, 27, 154, 0.2);
}

/* Spinner for loading state */
.spinner {
  border: 3px solid rgba(106, 27, 154, 0.1);
  border-radius: 50%;
  border-top: 3px solid #6a1b9a;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
