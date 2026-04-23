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
            <p class="text-gray-600 text-sm">
              {{ vendor.serviceType || "N/A" }}
            </p>

            <!-- Display document images -->
            <div v-if="vendor.documents && vendor.documents.length">
              <p class="text-gray-600 text-sm">Documents:</p>
              <div class="flex gap-2">
                <img
                  v-for="(doc, index) in vendor.documents"
                  :key="index"
                  :src="
                    'https://partypal-2.onrender.com/' + doc.replace(/\\/g, '/')
                  "
                  class="w-20 h-20 object-cover rounded-md border"
                  alt="Vendor document"
                />
              </div>
            </div>
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
    async approveVendor(vendorId) {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve stored token
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const response = await axios.put(
          `https://partypal-2.onrender.com/api/auth/admin/approve-vendor/${vendorId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to request
            },
          }
        );

        console.log(response.data.message);
        // Optionally update UI or refresh vendor list
        this.fetchPendingVendors(); // Refresh vendor list after approval
      } catch (error) {
        console.error("Error approving vendor:", error);
      }
    },
  },
};
</script>
