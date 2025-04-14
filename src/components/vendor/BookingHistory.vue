<template>
  <div class="flex">
    <!-- Sidebar -->
    <NavVendor />

    <!-- Main Content -->
    <div class="p-6 font-zen text-gray-800 w-full">
      <h1 class="text-2xl font-bold mb-4 text-primary">Vendor Bookings</h1>

      <!-- Loading State -->
      <div v-if="loading" class="text-center text-gray-500">
        Loading bookings...
      </div>

      <!-- Empty State -->
      <div v-else-if="bookings.length === 0" class="text-center text-gray-500">
        No bookings found.
      </div>

      <!-- Bookings Table -->
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
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="booking in bookings"
              :key="booking._id"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-3 font-semibold text-gray-800">
                {{ booking.service.title }}
              </td>
              <td class="px-4 py-3">
                <p v-if="booking.user?.username">
                  {{ booking.user.username }}
                </p>
                <p v-else class="italic text-gray-400">Guest user</p>
              </td>
              <td class="px-4 py-3">
                {{ formatDate(booking.eventDate) }}
              </td>
              <td class="px-4 py-3">
                {{ formatNumber(booking.totalAmount) }}
              </td>
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

export default {
  components: {
    NavVendor,
  },
  data() {
    return {
      bookings: [],
      loading: true,
    };
  },
  methods: {
    async fetchBookings() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:8081/vendor/vendor-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.bookings = response.data;
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
