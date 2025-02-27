<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4">Vendor Approvals</h2>

      <div v-if="loading" class="text-center text-gray-600">Loading...</div>
      <div v-else-if="vendors.length === 0" class="text-center text-gray-600">
        No pending vendors
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="vendor in vendors"
          :key="vendor._id"
          class="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
        >
          <div>
            <p class="font-semibold">{{ vendor.username }}</p>
            <p class="text-gray-600 text-sm">{{ vendor.email }}</p>
          </div>
          <button
            @click="approveVendor(vendor._id)"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      vendors: [],
      loading: true,
    };
  },
  async created() {
    await this.fetchPendingVendors();
  },
  methods: {
    async fetchPendingVendors() {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/admin/pending-vendors"
        );
        this.vendors = response.data;
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        this.loading = false;
      }
    },
    async approveVendor(id) {
      try {
        await axios.put(`http://localhost:8081/api/admin/approve-vendor/${id}`);
        this.vendors = this.vendors.filter((vendor) => vendor._id !== id); // Remove from list after approval
      } catch (error) {
        console.error("Error approving vendor:", error);
      }
    },
  },
};
</script>
