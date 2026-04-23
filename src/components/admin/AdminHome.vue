<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Vendor Approvals</h2>
        <button
          @click="logout"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

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
          <div class="flex gap-2">
            <button
              @click="approveVendor(vendor._id)"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Approve
            </button>
            <button
              @click="deleteVendor(vendor._id)"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
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
          "https://partypal-2.onrender.com/api/auth/admin/pending-vendors"
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
        await axios.put(
          `https://partypal-2.onrender.com/api/auth/admin/approve-vendor/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        this.vendors = this.vendors.filter((vendor) => vendor._id !== id);
      } catch (error) {
        console.error("Error approving vendor:", error);
      }
    },
    async deleteVendor(id) {
      try {
        await axios.delete(
          `https://partypal-2.onrender.com/api/auth/admin/delete-vendor/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        this.vendors = this.vendors.filter((vendor) => vendor._id !== id);
      } catch (error) {
        console.error("Error deleting vendor:", error);
      }
    },
    logout() {
      localStorage.removeItem("authToken");
      this.$router.push("/auth");
    },
  },
};
</script>
