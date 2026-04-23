<template>
  <div class="min-h-screen flex bg-[#2c3e50] text-white">
    <!-- Sidebar -->
    <NavVendor />

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-[#9c4f96] mb-6">My Services</h1>

        <!-- Add New Service Button -->
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
              class="w-full h-40 object-cover cursor-pointer"
              @click="openServiceModal(service)"
            />
            <div class="p-4">
              <h2 class="text-xl font-semibold text-[#9c4f96]">
                {{ service.title }}
              </h2>
              <p class="text-[#bdc3c7] text-sm">{{ service.type }}</p>
              <p class="mt-2 text-white font-bold">
                Rs. {{ service.basePrice }} ({{
                  formatPriceUnit(service.priceUnit)
                }})
              </p>

              <!-- View Details Button -->
              <button
                @click="openServiceModal(service)"
                class="mt-4 w-full px-4 py-2 bg-[#6a1b9a] text-white rounded-md hover:bg-[#9c4f96] transition"
              >
                View Details
              </button>
              <!-- Availability Toggle -->
              <div
                class="mt-4 flex items-center justify-between text-sm text-white"
              >
                <span>Available for Booking</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="service.status === 'active'"
                    @change="() => toggleAvailability(service)"
                    class="sr-only peer"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all duration-300"
                  ></div>
                  <div
                    class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-full"
                  ></div>
                </label>
              </div>
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

      <!-- Service Details Modal (Vendor View) -->
      <div
        v-if="selectedService"
        class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
        @click.self="selectedService = null"
      >
        <div
          class="bg-[#34495e] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <!-- Modal Header -->
          <div
            class="sticky top-0 bg-[#2c3e50] p-4 border-b border-[#9c4f96] flex justify-between items-center"
          >
            <h2 class="text-xl font-bold text-[#9c4f96]">
              {{ selectedService.title }}
            </h2>
            <button
              @click="selectedService = null"
              class="text-white hover:text-[#bdc3c7] transition-colors"
            >
              ✕
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-6">
            <!-- Image Gallery -->
            <div v-if="selectedService.photos?.length" class="mb-8">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="(photo, index) in selectedService.photos"
                  :key="index"
                  class="aspect-video bg-[#2c3e50] rounded-lg overflow-hidden"
                >
                  <img :src="photo.url" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-[#bdc3c7]">Service Type</p>
                  <p class="font-medium capitalize">
                    {{ selectedService.type }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-[#bdc3c7]">Price</p>
                  <p class="font-medium">
                    Rs. {{ selectedService.basePrice }} /
                    {{ formatPriceUnit(selectedService.priceUnit) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-[#bdc3c7]">Location</p>
                  <p class="font-medium">
                    {{ selectedService.location || "Not specified" }}
                  </p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-[#bdc3c7]">Capacity</p>
                  <p class="font-medium">
                    {{ selectedService.minGuests || 1 }} -
                    {{ selectedService.maxGuests || "∞" }} guests
                  </p>
                </div>
                <div>
                  <p class="text-sm text-[#bdc3c7]">Advance Payment</p>
                  <p class="font-medium">
                    {{ selectedService.advancePayment || 0 }}% required
                  </p>
                </div>
                <div>
                  <p class="text-sm text-[#bdc3c7]">Status</p>
                  <p class="font-medium capitalize">
                    {{ selectedService.status || "Active" }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-8">
              <h3
                class="text-lg font-semibold mb-4 pb-2 border-b border-[#9c4f96]"
              >
                Description
              </h3>
              <p class="whitespace-pre-line text-[#bdc3c7]">
                {{
                  selectedService.detailedDescription ||
                  "No description provided."
                }}
              </p>
            </div>

            <!-- Packages (If Any) -->
            <div v-if="selectedService.packages?.length" class="mb-8">
              <h3
                class="text-lg font-semibold mb-4 pb-2 border-b border-[#9c4f96]"
              >
                Packages
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="pkg in selectedService.packages"
                  :key="pkg.name"
                  class="border border-[#9c4f96] rounded-lg p-4"
                >
                  <h4 class="font-bold text-lg">{{ pkg.name }}</h4>
                  <p class="text-[#9c4f96] font-bold">Rs. {{ pkg.price }}</p>
                  <p class="text-[#bdc3c7] my-2">{{ pkg.description }}</p>
                  <div v-if="pkg.features?.length">
                    <p class="font-medium text-sm">Includes:</p>
                    <ul class="list-disc list-inside text-sm text-[#bdc3c7]">
                      <li v-for="(feature, i) in pkg.features" :key="i">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div
            class="sticky bottom-0 bg-[#2c3e50] p-4 border-t border-[#9c4f96] flex justify-end"
          >
            <button
              @click="selectedService = null"
              class="px-6 py-2 bg-[#6a1b9a] text-white rounded-md hover:bg-[#9c4f96] transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavVendor from "@/components/vendor/Nav-Vendor.vue";
import axios from "axios";

export default {
  components: {
    NavVendor,
  },
  data() {
    return {
      services: [],
      loading: true,
      error: null,
      searchQuery: "",
      selectedType: "",
      selectedService: null, // For modal
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
        const response = await axios.get(
          "https://partypal-2.onrender.com/api/services",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        this.services = response.data;
      } catch (err) {
        this.error = "Failed to load services. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    openServiceModal(service) {
      this.selectedService = service;
    },
    formatPriceUnit(unit) {
      const units = {
        per_person: "per person",
        per_event: "per event",
        per_hour: "per hour",
        per_day: "per day",
      };
      return units[unit] || unit.replace("_", " ");
    },

    // ✅ Add this
    async toggleAvailability(service) {
      try {
        const newStatus = service.status === "active" ? "inactive" : "active";
        await axios.put(
          `https://partypal-2.onrender.com/api/services/${service._id}/status`,
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        service.status = newStatus;
      } catch (err) {
        console.error(err);
        alert("Failed to update availability.");
      }
    },
  },
};
</script>

<style scoped>
/* Smooth modal transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
