<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50"
  >
    <div v-if="verifying" class="flex items-center gap-3 text-lg text-gray-700">
      <svg
        class="animate-spin h-6 w-6 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      Verifying your payment...
    </div>
    <div
      v-else-if="status === 'Completed'"
      class="max-w-md mx-auto mt-10 text-center bg-green-50 border border-green-300 text-green-800 px-6 py-6 rounded-2xl shadow-md"
    >
      <h2
        class="text-2xl font-bold flex items-center justify-center gap-2 mb-3"
      >
        <span>✅</span> Payment Successful!
      </h2>
      <p class="text-base leading-relaxed">
        Your booking has been confirmed. We’re thrilled to be part of your event
        journey. Thank you for choosing <strong>PartyPal</strong> 🎉
      </p>

      <router-link
        to="/my-bookings"
        class="mt-6 inline-block bg-primary text-white font-medium px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-all duration-200"
      >
        View My Bookings
      </router-link>
    </div>

    <div
      v-else
      class="text-center bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow-sm"
    >
      <h2 class="text-2xl font-semibold mb-2">❌ Payment Failed</h2>
      <p class="text-base">
        Your payment could not be verified or was cancelled. Please try again.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      verifying: true,
      status: null,
      pidx: null,
      transactionId: null,
      amount: null,
    };
  },
  async mounted() {
    const query = new URLSearchParams(window.location.search);
    this.status = query.get("status");
    this.pidx = query.get("pidx");
    this.transactionId = query.get("transaction_id");
    this.amount = query.get("amount");

    if (this.status === "Completed") {
      try {
        await axios.post(
          "http://localhost:8081/booking/confirm",
          {
            bookingId: localStorage.getItem("bookingId"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      } catch (err) {
        console.error("❌ Booking confirmation failed:", err);
      }
    }

    this.verifying = false;
  },
};
</script>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}
</style>
