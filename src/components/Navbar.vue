<template>
  <div class="font-zen text-gray-800">
    <nav
      class="bg-primary text-white py-4 px-6 flex justify-between items-center"
    >
      <!-- Make PartyPal a clickable link -->
      <router-link to="/home" class="text-2xl font-bold">
        PartyPal
      </router-link>
      <ul class="flex space-x-6">
        <li>
          <router-link to="/home" class="hover:underline">Home</router-link>
        </li>
        <li>
          <router-link to="/aboutus" class="hover:underline"
            >About Us</router-link
          >
        </li>
        <!-- ✅ Updated -->
        <li>
          <router-link to="/services" class="hover:underline"
            >Services</router-link
          >
        </li>
        <li>
          <router-link to="/contactus" class="hover:underline"
            >Contact Us</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>
