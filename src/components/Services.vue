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

      <!-- Category Filters (Top) -->
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <button
          class="bg-primary text-white px-4 py-2 rounded hover:bg-purple-800"
          :class="{ 'bg-purple-800': activeCategory === 'all' }"
          @click="filterServices('all')"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category.value"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          :class="{
            'bg-purple-800 text-white': activeCategory === category.value,
          }"
          @click="filterServices(category.value)"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Search & Price Filters (Below Categories) -->
      <div class="mt-6 flex flex-wrap justify-center gap-4">
        <!-- 🔍 Search Bar -->
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search services..."
          class="w-full sm:w-1/3 bg-gray-100 border border-gray-400 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <!-- Price Range Filters -->
        <input
          type="number"
          v-model.number="minPrice"
          placeholder="Min Price"
          class="w-1/5 bg-gray-100 border border-gray-400 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="number"
          v-model.number="maxPrice"
          placeholder="Max Price"
          class="w-1/5 bg-gray-100 border border-gray-400 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-lg text-center mt-6">
        Loading services...
      </div>

      <!-- Error Message -->
      <div v-if="error" class="text-red-500 text-lg text-center mt-6">
        {{ error }}
      </div>

      <!-- No Services Message -->
      <div
        v-if="!loading && filteredServices.length === 0"
        class="text-lg text-center mt-6 text-gray-500"
      >
        No services found matching "{{ searchQuery }}" in "{{ activeCategory }}"
        within price range {{ minPrice }} - {{ maxPrice }}.
      </div>

      <!-- Service Cards -->
      <div
        v-if="filteredServices.length"
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="service in filteredServices"
          :key="service._id"
          class="bg-gray-100 p-4 rounded shadow-md"
        >
          <!-- Service Image -->
          <img
            :src="
              service.photos.length ? service.photos[0].url : '/placeholder.jpg'
            "
            alt="Service Image"
            class="w-full h-64 object-cover rounded-md"
          />

          <!-- Service Info -->
          <h3 class="text-lg font-semibold text-gray-800 mt-4">
            {{ service.title }}
          </h3>
          <p class="text-gray-600 mt-2">{{ service.shortDescription }}</p>
          <p class="text-gray-900 font-semibold mt-2">
            Rs. {{ service.basePrice }} /
            {{ service.priceUnit.replace("_", " ") }}
          </p>

          <!-- View Details Button -->
          <router-link
            :to="'/viewdetails/' + service._id"
            class="mt-4 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-purple-800 transition"
          >
            View Details
          </router-link>
        </div>
      </div>
    </section>

    <!-- Special Wishes Section -->
    <section class="py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">We Value Your Thoughts</h2>
      <p class="mt-4 text-lg">
        We'd love to hear from you and discuss your upcoming plans. Feel free to
        share your thoughts with us!
      </p>
      <button
        class="mt-6 bg-primary text-white px-6 py-3 rounded hover:bg-purple-800"
      >
        Get in Touch
      </button>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      services: [],
      searchQuery: "",
      activeCategory: "all",
      minPrice: null,
      maxPrice: null,
      loading: true,
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
        // Match search query (title or type)
        const matchesSearch =
          service.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          service.type.toLowerCase().includes(this.searchQuery.toLowerCase());

        // Match category
        const matchesCategory =
          this.activeCategory === "all" || service.type === this.activeCategory;

        // Match price range
        const matchesPrice =
          (!this.minPrice || service.basePrice >= this.minPrice) &&
          (!this.maxPrice || service.basePrice <= this.maxPrice);

        return matchesSearch && matchesCategory && matchesPrice;
      });
    },
  },
  methods: {
    async fetchServices() {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/all-services"
        );
        this.services = response.data;
      } catch (error) {
        this.error = "Error fetching services. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    filterServices(category) {
      this.activeCategory = category;
    },
  },
  mounted() {
    this.fetchServices();
  },
};
</script>
