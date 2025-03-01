<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
    <p class="mt-4 text-gray-700">
      The page you are looking for does not exist.
    </p>
    <router-link
      to="/home"
      class="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
    >
      Go to Home
    </router-link>
  </div>
</template>
