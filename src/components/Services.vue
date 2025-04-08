<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-primary text-white text-center py-20">
      <h1 class="text-4xl font-bold">Our Amazing Services</h1>
      <p class="mt-4 text-xl">
        We provide high-quality services tailored to your needs
      </p>
    </section>

    <!-- Our Services Section -->
    <section id="services" class="py-16 px-6">
      <h2 class="text-2xl font-bold text-primary text-center">Our Services</h2>

      <!-- Category Filters -->
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <button
          class="bg-primary text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors"
          :class="{ 'bg-purple-800': activeCategory === 'all' }"
          @click="filterServices('all')"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category.value"
          class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          :class="{
            'bg-purple-800 text-white': activeCategory === category.value,
          }"
          @click="filterServices(category.value)"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Search & Price Filters -->
      <div class="mt-6 flex flex-wrap justify-center gap-4">
        <!-- Search Bar -->
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search services..."
          class="w-full sm:w-1/3 bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />

        <!-- Price Range Filters -->
        <div class="flex items-center gap-2">
          <input
            type="number"
            v-model.number="minPrice"
            placeholder="Min Price"
            min="0"
            class="w-24 bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <span>to</span>
          <input
            type="number"
            v-model.number="maxPrice"
            placeholder="Max Price"
            min="0"
            class="w-24 bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center mt-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"
        ></div>
        <p class="mt-2 text-gray-600">Loading services...</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="error"
        class="mt-8 p-4 bg-red-100 border-l-4 border-red-500 text-red-700"
      >
        <p class="font-medium">{{ error }}</p>
        <button
          @click="fetchServices"
          class="mt-2 text-sm text-red-600 hover:text-red-800 font-semibold"
        >
          Try Again
        </button>
      </div>

      <!-- No Services Message -->
      <div
        v-if="!loading && filteredServices.length === 0"
        class="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700"
      >
        <p>
          No services found matching "{{ searchQuery }}"
          <span v-if="activeCategory !== 'all'"
            >in "{{ activeCategoryLabel }}"</span
          >
          <span v-if="minPrice || maxPrice">
            within price range
            {{ minPrice ? `Rs. ${minPrice}` : "any" }}
            to
            {{ maxPrice ? `Rs. ${maxPrice}` : "any" }}
          </span>
        </p>
      </div>

      <!-- Service Cards -->
      <div
        v-if="filteredServices.length"
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="service in filteredServices"
          :key="service._id"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <!-- Service Image -->
          <div class="h-48 overflow-hidden">
            <img
              :src="
                service.photos.length
                  ? service.photos[0].url
                  : '/placeholder.jpg'
              "
              :alt="service.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Service Info -->
          <div class="p-4">
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-semibold text-gray-800">
                {{ service.title }}
              </h3>
              <span
                class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
              >
                {{ service.type }}
              </span>
            </div>

            <p class="text-gray-600 mt-2 line-clamp-2">
              {{ service.shortDescription }}
            </p>

            <p class="mt-3 text-lg font-bold text-gray-900">
              Rs. {{ service.basePrice.toLocaleString() }} /
              {{ formatPriceUnit(service.priceUnit) }}
            </p>

            <!-- Buttons -->
            <div class="mt-4 flex flex-wrap gap-2">
              <router-link
                :to="'/services/' + service._id"
                class="flex-1 px-4 py-2 bg-primary text-white text-center rounded-md font-medium hover:bg-purple-700 transition-colors"
              >
                View Details
              </router-link>

              <button
                @click="initiatePayment(service._id)"
                :disabled="paymentLoading"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors disabled:bg-green-400"
              >
                <span v-if="!paymentLoading">Book Now</span>
                <span v-else>Processing...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Special Wishes Section -->
    <section class="py-16 px-6 bg-gray-50 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-primary">We Value Your Thoughts</h2>
        <p class="mt-4 text-gray-600">
          We'd love to hear from you and discuss your upcoming plans. Feel free
          to share your thoughts with us!
        </p>
        <router-link
          to="/contact"
          class="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
        >
          Get in Touch
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ServicesPage",
  data() {
    return {
      services: [],
      searchQuery: "",
      activeCategory: "all",
      minPrice: null,
      maxPrice: null,
      loading: true,
      paymentLoading: false,
      error: null,
      categories: [
        { value: "catering", label: "Catering" },
        { value: "decoration", label: "Decoration" },
        { value: "venue", label: "Venue" },
        { value: "photography", label: "Photography" },
        { value: "entertainment", label: "Entertainment" },
      ],
    };
  },
  computed: {
    filteredServices() {
      return this.services.filter((service) => {
        // Match search query (title or description)
        const matchesSearch =
          this.searchQuery === "" ||
          service.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          service.shortDescription
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());

        // Match category
        const matchesCategory =
          this.activeCategory === "all" || service.type === this.activeCategory;

        // Match price range
        const matchesPrice =
          (this.minPrice === null || service.basePrice >= this.minPrice) &&
          (this.maxPrice === null || service.basePrice <= this.maxPrice);

        return matchesSearch && matchesCategory && matchesPrice;
      });
    },
    activeCategoryLabel() {
      if (this.activeCategory === "all") return "All Categories";
      const category = this.categories.find(
        (c) => c.value === this.activeCategory
      );
      return category ? category.label : this.activeCategory;
    },
  },
  methods: {
    async fetchServices() {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get(
          "http://localhost:8081/api/all-services"
        );
        this.services = response.data;
      } catch (error) {
        console.error("Error fetching services:", error);
        this.error = "Failed to load services. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    filterServices(category) {
      this.activeCategory = category;
    },
    formatPriceUnit(unit) {
      return unit.replace("_", " ").toLowerCase();
    },
    async initiatePayment(serviceId) {
      try {
        this.paymentLoading = true;
        const response = await axios.get(
          `http://localhost:8081/payment/${serviceId}`
        );

        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          throw new Error("Payment URL not received");
        }
      } catch (error) {
        console.error("Payment error:", error);
        this.error = "Failed to initiate payment. Please try again.";
      } finally {
        this.paymentLoading = false;
      }
    },
  },
  mounted() {
    this.fetchServices();
  },
  watch: {
    searchQuery() {
      // Optional: Add debounce here if needed
    },
    minPrice(newVal) {
      if (newVal !== null && this.maxPrice !== null && newVal > this.maxPrice) {
        this.minPrice = this.maxPrice;
      }
    },
    maxPrice(newVal) {
      if (newVal !== null && this.minPrice !== null && newVal < this.minPrice) {
        this.maxPrice = this.minPrice;
      }
    },
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
