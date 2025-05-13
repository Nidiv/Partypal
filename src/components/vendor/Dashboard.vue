<template>
  <div class="flex">
    <NavVendor />

    <div class="p-6 font-zen text-gray-800 w-full">
      <h1 class="text-3xl font-bold text-primary mb-6">
        🎉 Welcome to Your Dashboard
      </h1>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white p-4 rounded-xl shadow">
          <h2 class="text-lg font-semibold mb-2">📊 Monthly Bookings</h2>
          <BarChart v-if="chartData" :chart-data="chartData" />
        </div>
        <div class="bg-white p-4 rounded-xl shadow">
          <h2 class="text-lg font-semibold mb-2">💰 Payment Status</h2>
          <DoughnutChart v-if="paymentData" :chart-data="paymentData" />
        </div>
      </div>

      <!-- Review Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow p-4 text-center">
          <p class="text-sm text-gray-600">👍 Good Reviews</p>
          <p class="text-2xl font-bold text-green-600">
            {{ reviewStats.good }}
          </p>
        </div>
        <div class="bg-white rounded-xl shadow p-4 text-center">
          <p class="text-sm text-gray-600">👎 Bad Reviews</p>
          <p class="text-2xl font-bold text-red-500">{{ reviewStats.bad }}</p>
        </div>
        <div class="bg-white rounded-xl shadow p-4 text-center">
          <p class="text-sm text-gray-600">⭐ Average Rating</p>
          <p class="text-2xl font-bold text-yellow-500">
            {{ reviewStats.average }}
          </p>
        </div>
      </div>

      <!-- Bookings Table -->
      <h2 class="text-xl font-semibold mb-4 text-primary">
        📋 Vendor Bookings
      </h2>
      <div v-if="loading" class="text-center text-gray-500">
        Loading bookings...
      </div>
      <div v-else-if="bookings.length === 0" class="text-center text-gray-500">
        No bookings found.
      </div>

      <div v-else class="overflow-x-auto rounded-lg shadow">
        <table class="min-w-full bg-white divide-y divide-gray-200 text-sm">
          <thead
            class="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <tr>
              <th class="px-4 py-3">Service Title</th>
              <th class="px-4 py-3">Customer</th>
              <th class="px-4 py-3">Event Date</th>
              <th class="px-4 py-3">Total (Rs)</th>
              <th class="px-4 py-3">Advance (Rs)</th>
              <th class="px-4 py-3">Payment Status</th>
              <th class="px-4 py-3">Package</th>
              <th class="px-4 py-3">Feedback</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="booking in bookings"
              :key="booking._id"
              class="hover:bg-gray-50 align-top"
            >
              <td class="px-4 py-3 font-semibold text-gray-800">
                {{ booking.service.title }}
              </td>
              <td class="px-4 py-3">
                <p v-if="booking.user?.username">{{ booking.user.username }}</p>
                <p v-else class="italic text-gray-400">Guest user</p>
              </td>
              <td class="px-4 py-3">{{ formatDate(booking.eventDate) }}</td>
              <td class="px-4 py-3">{{ formatNumber(booking.totalAmount) }}</td>
              <td class="px-4 py-3">
                {{ formatNumber(booking.advanceAmount) }}
              </td>
              <td class="px-4 py-3 capitalize">
                <span
                  :class="{
                    'text-green-600 font-medium':
                      booking.paymentStatus === 'completed',
                    'text-yellow-500 font-medium':
                      booking.paymentStatus === 'pending',
                    'text-red-500 font-medium':
                      booking.paymentStatus === 'failed',
                  }"
                >
                  {{ booking.paymentStatus }}
                </span>
              </td>
              <td class="px-4 py-3">
                {{ booking.package?.name || "Not Selected" }}
              </td>
              <td class="px-4 py-3 max-w-xs">
                <div v-if="booking.feedback">
                  <div class="flex items-center mb-1">
                    <svg
                      v-for="star in 5"
                      :key="star"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="currentColor"
                      :class="
                        star <= booking.feedback.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      "
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.688h3.874c.969 0 1.371 1.24.588 1.81l-3.132 2.28 1.2 3.687c.3.921-.755 1.688-1.538 1.118L10 13.347l-3.143 2.163c-.783.57-1.838-.197-1.538-1.118l1.2-3.687-3.132-2.28c-.783-.57-.38-1.81.588-1.81h3.874l1.2-3.688z"
                      />
                    </svg>
                  </div>
                  <p class="text-xs italic text-gray-700">
                    "{{ booking.feedback.text }}"
                  </p>
                  <p class="text-[10px] text-gray-400 mt-1">
                    {{ formatDate(booking.feedback.submittedAt) }}
                  </p>
                </div>
                <span v-else class="italic text-gray-400"
                  >No feedbacks yet</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavVendor from "@/components/vendor/Nav-Vendor.vue";
import BarChart from "@/components/charts/BarChart.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";

export default {
  components: {
    NavVendor,
    BarChart,
    DoughnutChart,
  },
  data() {
    return {
      bookings: [],
      loading: true,
      chartData: null,
      paymentData: null,
    };
  },
  computed: {
    reviewStats() {
      const good = this.bookings.filter(
        (b) => b.feedback && b.feedback.rating >= 4
      ).length;
      const bad = this.bookings.filter(
        (b) => b.feedback && b.feedback.rating <= 2
      ).length;
      const ratings = this.bookings
        .filter((b) => b.feedback && b.feedback.rating)
        .map((b) => b.feedback.rating);
      const average =
        ratings.length > 0
          ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
          : "N/A";

      return { good, bad, average };
    },
  },
  methods: {
    async fetchBookings() {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          "http://localhost:8081/vendor/vendor-bookings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.bookings = res.data;

        // Generate chart data
        const months = {};
        const paymentStatusCount = { completed: 0, pending: 0, failed: 0 };

        res.data.forEach((b) => {
          const month = new Date(b.eventDate).toLocaleString("default", {
            month: "short",
          });
          months[month] = (months[month] || 0) + 1;
          paymentStatusCount[b.paymentStatus] =
            (paymentStatusCount[b.paymentStatus] || 0) + 1;
        });

        this.chartData = {
          labels: Object.keys(months),
          datasets: [
            {
              label: "Bookings",
              data: Object.values(months),
              backgroundColor: "#8b5cf6",
            },
          ],
        };

        this.paymentData = {
          labels: ["Completed", "Pending", "Failed"],
          datasets: [
            {
              data: [
                paymentStatusCount.completed,
                paymentStatusCount.pending,
                paymentStatusCount.failed,
              ],
              backgroundColor: ["#16a34a", "#facc15", "#ef4444"],
            },
          ],
        };
      } catch (err) {
        console.error("Failed to fetch vendor bookings:", err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    formatNumber(num) {
      return new Intl.NumberFormat("en-NP").format(num);
    },
  },
  mounted() {
    this.fetchBookings();
  },
};
</script>

<style scoped>
.text-primary {
  color: #8b5cf6;
}
.font-zen {
  font-family: "Zen Kaku Gothic New", sans-serif;
}
</style>
