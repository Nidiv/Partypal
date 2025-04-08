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
              :disabled="paymentLoading"
              class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400 flex items-center gap-2"
            >
              <span v-if="!paymentLoading">Book Now</span>
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
    openServiceModal(service) {
      this.selectedService = service;
      this.selectedPackage = null;
      this.guestCount = service.minGuests || 1;
      this.selectedAddOns = [];
      this.specialRequests = "";
      this.lightboxOpen = false;
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
    calculateTotalPrice() {
      if (this.selectedPackage) {
        let total = this.selectedPackage.price;
        // Add pricing logic for add-ons if needed
        return total;
      }
      return this.selectedService.basePrice;
    },
    initiateBooking() {
      const bookingData = {
        serviceId: this.selectedService._id,
        package: this.selectedPackage
          ? {
              id: this.selectedPackage._id,
              name: this.selectedPackage.name,
            }
          : null,
        guestCount: this.guestCount,
        addOns: this.selectedAddOns,
        specialRequests: this.specialRequests,
        totalPrice: this.calculateTotalPrice(),
      };

      console.log("Booking data:", bookingData);
      // this.$router.push({
      //   path: '/booking',
      //   query: bookingData
      // });
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
      try {
        this.paymentLoading = true;
        const response = await axios.get(
          `http://localhost:8081/payment/${serviceId}`
        );

        if (response.data.payment_url) {
          // Redirect to Khalti payment page
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
