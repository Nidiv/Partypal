<template>
  <div class="font-zen text-gray-800 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-primary mb-8">My Bookings</h1>

      <div v-if="loading" class="text-center text-gray-500">Loading...</div>
      <div v-else-if="bookings.length === 0" class="text-center text-gray-500">
        No completed bookings yet.
      </div>

      <div class="grid gap-6">
        <div
          v-for="booking in bookings"
          :key="booking._id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <!-- Service Image -->
          <div class="h-48 w-full">
            <img
              :src="
                booking.service.photos?.length
                  ? booking.service.photos[0].url
                  : '/placeholder.jpg'
              "
              :alt="booking.service.title"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="p-6">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-xl font-bold text-gray-800">
                  {{ booking.service.title || "Service Title" }}
                </h2>
                <p class="text-gray-600 mt-1">
                  Booked on: {{ formatDate(booking.createdAt) }}
                </p>
              </div>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                Completed
              </span>
            </div>

            <!-- Details -->
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Booking ID</p>
                <p class="font-medium">{{ booking._id }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Event Date</p>
                <p class="font-medium">{{ formatDate(booking.eventDate) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Payment Status</p>
                <p class="font-medium capitalize text-green-600">
                  {{ booking.paymentStatus }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Payment Option</p>
                <p class="font-medium capitalize">
                  {{ booking.paymentOption }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Amount</p>
                <p class="font-medium">
                  Rs. {{ formatNumber(booking.totalAmount) }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Advance Paid</p>
                <p class="font-medium">
                  Rs. {{ formatNumber(booking.advanceAmount) }}
                </p>
              </div>
              <!-- Amount Left to Pay -->
              <div v-if="booking.paymentStatus === 'partial'">
                <p class="text-sm text-gray-500">Amount Left</p>
                <p class="font-medium text-red-600">
                  Rs.
                  {{
                    formatNumber(booking.totalAmount - booking.advanceAmount)
                  }}
                </p>
                <button
                  @click="payRemainingAmount(booking)"
                  class="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Pay Now
                </button>
              </div>
            </div>

            <!-- Service Info -->
            <div class="mt-6 border-t pt-4">
              <h3 class="text-lg font-semibold mb-2 text-gray-800">
                Service Information
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500">Service Type</p>
                  <p class="font-medium capitalize">
                    {{ booking.service.type }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Location</p>
                  <p class="font-medium">{{ booking.service.location }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Base Price</p>
                  <p class="font-medium">
                    Rs. {{ formatNumber(booking.service.basePrice) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Pricing Unit</p>
                  <p class="font-medium">{{ booking.service.priceUnit }}</p>
                </div>
              </div>
              <div class="mt-4">
                <p class="text-sm text-gray-500">Short Description</p>
                <p class="text-sm text-gray-700">
                  {{ booking.service.shortDescription }}
                </p>
              </div>
            </div>

            <!-- Existing Feedback -->
            <div v-if="booking.feedback" class="mt-6 border-t pt-4">
              <div class="flex items-center mb-2">
                <div class="flex">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    :class="
                      star <= booking.feedback.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                </div>
                <span class="ml-2 text-sm font-medium">Your rating</span>
              </div>
              <p class="text-gray-700 text-sm">"{{ booking.feedback.text }}"</p>
              <p class="text-xs text-gray-500 mt-2">
                Submitted on {{ formatDate(booking.feedback.submittedAt) }}
              </p>
            </div>

            <!-- New Feedback Form -->
            <div
              v-else-if="new Date(booking.eventDate) < new Date()"
              class="mt-6 border-t pt-4"
            >
              <h3 class="text-md font-semibold text-gray-800 mb-2">
                Leave Feedback
              </h3>
              <div class="flex items-center mb-2">
                <label v-for="star in 5" :key="star" class="cursor-pointer">
                  <input
                    type="radio"
                    :value="star"
                    v-model="feedbackRatings[booking._id]"
                    class="hidden"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    :class="
                      star <= feedbackRatings[booking._id]
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                </label>
              </div>
              <textarea
                v-model="feedbackTexts[booking._id]"
                rows="3"
                class="w-full border rounded px-3 py-2 text-sm"
                placeholder="Write your feedback here..."
              ></textarea>
              <button
                @click="submitFeedback(booking)"
                class="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyBookings",
  data() {
    return {
      bookings: [],
      loading: true,
      feedbackRatings: {},
      feedbackTexts: {},
    };
  },
  methods: {
    formatNumber(num) {
      return new Intl.NumberFormat("en-NP").format(num);
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    async fetchBookings() {
      try {
        const res = await axios.get(
          "http://localhost:8081/booking/my-completed",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        this.bookings = res.data;
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        this.loading = false;
      }
    },
    async payRemainingAmount(booking) {
      const amountLeft = booking.totalAmount - booking.advanceAmount;

      try {
        this.paymentLoading = true;
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          this.$router.push("/auth");
          return;
        }

        let userId;
        try {
          const payload = JSON.parse(atob(authToken.split(".")[1]));
          userId = payload.userId || payload.sub || payload._id || payload.id;
        } catch (e) {
          // fallback to API call if token can't be decoded
        }

        if (!userId) {
          try {
            const userResponse = await axios.get(
              "http://localhost:8081/api/auth/me",
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            userId = userResponse.data._id;
          } catch (error) {
            console.error("User info error:", error);
            this.$router.push("/auth");
            return;
          }
        }

        const paymentData = {
          bookingId: booking._id,
          user: userId,
          amount: amountLeft,
          paymentOption: "partial",
          isFullPayment: false,
        };

        const baseURL = window.location.origin.includes("localhost")
          ? "http://localhost:8081"
          : "";

        const response = await axios.post(
          `${baseURL}/payment/remaining`,
          paymentData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          throw new Error("No payment URL received");
        }
      } catch (error) {
        console.error("Error in partial payment:", error);
        alert(
          error.response?.data?.message ||
            "Failed to initiate payment. Try again."
        );
      } finally {
        this.paymentLoading = false;
      }
    },
    async submitFeedback(booking) {
      try {
        const rating = this.feedbackRatings[booking._id];
        const text = this.feedbackTexts[booking._id];
        if (!rating || !text) {
          alert("Please provide both a rating and a comment.");
          return;
        }
        await axios.post(
          `http://localhost:8081/booking/feedback/${booking._id}`,
          { rating, text },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        alert("Feedback submitted!");
        this.fetchBookings(); // Refresh list to show feedback
      } catch (err) {
        console.error("Failed to submit feedback:", err);
      }
    },
  },
  mounted() {
    this.fetchBookings();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.text-primary {
  color: #8b5cf6;
}
.bg-primary {
  background-color: #8b5cf6;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #8b5cf6;
}
.focus\:border-primary:focus {
  border-color: #8b5cf6;
}
.font-zen {
  font-family: "Zen Kaku Gothic New", sans-serif;
}
</style>
