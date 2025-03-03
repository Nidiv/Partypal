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
    </section>

    <!-- Corporate Events Section -->
    <section class="py-16 px-6">
      <h3 class="text-xl font-semibold text-center text-primary">
        Corporate Events
      </h3>
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Photo 1 -->
        <div class="bg-gray-100 p-4 rounded shadow-md">
          <img
            src="../assets/img/corporate-1.jpg"
            alt="Corporate Event"
            class="w-full h-64 object-cover rounded-md"
          />
        </div>
        <!-- Photo 2 -->
        <div class="bg-gray-100 p-4 rounded shadow-md">
          <img
            src="../assets/img/corporate-2.jpg"
            alt="Corporate Event"
            class="w-full h-64 object-cover rounded-md"
          />
        </div>
        <!-- Photo 3 -->
        <div class="bg-gray-100 p-4 rounded shadow-md">
          <img
            src="../assets/img/corporate-3.jpg"
            alt="Corporate Event"
            class="w-full h-64 object-cover rounded-md"
          />
        </div>
        <!-- Photo 4 -->
        <div class="bg-gray-100 p-4 rounded shadow-md">
          <img
            src="../assets/img/corporate-4.jpg"
            alt="Corporate Event"
            class="w-full h-64 object-cover rounded-md"
          />
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
