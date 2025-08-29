<template>
  <div class="font-zen">
    <footer class="bg-[#5a1687] text-white pt-12 pb-6">
      <!-- Main Footer Content -->
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1">
            <router-link
              to="/home"
              class="text-2xl font-bold tracking-tight mb-4 inline-block"
            >
              PartyPal
            </router-link>
            <p class="text-gray-300 mt-3 mb-4">
              Your premier partner for unforgettable event experiences.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="col-span-1">
            <h3 class="text-lg font-semibold mb-4 text-purple-200">
              Quick Links
            </h3>
            <ul class="space-y-2">
              <li>
                <router-link
                  to="/home"
                  class="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </router-link>
              </li>
              <li>
                <router-link
                  to="/aboutus"
                  class="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </router-link>
              </li>
              <li>
                <router-link
                  to="/services"
                  class="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </router-link>
              </li>
              <li>
                <router-link
                  to="/contactus"
                  class="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div class="col-span-1">
            <h3 class="text-lg font-semibold mb-4 text-purple-200">
              Our Services
            </h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-gray-300 hover:text-white transition-colors"
                >
                  Corporate Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-300 hover:text-white transition-colors"
                >
                  Weddings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-300 hover:text-white transition-colors"
                >
                  Social Gatherings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-300 hover:text-white transition-colors"
                >
                  Custom Events
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="col-span-1">
            <h3 class="text-lg font-semibold mb-4 text-purple-200">
              Contact Us
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <svg
                  class="w-5 h-5 mt-0.5 mr-2 text-purple-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span class="text-gray-300">Lalitpur, Nepal</span>
              </li>
              <li class="flex items-start">
                <svg
                  class="w-5 h-5 mt-0.5 mr-2 text-purple-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span class="text-gray-300">partypal.co@gmail.com</span>
              </li>
              <li class="flex items-start">
                <svg
                  class="w-5 h-5 mt-0.5 mr-2 text-purple-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span class="text-gray-300">+977 9861119826</span>
              </li>
              <li class="mt-4">
                <router-link
                  to="/contactus"
                  class="bg-white text-[#6a1b9a] px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block mt-2"
                >
                  For Queries
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright - Centered -->
        <div class="border-t border-purple-800 mt-8 pt-6 flex justify-center">
          <p class="text-sm text-gray-300">
            2024 © Partypal - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
