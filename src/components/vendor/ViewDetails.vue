<template>
  <div class="min-h-screen flex bg-[#2c3e50] text-white">
    <!-- Sidebar -->
    <NavVendor />

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <div class="max-w-4xl mx-auto">
        <!-- Loading State -->
        <div v-if="loading" class="text-center text-lg">
          Loading service details...
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-400 text-center text-lg">
          {{ error }}
        </div>

        <!-- Service Details -->
        <div v-if="service" class="bg-[#34495e] rounded-lg shadow-md p-6">
          <h1 class="text-3xl font-bold text-[#9c4f96] mb-4">
            {{ service.title }}
          </h1>
          <p class="text-lg text-[#bdc3c7]">{{ service.type }}</p>
          <p class="text-lg mt-2">
            <span class="font-bold">Price:</span> Rs.
            {{ service.basePrice }} ({{ service.priceUnit }})
          </p>

          <!-- Service Images -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6"
          >
            <img
              v-for="(photo, index) in service.photos"
              :key="index"
              :src="photo.url"
              alt="Service Image"
              class="w-full h-40 object-cover rounded-lg"
            />
          </div>

          <p class="text-lg mt-2">
            <span class="font-bold">Description:</span>
            {{ service.detailedDescription }}
          </p>

          <p class="text-lg mt-2">
            <span class="font-bold">Location:</span> {{ service.location }}
          </p>

          <div class="flex justify-between mt-6">
            <router-link
              to="/vendorservices"
              class="px-6 py-2 bg-[#6a1b9a] text-white rounded-md hover:bg-[#9c4f96] transition"
            >
              ← Back to Services
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavVendor from "@/components/vendor/Nav-Vendor.vue"; // Sidebar
import axios from "axios";

export default {
  components: {
    NavVendor,
  },
  data() {
    return {
      service: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchServiceDetails();
  },
  methods: {
    async fetchServiceDetails() {
      this.loading = true;
      this.error = null;

      const serviceId = this.$route.params.id; // Get service ID from URL

      try {
        const response = await axios.get(
          `http://localhost:8081/api/services/${serviceId}`
        );
        this.service = response.data;
      } catch (err) {
        this.error = "Failed to load service details.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
