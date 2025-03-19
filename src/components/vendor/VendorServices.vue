<template>
  <div class="min-h-screen flex bg-[#2c3e50] text-white">
    <!-- Sidebar -->
    <NavVendor />

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-[#9c4f96] mb-6">My Services</h1>

        <!-- 🔥 Add New Service Button (For Vendors) -->
        <div class="flex justify-between items-center mb-6">
          <p class="text-lg">Manage your services here.</p>
          <router-link
            to="/vendorhome"
            class="px-6 py-2 bg-[#6a1b9a] text-white rounded-md hover:bg-[#9c4f96] transition"
          >
            ➕ Add New Service
          </router-link>
        </div>

        <!-- Search & Filter -->
        <div class="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search services..."
            class="w-full sm:w-1/2 bg-[#34495e] border border-[#6a1b9a] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#9c4f96]"
          />
          <select
            v-model="selectedType"
            class="bg-[#34495e] border border-[#6a1b9a] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#9c4f96]"
          >
            <option value="">All Types</option>
            <option value="catering">Catering</option>
            <option value="decoration">Decoration</option>
            <option value="venue">Venue</option>
            <option value="photography">Photography</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center text-lg">
          Loading services...
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-400 text-center text-lg">
          {{ error }}
        </div>

        <!-- Services Grid -->
        <div
          v-if="filteredServices.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <div
            v-for="service in filteredServices"
            :key="service._id"
            class="bg-[#34495e] rounded-lg shadow-md overflow-hidden"
          >
            <!-- Image -->
            <img
              v-if="service.photos && service.photos.length"
              :src="service.photos[0].url"
              alt="Service Image"
              class="w-full h-40 object-cover"
            />
            <div class="p-4">
              <h2 class="text-xl font-semibold text-[#9c4f96]">
                {{ service.title }}
              </h2>
              <p class="text-[#bdc3c7] text-sm">{{ service.type }}</p>
              <p class="mt-2 text-white font-bold">
                Rs. {{ service.basePrice }} ({{ service.priceUnit }})
              </p>

              <!-- View Details Button -->
              <router-link
                :to="'/services/' + service._id"
                class="mt-4 inline-block px-4 py-2 bg-[#6a1b9a] text-white rounded-md hover:bg-[#9c4f96] transition"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>

        <!-- No Services Message -->
        <div
          v-else-if="!loading"
          class="text-center text-lg text-[#bdc3c7] mt-6"
        >
          No services found.
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavVendor from "@/components/vendor/Nav-Vendor.vue"; // Adjust the path if necessary
import axios from "axios";

export default {
  components: {
    NavVendor, // Register the NavVendor component
  },
  name: "VendorServices",
  data() {
    return {
      services: [], // Stores fetched services
      loading: true,
      error: null,
      searchQuery: "",
      selectedType: "",
    };
  },
  computed: {
    filteredServices() {
      return this.services.filter((service) => {
        const matchesSearch = service.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesType = this.selectedType
          ? service.type === this.selectedType
          : true;
        return matchesSearch && matchesType;
      });
    },
  },
  async created() {
    await this.fetchServices();
  },
  methods: {
    async fetchServices() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:8081/api/services");
        this.services = response.data;
      } catch (err) {
        this.error = "Failed to load services. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
