<template>
  <div class="min-h-screen flex bg-[#2c3e50] text-white">
    <!-- Sidebar -->
    <NavVendor />
    <!-- Main Content -->
    <main class="container mx-auto py-8 px-4">
      <div class="bg-[#34495e] rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6 text-[#9c4f96]">Add New Service</h2>

        <!-- Success/Error Message -->
        <div
          v-if="message"
          :class="[
            'mb-6 p-4 rounded-md',
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500',
          ]"
        >
          {{ message.text }}
        </div>

        <!-- Form Tabs -->
        <div class="mb-8">
          <div class="flex border-b border-[#bdc3c7]">
            <button
              @click="activeTab = 'basic'"
              :class="[
                'py-2 px-4 font-medium',
                activeTab === 'basic'
                  ? 'border-b-2 border-[#6a1b9a] text-[#9c4f96]'
                  : 'text-[#bdc3c7]',
              ]"
            >
              Basic Info
            </button>
            <button
              @click="activeTab = 'details'"
              :class="[
                'py-2 px-4 font-medium',
                activeTab === 'details'
                  ? 'border-b-2 border-[#6a1b9a] text-[#9c4f96]'
                  : 'text-[#bdc3c7]',
              ]"
            >
              Service Details
            </button>
            <button
              @click="activeTab = 'pricing'"
              :class="[
                'py-2 px-4 font-medium',
                activeTab === 'pricing'
                  ? 'border-b-2 border-[#6a1b9a] text-[#9c4f96]'
                  : 'text-[#bdc3c7]',
              ]"
            >
              Pricing & Packages
            </button>
            <button
              @click="activeTab = 'photos'"
              :class="[
                'py-2 px-4 font-medium',
                activeTab === 'photos'
                  ? 'border-b-2 border-[#6a1b9a] text-[#9c4f96]'
                  : 'text-[#bdc3c7]',
              ]"
            >
              Photos & Media
            </button>
          </div>
        </div>

        <!-- Basic Info Tab -->
        <div v-if="activeTab === 'basic'" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-[#bdc3c7] mb-2">Service Title</label>
              <input
                type="text"
                v-model="service.title"
                class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                placeholder="e.g. Premium Catering Service"
              />
            </div>
            <div>
              <label class="block text-[#bdc3c7] mb-2">Service Type</label>
              <select
                v-model="service.type"
                class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
              >
                <option value="">Select Service Type</option>
                <option value="catering">Catering</option>
                <option value="decoration">Decoration</option>
                <option value="venue">Venue</option>
                <option value="photography">Photography</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-[#bdc3c7] mb-2">Short Description</label>
            <textarea
              v-model="service.shortDescription"
              class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
              rows="3"
              placeholder="Brief description of your service (100-150 characters)"
            ></textarea>
          </div>

          <div>
            <label class="block text-[#bdc3c7] mb-2">Service Location</label>
            <input
              type="text"
              v-model="service.location"
              class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
              placeholder="e.g. Kathmandu, Pokhara, Nationwide"
            />
          </div>
        </div>

        <!-- Service Details Tab -->
        <div v-if="activeTab === 'details'" class="space-y-6">
          <div>
            <label class="block text-[#bdc3c7] mb-2"
              >Detailed Description</label
            >
            <textarea
              v-model="service.detailedDescription"
              class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
              rows="5"
              placeholder="Provide a detailed description of your service, highlighting your unique offerings and specialties"
            ></textarea>
          </div>

          <!-- Catering Specific Fields - Shown only if service type is catering -->
          <div v-if="service.type === 'catering'" class="space-y-6">
            <div>
              <label class="block text-[#bdc3c7] mb-2">Cuisine Types</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div
                  v-for="cuisine in cuisineOptions"
                  :key="cuisine.value"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :id="cuisine.value"
                    :value="cuisine.value"
                    v-model="service.cuisines"
                    class="mr-2 accent-[#6a1b9a]"
                  />
                  <label :for="cuisine.value" class="text-white">{{
                    cuisine.label
                  }}</label>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-[#bdc3c7] mb-2">Dietary Options</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div
                  v-for="diet in dietaryOptions"
                  :key="diet.value"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :id="diet.value"
                    :value="diet.value"
                    v-model="service.dietaryOptions"
                    class="mr-2 accent-[#6a1b9a]"
                  />
                  <label :for="diet.value" class="text-white">{{
                    diet.label
                  }}</label>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-[#bdc3c7] mb-2">Service Capacity</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-[#bdc3c7] mb-2"
                    >Minimum Guests</label
                  >
                  <input
                    type="number"
                    v-model="service.minGuests"
                    class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                  />
                </div>
                <div>
                  <label class="block text-[#bdc3c7] mb-2"
                    >Maximum Guests</label
                  >
                  <input
                    type="number"
                    v-model="service.maxGuests"
                    class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-[#bdc3c7] mb-2">Additional Services</label>
            <div class="space-y-3">
              <div
                v-for="(item, index) in service.additionalServices"
                :key="index"
                class="flex items-center gap-2"
              >
                <input
                  type="text"
                  v-model="service.additionalServices[index]"
                  class="flex-grow bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                  placeholder="Additional service"
                />
                <button
                  @click="removeAdditionalService(index)"
                  class="p-2 text-red-400 hover:text-red-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button
              @click="addAdditionalService"
              class="mt-3 flex items-center text-[#9c4f96] hover:text-[#6a1b9a]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Add Service
            </button>
          </div>
        </div>

        <!-- Pricing & Packages Tab -->
        <div v-if="activeTab === 'pricing'" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-[#bdc3c7] mb-2">Base Price</label>
              <div class="flex">
                <span
                  class="inline-flex items-center px-3 border border-r-0 border-[#4e0072] bg-[#4e0072] text-white rounded-l-md"
                >
                  Rs.
                </span>
                <input
                  type="number"
                  v-model="service.basePrice"
                  class="flex-1 bg-[#2c3e50] border border-[#4e0072] rounded-r-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label class="block text-[#bdc3c7] mb-2">Price Unit</label>
              <select
                v-model="service.priceUnit"
                class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
              >
                <option value="per_person">Per Person</option>
                <option value="per_event">Per Event</option>
                <option value="per_hour">Per Hour</option>
                <option value="per_day">Per Day</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-[#bdc3c7] mb-2">Service Packages</label>
            <div class="space-y-4">
              <div
                v-for="(pkg, index) in service.packages"
                :key="index"
                class="bg-[#2c3e50] border border-[#4e0072] rounded-lg p-4"
              >
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-medium text-[#9c4f96]">
                    Package {{ index + 1 }}
                  </h3>
                  <button
                    @click="removePackage(index)"
                    class="p-1 text-red-400 hover:text-red-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-[#bdc3c7] mb-2"
                      >Package Name</label
                    >
                    <input
                      type="text"
                      v-model="pkg.name"
                      class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                      placeholder="e.g. Basic, Premium, Deluxe"
                    />
                  </div>
                  <div>
                    <label class="block text-[#bdc3c7] mb-2">Price</label>
                    <div class="flex">
                      <span
                        class="inline-flex items-center px-3 border border-r-0 border-[#4e0072] bg-[#4e0072] text-white rounded-l-md"
                      >
                        Rs.
                      </span>
                      <input
                        type="number"
                        v-model="pkg.price"
                        class="flex-1 bg-[#2c3e50] border border-[#4e0072] rounded-r-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-[#bdc3c7] mb-2"
                    >Package Description</label
                  >
                  <textarea
                    v-model="pkg.description"
                    class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                    rows="2"
                    placeholder="Describe what's included in this package"
                  ></textarea>
                </div>

                <div class="mt-4">
                  <label class="block text-[#bdc3c7] mb-2"
                    >Package Features</label
                  >
                  <div class="space-y-2">
                    <div
                      v-for="(feature, fIndex) in pkg.features"
                      :key="fIndex"
                      class="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        v-model="pkg.features[fIndex]"
                        class="flex-grow bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                        placeholder="Feature"
                      />
                      <button
                        @click="removePackageFeature(index, fIndex)"
                        class="p-1 text-red-400 hover:text-red-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    @click="addPackageFeature(index)"
                    class="mt-2 flex items-center text-[#9c4f96] hover:text-[#6a1b9a]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Add Feature
                  </button>
                </div>
              </div>
            </div>
            <button
              @click="addPackage"
              class="mt-4 flex items-center text-[#9c4f96] hover:text-[#6a1b9a]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Add New Package
            </button>
          </div>

          <div>
            <label class="block text-[#bdc3c7] mb-2">Payment Terms</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-[#bdc3c7] mb-2"
                  >Advance Payment (%)</label
                >
                <input
                  type="number"
                  v-model="service.advancePayment"
                  class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label class="block text-[#bdc3c7] mb-2"
                  >Cancelation Policy</label
                >
                <select
                  v-model="service.cancelationPolicy"
                  class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                >
                  <option value="flexible">
                    Flexible (Full refund 24h prior)
                  </option>
                  <option value="moderate">
                    Moderate (Full refund 5 days prior)
                  </option>
                  <option value="strict">
                    Strict (50% refund 7 days prior)
                  </option>
                  <option value="custom">Custom Policy</option>
                </select>
              </div>
            </div>

            <div v-if="service.cancelationPolicy === 'custom'" class="mt-4">
              <label class="block text-[#bdc3c7] mb-2"
                >Custom Cancelation Policy</label
              >
              <textarea
                v-model="service.customCancelationPolicy"
                class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
                rows="3"
                placeholder="Describe your custom cancelation policy"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Photos & Media Tab -->
        <div v-if="activeTab === 'photos'" class="space-y-6">
          <div>
            <label class="block text-[#bdc3c7] mb-2">Service Photos</label>
            <p class="text-sm text-[#bdc3c7] mb-4">
              Upload high-quality photos showcasing your service. Recommended
              size: 1200x800px.
            </p>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4"
            >
              <div
                v-for="(photo, index) in service.photos"
                :key="index"
                class="relative group"
              >
                <img
                  :src="photo.url"
                  alt="Service photo"
                  class="w-full h-40 object-cover rounded-lg"
                />
                <div
                  class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                >
                  <button
                    @click="removePhoto(index)"
                    class="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  class="absolute bottom-2 left-2 bg-[#4e0072] text-white text-xs px-2 py-1 rounded"
                >
                  {{ index === 0 ? "Cover Photo" : `Photo ${index + 1}` }}
                </div>
              </div>

              <!-- Upload Box -->
              <div
                @click="triggerFileInput"
                class="w-full h-40 border-2 border-dashed border-[#9c4f96] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#2c3e50] transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-[#9c4f96]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p class="mt-2 text-[#9c4f96]">Add Photo</p>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileUpload"
                  multiple
                />
              </div>
            </div>
            <p class="text-sm text-[#bdc3c7]">
              You can upload up to 10 photos. First photo will be set as cover
              photo.
            </p>
          </div>

          <div>
            <label class="block text-[#bdc3c7] mb-2"
              >Video Link (Optional)</label
            >
            <p class="text-sm text-[#bdc3c7] mb-2">
              Add a YouTube or Vimeo link to showcase your service in action.
            </p>
            <input
              type="text"
              v-model="service.videoLink"
              class="w-full bg-[#2c3e50] border border-[#4e0072] rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
              placeholder="e.g. https://www.youtube.com/watch?v=..."
            />
          </div>

          <div>
            <label class="block text-[#bdc3c7] mb-2"
              >Sample Menu/Catalog (PDF Upload)</label
            >
            <p class="text-sm text-[#bdc3c7] mb-2">
              Upload a PDF document with your detailed menu or service catalog.
            </p>
            <div class="flex items-center space-x-2">
              <button
                @click="triggerPdfInput"
                class="px-4 py-2 bg-[#6a1b9a] text-white rounded hover:bg-[#9c4f96] transition flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Upload PDF
              </button>
              <span
                v-if="service.menuPdf"
                class="text-white truncate max-w-xs"
                >{{ service.menuPdf.name }}</span
              >
              <input
                ref="pdfInput"
                type="file"
                accept=".pdf"
                class="hidden"
                @change="handlePdfUpload"
              />
            </div>
          </div>
        </div>

        <!-- Form Controls -->
        <div
          class="mt-8 flex justify-end items-center border-t border-[#bdc3c7] pt-6"
        >
          <div class="flex space-x-4">
            <button
              @click="prevTab"
              v-if="activeTab !== 'basic'"
              class="px-6 py-2 bg-[#34495e] text-white rounded-md hover:bg-[#2c3e50] transition"
            >
              Previous
            </button>
            <button
              @click="nextTab"
              v-if="activeTab !== 'photos'"
              class="px-6 py-2 bg-[#6a1b9a] text-white rounded-md hover:bg-[#9c4f96] transition"
            >
              Next
            </button>
            <button
              @click="publishService"
              v-if="activeTab === 'photos'"
              class="px-6 py-2 bg-[#6a1b9a] text-white rounded-md hover:bg-[#9c4f96] transition"
            >
              Publish Service
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavVendor from "@/components/vendor/Nav-Vendor.vue"; // Adjust the path if necessary
import axios from "axios"; // Import Axios for API requests

export default {
  components: {
    NavVendor,
  },
  name: "VendorServiceForm",
  data() {
    return {
      activeTab: "basic",
      service: {
        title: "",
        type: "",
        shortDescription: "",
        location: "",
        detailedDescription: "",
        basePrice: "",
        priceUnit: "per_person",
        advancePayment: 50,
        cancelationPolicy: "moderate",
        customCancelationPolicy: "",
        cuisines: [],
        dietaryOptions: [],
        minGuests: 20,
        maxGuests: 200,
        additionalServices: [""],
        packages: [
          {
            name: "Basic Package",
            price: "",
            description: "",
            features: [""],
          },
        ],
        photos: [],
        videoLink: "",
        menuPdf: null,
      },
      cuisineOptions: [
        { value: "nepali", label: "Nepali" },
        { value: "indian", label: "Indian" },
        { value: "chinese", label: "Chinese" },
        { value: "italian", label: "Italian" },
        { value: "continental", label: "Continental" },
        { value: "thai", label: "Thai" },
        { value: "mexican", label: "Mexican" },
        { value: "japanese", label: "Japanese" },
        { value: "fusion", label: "Fusion" },
      ],
      dietaryOptions: [
        { value: "vegetarian", label: "Vegetarian" },
        { value: "vegan", label: "Vegan" },
        { value: "glutenFree", label: "Gluten-Free" },
        { value: "dairyFree", label: "Dairy-Free" },
        { value: "nutFree", label: "Nut-Free" },
        { value: "halal", label: "Halal" },
        { value: "kosher", label: "Kosher" },
      ],
      message: null, // For success/error messages
    };
  },
  methods: {
    // Your existing logout method
    logout() {
      localStorage.removeItem("authToken"); // Remove auth token
      this.$router.push("/auth"); // Redirect to Auth page
    },

    // Service form methods
    nextTab() {
      const tabs = ["basic", "details", "pricing", "photos"];
      const currentIndex = tabs.indexOf(this.activeTab);
      if (currentIndex < tabs.length - 1) {
        this.activeTab = tabs[currentIndex + 1];
      }
    },
    prevTab() {
      const tabs = ["basic", "details", "pricing", "photos"];
      const currentIndex = tabs.indexOf(this.activeTab);
      if (currentIndex > 0) {
        this.activeTab = tabs[currentIndex - 1];
      }
    },
    addAdditionalService() {
      this.service.additionalServices.push("");
    },
    removeAdditionalService(index) {
      this.service.additionalServices.splice(index, 1);
    },
    addPackage() {
      this.service.packages.push({
        name: `Package ${this.service.packages.length + 1}`,
        price: "",
        description: "",
        features: [""],
      });
    },
    removePackage(index) {
      this.service.packages.splice(index, 1);
    },
    addPackageFeature(packageIndex) {
      this.service.packages[packageIndex].features.push("");
    },
    removePackageFeature(packageIndex, featureIndex) {
      this.service.packages[packageIndex].features.splice(featureIndex, 1);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const files = event.target.files;
      if (!files.length) return;

      // Limit to 10 photos
      const remainingSlots = 10 - this.service.photos.length;
      const filesToUpload = Math.min(files.length, remainingSlots);

      for (let i = 0; i < filesToUpload; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.service.photos.push({
            url: e.target.result,
            name: file.name,
          });
        };

        reader.readAsDataURL(file);
      }
    },
    removePhoto(index) {
      this.service.photos.splice(index, 1);
    },
    triggerPdfInput() {
      this.$refs.pdfInput.click();
    },
    handlePdfUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.service.menuPdf = {
        name: file.name,
        url: URL.createObjectURL(file),
      };
    },
    saveAsDraft() {
      // Implementation for saving as draft
      console.log("Saving service as draft:", this.service);
      this.$emit("save-draft", this.service);

      // Simulate successful save
      alert("Service saved as draft successfully!");
    },
    async publishService() {
      if (!this.validateService()) {
        return;
      }

      try {
        const authToken = localStorage.getItem("authToken"); // Get token if required

        const response = await axios.post(
          "https://partypal-2.onrender.com/api/services",
          this.service,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken ? `Bearer ${authToken}` : "", // Include token if required
            },
          }
        );

        console.log(response);
        this.message = {
          type: "success",
          text: "Service published successfully!",
        };

        this.resetForm();
      } catch (error) {
        console.error("Error:", error.response?.data || error);
        this.message = {
          type: "error",
          text: error.response?.data?.message || "Failed to publish service.",
        };
      }
    },
    validateService() {
      // Basic validation
      if (!this.service.title) {
        this.message = {
          type: "error",
          text: "Please provide a service title",
        };
        this.activeTab = "basic";
        return false;
      }

      if (!this.service.type) {
        this.message = {
          type: "error",
          text: "Please select a service type",
        };
        this.activeTab = "basic";
        return false;
      }

      if (!this.service.shortDescription) {
        this.message = {
          type: "error",
          text: "Please provide a short description",
        };
        this.activeTab = "basic";
        return false;
      }

      if (this.service.photos.length === 0) {
        this.message = {
          type: "error",
          text: "Please upload at least one photo",
        };
        this.activeTab = "photos";
        return false;
      }

      return true;
    },
    resetForm() {
      // Reset the form to its initial state
      this.service = {
        title: "",
        type: "",
        shortDescription: "",
        location: "",
        detailedDescription: "",
        basePrice: "",
        priceUnit: "per_person",
        advancePayment: 50,
        cancelationPolicy: "moderate",
        customCancelationPolicy: "",
        cuisines: [],
        dietaryOptions: [],
        minGuests: 20,
        maxGuests: 200,
        additionalServices: [""],
        packages: [
          {
            name: "Basic Package",
            price: "",
            description: "",
            features: [""],
          },
        ],
        photos: [],
        videoLink: "",
        menuPdf: null,
      };
      this.activeTab = "basic";
    },
  },
};
</script>
