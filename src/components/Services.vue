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
            <h1>{{ service.photos[0] }}</h1>
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

            <router-link
              :to="`/chat?vendorId=${service.vendorId._id}`"
              class="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 8h10M7 12h6m-6 4h4"
                />
              </svg>
              Chat
            </router-link>

            <!-- View details Button -->
            <div class="mt-4 flex flex-wrap gap-2">
              <button
                @click="openServiceModal(service)"
                class="flex-1 px-4 py-2 bg-primary text-white text-center rounded-md font-medium hover:bg-purple-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Details Modal -->
    <div
      v-if="selectedService"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="selectedService = null"
    >
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="sticky top-0 bg-white p-4 border-b flex justify-between items-center"
        >
          <h2 class="text-xl font-bold">{{ selectedService.title }}</h2>
          <button
            @click="selectedService = null"
            class="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
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
                class="aspect-video bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  :src="photo.url"
                  :alt="photo.name || 'Service photo'"
                  class="w-full h-full object-cover hover:scale-105 transition-transform cursor-zoom-in"
                  @click="openLightbox(index)"
                />
              </div>
            </div>
          </div>

          <!-- Basic Info -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">
              Service Details
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-gray-500">Service Type</p>
                  <p class="font-medium capitalize">
                    {{ selectedService.type }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Location</p>
                  <p class="font-medium">{{ selectedService.location }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Price</p>
                  <p class="font-medium">
                    Rs. {{ selectedService.basePrice.toLocaleString() }} /
                    {{ formatPriceUnit(selectedService.priceUnit) }}
                  </p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-gray-500">Capacity</p>
                  <p class="font-medium">
                    {{ selectedService.minGuests }} -
                    {{ selectedService.maxGuests }} guests
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Advance Payment</p>
                  <p class="font-medium">
                    {{ selectedService.advancePayment }}% required
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Cancellation Policy</p>
                  <p class="font-medium">
                    {{ formatCancellationPolicy(selectedService) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Event Date Picker -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">Event Date</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Event Date</label
                >
                <input
                  type="date"
                  v-model="eventDate"
                  :min="minSelectableDate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Please select your event date
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Event Time</label
                >
                <input
                  type="time"
                  v-model="eventTime"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">
              Description
            </h3>
            <div class="prose max-w-none">
              <p class="whitespace-pre-line">
                {{ selectedService.detailedDescription }}
              </p>
            </div>
          </div>

          <!-- Special Features -->
          <div
            v-if="
              selectedService.cuisines?.length ||
              selectedService.dietaryOptions?.length
            "
            class="mb-8"
          >
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">
              Special Features
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="cuisine in selectedService.cuisines"
                :key="'cuisine-' + cuisine"
                class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm capitalize"
              >
                {{ cuisine }}
              </span>
              <span
                v-for="diet in selectedService.dietaryOptions"
                :key="'diet-' + diet"
                class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm capitalize"
              >
                {{ diet }}
              </span>
            </div>
          </div>

          <!-- Packages -->
          <div v-if="selectedService.packages?.length" class="mb-8">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">
              Available Packages
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="pkg in selectedService.packages"
                :key="pkg.name"
                class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                :class="{
                  'border-2 border-primary': selectedPackage?._id === pkg._id,
                  'bg-gray-50': selectedPackage?._id === pkg._id,
                }"
                @click="selectedPackage = pkg"
              >
                <div class="flex justify-between items-start">
                  <h4 class="font-bold text-lg mb-2">{{ pkg.name }}</h4>
                  <span
                    v-if="selectedPackage?._id === pkg._id"
                    class="bg-primary text-white p-1 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <p class="text-primary font-bold mb-2">
                  Rs. {{ pkg.price.toLocaleString() }}
                </p>
                <p class="text-gray-600 mb-3">{{ pkg.description }}</p>
                <div v-if="pkg.features?.length">
                  <p class="font-medium mb-2 text-sm">Includes:</p>
                  <ul class="space-y-1 text-sm">
                    <li
                      v-for="(feature, index) in pkg.features"
                      :key="index"
                      class="flex items-start"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Package Customization -->
          <div v-if="selectedPackage" class="mb-8">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">
              Customize Package
            </h3>

            <!-- Guest Count -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Number of Guests</label
              >
              <input
                type="number"
                v-model.number="guestCount"
                :min="selectedService.minGuests"
                :max="selectedService.maxGuests"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p class="text-xs text-gray-500 mt-1">
                Min: {{ selectedService.minGuests }}, Max:
                {{ selectedService.maxGuests }}
              </p>
            </div>

            <!-- Additional Options -->
            <div v-if="selectedService.additionalServices?.length" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Add Services</label
              >
              <div class="space-y-2">
                <div
                  v-for="service in selectedService.additionalServices"
                  :key="service"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :id="'service-' + service"
                    :value="service"
                    v-model="selectedAddOns"
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    :for="'service-' + service"
                    class="ml-2 text-sm text-gray-700"
                    >{{ service }}</label
                  >
                </div>
              </div>
            </div>

            <!-- Special Requests -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Special Requests</label
              >
              <textarea
                v-model="specialRequests"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Any dietary restrictions or special requirements..."
              ></textarea>
            </div>
          </div>

          <!-- PDF Menu -->
          <div v-if="selectedService.menuPdf?.url" class="mb-8">
            <h3 class="text-lg font-semibold mb-3 pb-2 border-b">Menu</h3>
            <button
              @click="downloadPdf(selectedService.menuPdf)"
              class="flex items-center gap-2 text-primary hover:text-purple-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>{{ selectedService.menuPdf.name || "Download Menu" }}</span>
            </button>
          </div>

          <!-- Budget Review -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">
              Budget Review
            </h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Base Price -->
                <div class="flex justify-between">
                  <span class="text-gray-600">Base Price:</span>
                  <span class="font-medium">
                    Rs. {{ selectedService.basePrice.toLocaleString() }}
                  </span>
                </div>

                <!-- Package Price (if selected) -->
                <div v-if="selectedPackage" class="flex justify-between">
                  <span class="text-gray-600">Package:</span>
                  <span class="font-medium">
                    Rs. {{ selectedPackage.price.toLocaleString() }}
                  </span>
                </div>

                <!-- Guest Count Adjustment -->
                <div class="flex justify-between">
                  <span class="text-gray-600">Guests ({{ guestCount }}):</span>
                  <span class="font-medium">
                    (Charge For Extra Guest) Rs.
                    {{ calculateGuestAdjustment().toLocaleString() }}
                  </span>
                </div>

                <!-- Add-ons -->
                <div v-if="selectedAddOns.length" class="col-span-full">
                  <div class="border-t pt-2 mt-2">
                    <p class="text-sm text-gray-500 mb-1">Add-ons:</p>
                    <div
                      v-for="addOn in selectedAddOns"
                      :key="addOn"
                      class="flex justify-between mb-1"
                    >
                      <span class="text-sm">{{ addOn }}</span>
                      <span class="text-sm font-medium"
                        >+ Rs. {{ getAddOnPrice(addOn).toLocaleString() }}</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Total Estimate -->
                <div class="col-span-full border-t pt-3 mt-2">
                  <div class="flex justify-between font-bold text-lg">
                    <span>Total Estimate:</span>
                    <span class="text-primary">
                      Rs. {{ calculateTotalPrice().toLocaleString() }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Budget Warning -->
              <div
                v-if="isOverBudget"
                class="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 inline mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                This exceeds your budget of Rs.
                {{ userBudget.toLocaleString() }}
              </div>
            </div>
          </div>

          <!-- Payment Options -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-4 pb-2 border-b">
              Payment Options
            </h3>
            <div class="space-y-4">
              <!-- Full Payment Option -->
              <div
                class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                :class="{
                  'border-2 border-primary bg-gray-50':
                    paymentOption === 'full',
                }"
                @click="paymentOption = 'full'"
              >
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <input
                      type="radio"
                      id="payment-full"
                      v-model="paymentOption"
                      value="full"
                      class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                  </div>
                  <div class="ml-3">
                    <label for="payment-full" class="block font-medium"
                      >Pay Full Amount</label
                    >
                    <p class="text-sm text-gray-600 mt-1">
                      Pay the total amount of Rs.
                      {{ calculateTotalPrice(true).toLocaleString() }} now.
                    </p>
                    <div class="mt-2 text-sm text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 inline mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Get 5% discount on full payment
                    </div>
                  </div>
                </div>
              </div>

              <!-- Partial Payment Option -->
              <div
                class="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                :class="{
                  'border-2 border-primary bg-gray-50':
                    paymentOption === 'partial',
                }"
                @click="paymentOption = 'partial'"
              >
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-1">
                    <input
                      type="radio"
                      id="payment-partial"
                      v-model="paymentOption"
                      value="partial"
                      class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                  </div>
                  <div class="ml-3">
                    <label for="payment-partial" class="block font-medium"
                      >Pay Partial Amount</label
                    >
                    <p class="text-sm text-gray-600 mt-1">
                      Pay {{ selectedService.advancePayment }}% now (Rs.
                      {{ calculateAdvancePayment().toLocaleString() }}) and the
                      rest later.
                    </p>
                    <div v-if="paymentOption === 'partial'" class="mt-3">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Custom Advance Payment (min
                        {{ selectedService.advancePayment }}%)</label
                      >
                      <div class="flex items-center gap-2">
                        <input
                          type="range"
                          v-model.number="customAdvance"
                          :min="selectedService.advancePayment"
                          max="100"
                          class="w-full"
                        />
                        <span class="text-sm font-medium w-12"
                          >{{ customAdvance }}%</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div
            class="sticky bottom-0 bg-white p-4 border-t flex justify-between items-center"
          >
            <div>
              <p class="text-sm text-gray-500">Total Estimate</p>
              <p class="text-xl font-bold text-primary">
                Rs. {{ calculateTotalPrice().toLocaleString() }}
              </p>
              <p v-if="eventDate" class="text-sm text-gray-500 mt-1">
                For {{ formatEventDate() }}
              </p>
            </div>
            <div class="flex gap-3">
              <button
                @click="selectedService = null"
                class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                @click="initiatePayment(selectedService._id)"
                :disabled="paymentLoading || !eventDate"
                class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400 flex items-center gap-2"
              >
                <span v-if="!paymentLoading">
                  {{
                    paymentOption === "full" ? "Pay Full Amount" : "Pay Advance"
                  }}
                  (Rs.
                  {{
                    paymentOption === "full"
                      ? calculateTotalPrice(true).toLocaleString()
                      : calculateAdvancePayment().toLocaleString()
                  }})
                </span>
                <span v-else>Processing...</span>
                <svg
                  v-if="paymentLoading"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        @click.self="lightboxOpen = false"
      >
        <button
          @click="lightboxOpen = false"
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          :src="selectedService.photos[currentImageIndex].url"
          class="max-w-[90vw] max-h-[90vh] object-contain"
        />
      </div>
    </div>

    <!-- Special Wishes Section -->
    <section class="py-16 px-6 bg-gray-50 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-primary">We Value Your Thoughts</h2>
        <p class="mt-4 text-gray-600">
          We'd love to hear from you and discuss your upcoming plans. Feel free
          to share your thoughts with us!
        </p>
        <router-link
          to="/contactus"
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
      selectedService: null,
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
      lightboxOpen: false,
      currentImageIndex: 0,
      selectedPackage: null,
      guestCount: 1,
      selectedAddOns: [],
      specialRequests: "",
      paymentOption: "full",
      customAdvance: 0,
      userBudget: 50000,
      eventDate: "",
      eventTime: "19:00", // Default to 7 PM
    };
  },
  computed: {
    filteredServices() {
      return this.services.filter((service) => {
        const matchesSearch =
          this.searchQuery === "" ||
          service.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          service.shortDescription
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());

        const matchesCategory =
          this.activeCategory === "all" || service.type === this.activeCategory;

        const matchesPrice =
          (this.minPrice === null || service.basePrice >= this.minPrice) &&
          (this.maxPrice === null || service.basePrice <= this.maxPrice);

        return matchesSearch && matchesCategory && matchesPrice;
      });
    },
    minSelectableDate() {
      // Set minimum date to today
      const today = new Date();
      today.setDate(today.getDate());
      return today.toISOString().split("T")[0];
    },
    activeCategoryLabel() {
      if (this.activeCategory === "all") return "All Categories";
      const category = this.categories.find(
        (c) => c.value === this.activeCategory
      );
      return category ? category.label : this.activeCategory;
    },
    isOverBudget() {
      if (!this.selectedService) return false;
      return this.calculateTotalPrice() > this.userBudget;
    },
  },
  methods: {
    async fetchServices() {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.get(
          "https://partypal-2.onrender.com/api/all-services"
        );
        this.services = response.data;
      } catch (error) {
        console.error("Error fetching services:", error);
        this.error = "Failed to load services. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    formatEventDate() {
      if (!this.eventDate) return "";

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const date = new Date(this.eventDate);

      let formatted = date.toLocaleDateString("en-US", options);

      if (this.eventTime) {
        formatted += ` at ${this.eventTime}`;
      }

      return formatted;
    },
    filterServices(category) {
      this.activeCategory = category;
    },
    openServiceModal(service) {
      this.selectedService = service;
      this.selectedPackage = null;
      this.guestCount = service?.minGuests || 1;
      this.selectedAddOns = [];
      this.specialRequests = "";
      this.lightboxOpen = false;
      this.customAdvance = service?.advancePayment || 20;
      this.eventDate = ""; // Reset event date when opening modal
      this.eventTime = "19:00"; // Reset to default time
    },
    openLightbox(index) {
      this.currentImageIndex = index;
      this.lightboxOpen = true;
    },
    downloadPdf(menuPdf) {
      const link = document.createElement("a");
      link.href = menuPdf.url;
      link.download = menuPdf.name.endsWith(".pdf")
        ? menuPdf.name
        : `${menuPdf.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    calculateGuestAdjustment() {
      if (!this.selectedPackage || !this.selectedService) return 0;

      const baseGuests =
        Number(this.selectedPackage.baseGuests) ||
        Number(this.selectedService.minGuests);
      const additionalPrice =
        Number(this.selectedPackage.additionalGuestPrice) || 0;
      const guestCount = Number(this.guestCount);

      return Math.max(0, guestCount - baseGuests) * additionalPrice;
    },
    getAddOnPrice() {
      return 1000;
    },
    calculateTotalPrice(applyDiscount = false) {
      if (!this.selectedService) return 0;

      let total = 0;

      if (this.selectedPackage && this.selectedPackage.price) {
        total = Number(this.selectedPackage.price);
        total += this.calculateGuestAdjustment();
      } else {
        total = Number(this.selectedService.basePrice);
      }

      // Add add-ons cost
      this.selectedAddOns.forEach(() => {
        total += this.getAddOnPrice();
      });

      // Only apply discount if explicitly requested (for full payment)
      if (applyDiscount && this.paymentOption === "full") {
        total = total * 0.95; // 5% discount
      }

      return total;
    },

    calculateAdvancePayment() {
      // Calculate base amount WITHOUT discount
      const baseAmount = this.calculateTotalPrice(false);
      const percentage =
        this.paymentOption === "partial" ? Number(this.customAdvance) : 100;

      return Math.round(baseAmount * (percentage / 100));
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
    formatCancellationPolicy(service) {
      if (service.cancelationPolicy === "custom") {
        return service.customCancelationPolicy || "Custom policy";
      }
      const policies = {
        flexible: "Flexible (Full refund up to 24 hours before)",
        moderate: "Moderate (Full refund up to 7 days before)",
        strict: "Strict (50% refund up to 14 days before)",
      };
      return (
        policies[service.cancelationPolicy] || "Moderate cancellation policy"
      );
    },
    async initiatePayment(serviceId) {
      if (!this.eventDate) {
        this.error = "Please select an event date";
        return;
      }
      try {
        this.paymentLoading = true;

        // Debug logging
        console.log("Looking for auth token in localStorage");

        // Get the authentication token from localStorage
        const authToken = localStorage.getItem("authToken");
        console.log("Auth token exists:", !!authToken);

        if (!authToken) {
          console.log("No auth token found - redirecting to auth");
          this.error = "Please log in to continue";
          this.$router.push("/auth");
          return;
        }

        // Try to extract user ID from the token if possible
        // Or make an API call to get the user information

        // For JWT tokens, you can try to decode them
        let userId;
        try {
          // Basic JWT parsing (middle part contains payload)
          const payload = JSON.parse(atob(authToken.split(".")[1]));
          userId = payload.userId || payload.sub || payload._id || payload.id;
          console.log("Extracted user ID from token:", userId);
        } catch (e) {
          console.log("Could not extract user ID from token");
        }

        // If you can't extract the ID from the token, make an API call
        if (!userId) {
          try {
            const userResponse = await axios.get(
              "https://partypal-2.onrender.com/api/auth/me",
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            userId = userResponse.data._id;
            console.log("Got user ID from API:", userId);
          } catch (error) {
            console.error("Error fetching user data:", error);
            this.error = "Session expired. Please log in again.";
            this.$router.push("/auth");
            return;
          }
        }

        const paymentData = {
          serviceId,
          user: userId,
          packageId: this.selectedPackage?._id,
          guestCount: this.guestCount,
          addOns: this.selectedAddOns,
          specialRequests: this.specialRequests,
          paymentOption: this.paymentOption,
          amount:
            this.paymentOption === "full"
              ? this.calculateTotalPrice(true)
              : this.calculateAdvancePayment(),
          isFullPayment: this.paymentOption === "full",
          eventDate: this.eventDate,
          eventTime: this.eventTime,
        };

        // Rest of your code remains the same
        const baseURL = window.location.origin.includes("localhost")
          ? "https://partypal-2.onrender.com"
          : "";

        const response = await axios.post(
          `${baseURL}/payment/initiate`,
          paymentData,
          {
            headers: {
              "Content-Type": "application/json",
              // Add the correct authorization header using authToken
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("response");
        console.log(response.data);
        localStorage.setItem("bookingId", response.data.bookingId);
        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          throw new Error("No payment URL received");
        }
      } catch (error) {
        console.error("Payment error:", error);
        this.error =
          error.response?.data?.message || "Payment failed. Please try again.";
      } finally {
        this.paymentLoading = false;
      }
    },
  },
  mounted() {
    this.fetchServices();
    this.customAdvance = this.selectedService?.advancePayment || 20;
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
    selectedService(newVal) {
      if (newVal) {
        this.guestCount = newVal.minGuests || 1;
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
.prose {
  line-height: 1.6;
}
.prose p {
  margin-bottom: 1em;
}
.whitespace-pre-line {
  white-space: pre-line;
}
</style>
