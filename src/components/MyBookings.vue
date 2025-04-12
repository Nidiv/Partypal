<template>
  <div class="font-zen text-gray-800 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-primary mb-8">All Bookings</h1>

      <!-- Dynamic Booking List -->
      <div class="grid gap-6">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-xl font-bold text-gray-800">
                  {{ booking.serviceName }}
                </h2>
                <p class="text-gray-600 mt-1">
                  Booked on: {{ booking.formattedBookingDate }}
                </p>
              </div>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="booking.statusClass"
              >
                {{ booking.status }}
              </span>
            </div>

            <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p class="text-sm text-gray-500">Booking ID</p>
                <p class="font-medium">{{ booking.id }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Client</p>
                <p class="font-medium">{{ booking.clientName }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Service Type</p>
                <p class="font-medium capitalize">{{ booking.serviceType }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Event Date</p>
                <p class="font-medium">{{ booking.formattedEventDate }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Amount</p>
                <p class="font-medium">Rs. {{ booking.formattedAmount }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Payment Status</p>
                <p class="font-medium capitalize">
                  {{ booking.paymentStatus }}
                </p>
              </div>
            </div>

            <div class="mt-4">
              <p class="text-sm text-gray-500">Selected Package</p>
              <p class="font-medium">
                {{ booking.packageName }} (Rs. {{ booking.formattedAmount }})
              </p>
            </div>

            <!-- Feedback and Rating Section -->
            <div v-if="booking.isCompleted" class="mt-6 border-t pt-4">
              <div v-if="!booking.feedback">
                <h3 class="font-semibold text-lg mb-2">Rate this vendor</h3>
                <div class="flex items-center mb-3">
                  <div class="flex">
                    <button
                      v-for="star in 5"
                      :key="star"
                      class="focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        :class="
                          star <= (booking.currentRating || 0)
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
                    </button>
                  </div>
                  <span class="ml-2 text-sm text-gray-600">{{
                    booking.ratingText
                  }}</span>
                </div>
                <div class="mb-3">
                  <label
                    :for="`feedback-${booking.id}`"
                    class="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your feedback (optional)
                  </label>
                  <textarea
                    :id="`feedback-${booking.id}`"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Share your experience with this vendor..."
                    maxlength="200"
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ booking.feedbackLength }}/200 characters
                  </p>
                </div>
                <div class="flex items-center">
                  <button
                    :disabled="!booking.currentRating"
                    class="px-4 py-2 bg-primary text-white rounded font-medium"
                    :class="
                      !booking.currentRating
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    "
                  >
                    Submit Feedback
                  </button>
                  <span
                    v-if="booking.submitting"
                    class="ml-3 text-sm text-gray-600"
                  >
                    Submitting...
                  </span>
                </div>
              </div>
              <div v-else class="bg-gray-50 p-4 rounded-md">
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
                <p v-if="booking.feedback.text" class="text-gray-700 text-sm">
                  "{{ booking.feedback.text }}"
                </p>
                <p class="text-xs text-gray-500 mt-2">
                  Submitted on {{ booking.feedback.formattedSubmittedAt }}
                </p>
                <div
                  v-if="booking.feedback.vendorResponse"
                  class="mt-3 border-t pt-3"
                >
                  <p class="text-sm font-medium mb-1">Vendor Response:</p>
                  <p class="text-sm text-gray-700">
                    "{{ booking.feedback.vendorResponse.text }}"
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    Responded on
                    {{ booking.feedback.vendorResponse.formattedRespondedAt }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-6 flex flex-wrap gap-3">
              <button class="px-4 py-2 bg-primary text-white rounded">
                View Details
              </button>
              <button
                v-if="booking.canCancel"
                class="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancel Booking
              </button>
              <button
                v-else
                class="px-4 py-2 bg-red-500 text-white rounded cursor-not-allowed opacity-70"
              >
                Cancel Booking
              </button>
              <button
                v-if="booking.canEdit"
                class="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit Booking
              </button>
              <button
                v-else
                class="px-4 py-2 bg-blue-500 text-white rounded cursor-not-allowed opacity-70"
              >
                Edit Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllBookingsStatic",
  data() {
    return {
      bookings: [
        {
          id: "1234567890abcdef",
          serviceName: "Wedding Photography",
          bookingDate: "2025-01-15",
          formattedBookingDate: "January 15, 2025",
          status: "confirmed",
          statusClass: "bg-green-100 text-green-800",
          clientName: "John Doe",
          serviceType: "photography",
          eventDate: "2025-02-20",
          formattedEventDate: "February 20, 2025",
          totalAmount: 35000,
          formattedAmount: "35,000",
          paymentStatus: "paid",
          packageName: "Premium Package",
          vendorId: "v123456",
          feedback: null,
          isCompleted: false,
          canCancel: true,
          canEdit: true,
        },
        {
          id: "2345678901abcdef",
          serviceName: "Birthday Party Catering",
          bookingDate: "2025-01-20",
          formattedBookingDate: "January 20, 2025",
          status: "completed",
          statusClass: "bg-blue-100 text-blue-800",
          clientName: "John Doe",
          serviceType: "catering",
          eventDate: "2025-01-30",
          formattedEventDate: "January 30, 2025",
          totalAmount: 15000,
          formattedAmount: "15,000",
          paymentStatus: "paid",
          packageName: "Standard Package",
          vendorId: "v789012",
          isCompleted: true,
          canCancel: false,
          canEdit: false,
          feedback: {
            rating: 4,
            text: "Food was delicious and service was great. Highly recommend!",
            submittedAt: "2025-02-01",
            formattedSubmittedAt: "February 1, 2025",
            vendorResponse: {
              text: "Thank you for your kind words! We're glad you enjoyed our catering service.",
              respondedAt: "2025-02-02",
              formattedRespondedAt: "February 2, 2025",
            },
          },
        },
        {
          id: "3456789012abcdef",
          serviceName: "Anniversary Venue Booking",
          bookingDate: "2025-04-05",
          formattedBookingDate: "April 5, 2025",
          status: "pending",
          statusClass: "bg-yellow-100 text-yellow-800",
          clientName: "John Doe",
          serviceType: "venue",
          eventDate: "2025-05-15",
          formattedEventDate: "May 15, 2025",
          totalAmount: 50000,
          formattedAmount: "50,000",
          paymentStatus: "partial",
          packageName: "Deluxe Venue Package",
          vendorId: "v345678",
          feedback: null,
          isCompleted: false,
          canCancel: true,
          canEdit: true,
        },
        {
          id: "4567890123abcdef",
          serviceName: "Corporate Event Decoration",
          bookingDate: "2025-03-10",
          formattedBookingDate: "March 10, 2025",
          status: "completed",
          statusClass: "bg-blue-100 text-blue-800",
          clientName: "John Doe",
          serviceType: "decoration",
          eventDate: "2025-04-05",
          formattedEventDate: "April 5, 2025",
          totalAmount: 25000,
          formattedAmount: "25,000",
          paymentStatus: "paid",
          packageName: "Corporate Event Package",
          vendorId: "v901234",
          isCompleted: true,
          canCancel: false,
          canEdit: false,
          feedback: null,
          currentRating: 0,
          ratingText: "",
          feedbackLength: "0",
          submitting: false,
        },
      ],
    };
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
