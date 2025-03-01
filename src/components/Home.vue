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
          src="/img/event1.jpg"
          alt="Event 1"
          class="w-full rounded-lg shadow"
        />
        <img
          src="/img/event2.jpg"
          alt="Event 2"
          class="w-full rounded-lg shadow"
        />
        <img
          src="/img/event3.jpg"
          alt="Event 3"
          class="w-full rounded-lg shadow"
        />
        <img
          src="/img/event4.jpg"
          alt="Event 4"
          class="w-full rounded-lg shadow"
        />
        <img
          src="/img/event5.jpg"
          alt="Event 5"
          class="w-full rounded-lg shadow"
        />
        <img
          src="/img/event6.jpg"
          alt="Event 6"
          class="w-full rounded-lg shadow"
        />
        <img
          src="/img/event7.jpg"
          alt="Event 7"
          class="w-full rounded-lg shadow"
        />
        <img
          src="/img/event8.jpg"
          alt="Event 8"
          class="w-full rounded-lg shadow"
        />
      </div>
    </section>

    <!-- Ready-Made Packages -->
    <section class="bg-gray-50 py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">Ready-Made Packages</h2>
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="/img/birthday.jpg"
            alt="Birthday Package"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-xl font-semibold">Birthday Package</h3>
            <p class="text-gray-600 mt-2">
              Complete birthday event planning with decorations, catering, and
              more.
            </p>
            <button
              class="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              View Details
            </button>
          </div>
        </div>
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="/img/corporate.jpg"
            alt="Corporate Package"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-xl font-semibold">Corporate Package</h3>
            <p class="text-gray-600 mt-2">
              Professional corporate event management services tailored to your
              needs.
            </p>
            <button
              class="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              View Details
            </button>
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
export default {};
</script>
