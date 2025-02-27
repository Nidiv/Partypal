<template>
  <div class="font-zen text-gray-800">
    <!-- Hero Section -->
    <section class="bg-primary text-white text-center py-20 px-5">
      <h1 class="text-4xl font-bold">About PartyPal</h1>
      <p class="mt-4 text-lg">Your ultimate event management solution.</p>
    </section>

    <!-- Who Are We? -->
    <section class="py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">Who Are We?</h2>
      <p class="mt-4 max-w-3xl mx-auto">
        PartyPal is an innovative platform designed to make event planning
        effortless and stress-free.
      </p>
    </section>

    <!-- Our Vision & Mission -->
    <section class="bg-gray-50 py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">Our Vision & Mission</h2>
      <p class="mt-4 max-w-3xl mx-auto">
        We aim to revolutionize event management by providing seamless
        coordination between vendors and organizers.
      </p>
    </section>

    <!-- What We Do? -->
    <section class="py-16 px-6 flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 text-center md:text-left">
        <h2 class="text-2xl font-bold text-primary">What We Do?</h2>
        <p class="mt-4">
          We provide an all-in-one platform to plan, book, and manage events
          with ease.
        </p>
      </div>
      <img
        src="/img/what-we-do.jpg"
        alt="What We Do"
        class="md:w-1/2 rounded-lg shadow-lg mt-6 md:mt-0"
      />
    </section>

    <!-- Planning for an Event? -->
    <section class="bg-gray-50 py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">Planning for an Event?</h2>
      <p class="mt-4 max-w-3xl mx-auto">
        Let us take care of everything from venue booking to vendor
        coordination.
      </p>
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
          src="/img/event1.jpg"
          alt="Event Planning"
          class="w-full rounded-lg shadow"
        />
        <img
          src="/img/event2.jpg"
          alt="Event Planning"
          class="w-full rounded-lg shadow"
        />
        <img
          src="/img/event3.jpg"
          alt="Event Planning"
          class="w-full rounded-lg shadow"
        />
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 px-6 text-center">
      <h2 class="text-2xl font-bold text-primary">What Our Customers Say</h2>
      <div class="mt-6 flex flex-col md:flex-row justify-center space-x-6">
        <div class="text-center">
          <img
            src="/img/user1.jpg"
            alt="Customer"
            class="w-16 h-16 rounded-full mx-auto"
          />
          <p class="mt-2 font-semibold">John D.</p>
          <p class="italic">“PartyPal made my wedding planning effortless!”</p>
        </div>
        <div class="text-center">
          <img
            src="/img/user2.jpg"
            alt="Customer"
            class="w-16 h-16 rounded-full mx-auto"
          />
          <p class="mt-2 font-semibold">Emily R.</p>
          <p class="italic">“Highly recommend PartyPal for all events.”</p>
        </div>
      </div>
    </section>
  </div>
</template>
