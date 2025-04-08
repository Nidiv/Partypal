<template>
  <div class="font-zen text-gray-800">
    <!-- Hero Section -->
    <section id="home" class="bg-primary text-white text-center py-20 px-5">
      <h1 class="text-4xl font-bold">
        Plan Your Event Hassle-Free with PartyPal
      </h1>
      <p class="mt-4 text-lg">
        Book venues, vendors, catering, and more – all in one place.
      </p>
      <button
        class="mt-6 bg-white text-primary px-6 py-2 rounded-full font-semibold hover:bg-gray-200"
      >
        Get Started
      </button>
    </section>

    <!-- About Us Section -->
    <section id="about" class="py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">About Us</h2>
      <p class="mt-4 max-w-3xl mx-auto">
        PartyPal is your trusted event management platform that ensures seamless
        planning, vendor coordination, and execution of all types of events.
      </p>

      <!-- Read More Button -->
      <router-link
        to="/aboutus"
        class="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primaryDark transition"
      >
        Read More
      </router-link>
    </section>

    <!-- Our Services Section -->
    <section id="services" class="py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">Our Services</h2>

      <!-- Service Cards -->
      <div v-if="loading" class="text-lg text-center mt-6">Loading...</div>
      <div v-if="error" class="text-red-500 text-lg text-center mt-6">
        {{ error }}
      </div>

      <div
        v-if="!loading"
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="service in featuredServices"
          :key="service._id"
          class="bg-gray-100 p-4 rounded shadow-md hover:shadow-lg transition-shadow"
        >
          <img
            :src="service.photos[0]?.url || '/placeholder.jpg'"
            class="w-full h-48 object-cover rounded-md cursor-pointer"
            @click="openModal(service)"
          />
          <h3 class="text-lg font-semibold mt-4">{{ service.title }}</h3>
          <p class="text-gray-600 mt-2 line-clamp-2">
            {{ service.shortDescription }}
          </p>
          <p class="text-primary font-bold mt-2">
            Rs. {{ service.basePrice }} /
            {{ formatPriceUnit(service.priceUnit) }}
          </p>
          <button
            @click="openModal(service)"
            class="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-purple-800 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </section>

    <!-- Service Details Modal -->
    <div
      v-if="selectedService"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="sticky top-0 bg-white p-4 border-b flex justify-between items-center"
        >
          <h3 class="text-xl font-bold">{{ selectedService.title }}</h3>
          <button
            @click="selectedService = null"
            class="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Image -->
          <img
            :src="selectedService.photos[0]?.url || '/placeholder.jpg'"
            class="w-full h-64 object-cover rounded"
          />

          <!-- Details -->
          <div class="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Service Type</p>
              <p class="font-medium">{{ selectedService.type }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Price</p>
              <p class="font-medium">
                Rs. {{ selectedService.basePrice }} /
                {{ formatPriceUnit(selectedService.priceUnit) }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Capacity</p>
              <p class="font-medium">
                {{ selectedService.minGuests || 1 }}-{{
                  selectedService.maxGuests
                }}
                guests
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Location</p>
              <p class="font-medium">{{ selectedService.location || "N/A" }}</p>
            </div>
          </div>

          <!-- Description -->
          <div class="mt-6">
            <h4 class="font-semibold mb-2">Description</h4>
            <p class="whitespace-pre-line">
              {{ selectedService.detailedDescription }}
            </p>
          </div>

          <!-- Packages -->
          <div v-if="selectedService.packages?.length" class="mt-6">
            <h4 class="font-semibold mb-2">Packages</h4>
            <div class="space-y-3">
              <div
                v-for="pkg in selectedService.packages"
                :key="pkg.name"
                class="border p-3 rounded"
              >
                <h5 class="font-bold">{{ pkg.name }}</h5>
                <p class="text-primary font-semibold">Rs. {{ pkg.price }}</p>
                <p class="text-sm text-gray-600">{{ pkg.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Updated Modal Footer -->
        <div class="sticky bottom-0 bg-white p-4 border-t flex justify-center">
          <router-link
            to="/services"
            class="px-6 py-2 bg-primary text-white rounded hover:bg-purple-800 transition"
            @click="selectedService = null"
          >
            View All Services
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      featuredServices: [],
      loading: true,
      error: null,
      selectedService: null,
    };
  },
  methods: {
    async fetchServices() {
      try {
        const res = await axios.get("http://localhost:8081/api/all-services");

        // Shuffle the array
        const shuffled = res.data.sort(() => 0.5 - Math.random());

        // Pick first 3 randomly shuffled services
        this.featuredServices = shuffled.slice(0, 3);
      } catch (err) {
        this.error = "Failed to load services";
      } finally {
        this.loading = false;
      }
    },
    openModal(service) {
      this.selectedService = service;
    },
    formatPriceUnit(unit) {
      const units = {
        per_person: "per person",
        per_event: "per event",
        per_hour: "per hour",
        per_day: "per day",
      };
      return units[unit] || unit;
    },
  },
  mounted() {
    this.fetchServices();
  },
};
</script>
