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
      <div class="mt-6 flex justify-center space-x-4">
        <button
          class="bg-primary text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          All
        </button>
        <button
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Corporate Events
        </button>
        <button
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Social Events
        </button>
        <button
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Wedding
        </button>
      </div>

      <!-- Images Grid -->
      <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <img
          src="../assets/img/birthday.jpg"
          alt="Fine dining setup with elegant table arrangements"
          class="w-full h-40 object-cover rounded-lg shadow"
          loading="lazy"
        />
        <img
          src="../assets/img/birthday-3.jpg"
          alt="Birthday celebration with a decorated cake and balloons"
          class="w-full h-40 object-cover rounded-lg shadow"
          loading="lazy"
        />
        <img
          src="../assets/img/corporate.jpg"
          alt="Corporate event with professionals networking"
          class="w-full h-40 object-cover rounded-lg shadow"
          loading="lazy"
        />
        <img
          src="../assets/img/corporate-2.jpg"
          alt="Business conference with keynote speakers"
          class="w-full h-40 object-cover rounded-lg shadow"
          loading="lazy"
        />
        <img
          src="../assets/img/catering.jpg"
          alt="Children celebrating a birthday party with friends"
          class="w-full h-40 object-cover rounded-lg shadow"
          loading="lazy"
        />
        <img
          src="../assets/img/corporate-1.jpg"
          alt="Birthday party with guests gathered around a cake"
          class="w-full h-40 object-cover rounded-lg shadow"
          loading="lazy"
        />
        <img
          src="../assets/img/dinning.jpg"
          alt="Luxury restaurant interior with a cozy ambiance"
          class="w-full h-40 object-cover rounded-lg shadow"
          loading="lazy"
        />
        <img
          src="../assets/img/birthday-2.jpg"
          alt="Birthday party with guests gathered around a cake"
          class="w-full h-40 object-cover rounded-lg shadow"
          loading="lazy"
        />
      </div>
      <button
        @click="initiatePayment"
        class="mt-6 bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-800 transition"
      >
        Pay Now
      </button>
    </section>

    <!-- Ready-Made Packages -->
    <section class="bg-gray-50 py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">Ready-Made Packages</h2>

      <div class="mt-8 relative max-w-4xl mx-auto">
        <!-- Carousel Container -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <!-- Package Cards - Each card is 100% width of container -->
            <div class="min-w-full px-2">
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="../assets/img/birthday-2.jpg"
                  alt="Birthday Package"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-xl font-semibold">Birthday Package</h3>
                  <p class="text-gray-600 mt-2">
                    Complete birthday event planning with decorations, catering,
                    and more.
                  </p>
                  <button
                    class="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-purple-800"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div class="min-w-full px-2">
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="../assets/img/aboutus.jpg"
                  alt="Corporate Package"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-xl font-semibold">Corporate Package</h3>
                  <p class="text-gray-600 mt-2">
                    Professional corporate event management services tailored to
                    your needs.
                  </p>
                  <button
                    class="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-purple-800"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div class="min-w-full px-2">
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="../assets/img/birthday-2.jpg"
                  alt="Wedding Package"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-xl font-semibold">Wedding Package</h3>
                  <p class="text-gray-600 mt-2">
                    Elegant wedding planning services including venue selection,
                    decoration, and coordination.
                  </p>
                  <button
                    class="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-purple-800"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div class="min-w-full px-2">
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="../assets/img/corporate.jpg"
                  alt="Social Gathering Package"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-xl font-semibold">
                    Social Gathering Package
                  </h3>
                  <p class="text-gray-600 mt-2">
                    Perfect for reunions, parties, and social events with
                    full-service management.
                  </p>
                  <button
                    class="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-purple-800"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md z-10 focus:outline-none ml-1"
        >
          <svg
            class="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md z-10 focus:outline-none mr-1"
        >
          <svg
            class="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>

        <!-- Indicators -->
        <div class="flex justify-center mt-4">
          <div v-for="(_, index) in totalSlides" :key="index" class="mx-1">
            <button
              @click="goToSlide(index)"
              class="w-3 h-3 rounded-full focus:outline-none transition-colors duration-200"
              :class="
                currentSlide === index
                  ? 'bg-primary'
                  : 'bg-gray-300 hover:bg-gray-400'
              "
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-gray-50 py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">What Our Users Say</h2>
      <div class="mt-6 max-w-3xl mx-auto">
        <p class="italic">
          “PartyPal made my event planning so smooth! Highly recommended.”
        </p>
        <p class="font-semibold mt-2">- Rishav Gurung</p>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">Get in Touch</h2>
      <p class="mt-2">Have questions? Contact us today.</p>
      <button
        class="mt-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-purple-800"
      >
        <router-link to="/contactus">Contact Us</router-link>
      </button>
    </section>
  </div>
  <!-- <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded-md">
      Logout
    </button> -->
</template>
<script>
export default {
  data() {
    return {
      currentSlide: 0,
      totalSlides: 4, // Update this if you add more slides
      autoplayInterval: null,
    };
  },
  mounted() {
    // Start autoplay when component is mounted
    this.startAutoplay();
  },
  beforeUnmount() {
    // Clear the interval when component is unmounted
    this.stopAutoplay();
  },
  methods: {
    initiatePayment() {
      window.location.href = "http://localhost:8081/payment"; // Redirects to backend
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // Change slide every 5 seconds
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    },
    resetAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    },
    goToSlide(index) {
      this.currentSlide = index;
      this.resetAutoplay(); // Reset autoplay when manually changing slide
    },
  },
};
</script>
