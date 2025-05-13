<template>
  <div class="bg-gray-100 text-gray-900 font-zen pb-10">
    <!-- Hero Section -->
    <section class="bg-primary text-white text-center py-16">
      <h1 class="text-4xl font-bold">Contact Us</h1>
      <p class="text-lg mt-2">
        We'd love to hear from you! Get in touch with us.
      </p>
    </section>

    <!-- Contact Information -->
    <section class="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <div class="grid md:grid-cols-3 gap-6 text-gray-700">
        <!-- Office -->
        <div class="flex items-start space-x-4">
          <i class="bx bx-map text-blue-500 text-2xl mt-1"></i>
          <div>
            <h3 class="text-lg font-semibold text-blue-500">Office</h3>
            <p>PartyPal Pvt. Ltd</p>
            <p>Sundar Marg, Gwarko, Lalitpur</p>
          </div>
        </div>

        <!-- Phone -->
        <div class="flex items-start space-x-4">
          <i class="bx bx-phone text-blue-500 text-2xl mt-1"></i>
          <div>
            <h3 class="text-lg font-semibold text-blue-500">Phone</h3>
            <p>Telephone: 01-4494842</p>
            <p>Mobile: +977-9861119876, 9851091010</p>
          </div>
        </div>

        <!-- Email -->
        <div class="flex items-start space-x-4">
          <i class="bx bx-envelope text-blue-500 text-2xl mt-1"></i>
          <div>
            <h3 class="text-lg font-semibold text-blue-500">Email</h3>
            <p class="text-black">partypal.co@gmail.com</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Feedback Form -->
    <section class="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold text-center">Feedback</h2>
      <p class="text-center text-gray-600 mb-6">
        We would love to hear from you! Contact us directly by filling out this
        form.
      </p>
      <form @submit.prevent="submitForm" class="space-y-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Name"
          class="w-full p-3 border-b border-gray-400 outline-none focus:border-primary"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="w-full p-3 border-b border-gray-400 outline-none focus:border-primary"
        />
        <input
          v-model="form.subject"
          type="text"
          placeholder="Subject"
          class="w-full p-3 border-b border-gray-400 outline-none focus:border-primary"
        />
        <textarea
          v-model="form.message"
          placeholder="Text"
          class="w-full p-3 border-b border-gray-400 outline-none focus:border-primary h-28"
        ></textarea>
        <button
          type="submit"
          class="w-full bg-black text-white py-3 font-semibold rounded-lg"
        >
          Leave Message
        </button>
      </form>
    </section>
  </div>
</template>

<script>
import "boxicons/css/boxicons.min.css";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Form submitted:", this.form);
      alert("Your message has been sent!");
    },
  },
};
</script>
