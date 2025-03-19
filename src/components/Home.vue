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

      <!-- Dynamic Service Cards -->
      <div v-if="loading" class="text-lg text-center mt-6">
        Loading services...
      </div>
      <div v-if="error" class="text-red-500 text-lg text-center mt-6">
        {{ error }}
      </div>

      <div
        v-if="!loading && featuredServices.length > 0"
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="service in featuredServices"
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

      <!-- View All Services Button -->
      <router-link
        to="/services"
        class="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-800 transition"
      >
        View All Services
      </router-link>

      <!-- Pay Now Button -->
      <button
        @click="initiatePayment"
        class="mt-6 bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-800 transition"
      >
        Pay Now
      </button>
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
      featuredServices: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchServices() {
      try {
        const response = await axios.get("http://localhost:8081/api/services");
        this.services = response.data;
        this.selectFeaturedServices();
      } catch (error) {
        this.error = "Error fetching services. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    selectFeaturedServices() {
      // Select 3 random services to display on homepage
      if (this.services.length > 3) {
        this.featuredServices = [...this.services]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
      } else {
        this.featuredServices = this.services;
      }
    },
    initiatePayment() {
      window.location.href = "http://localhost:8081/payment"; // Redirects to backend
    },
  },
  mounted() {
    this.fetchServices();
  },
};
</script>
