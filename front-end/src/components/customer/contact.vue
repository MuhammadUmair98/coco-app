<template>
    <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-20">
      <div class="mt-8 sm:mx-auto sm:w-2/3 sm:max-w-xlg">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h1 class="text-3xl font-bold mb-6">Contact Us</h1>
          <div class="flex flex-col md:flex-row">
            <div class="md:w-1/2 md:pr-6">
              <h2 class="text-xl font-bold mb-3">Send us a message</h2>

              <form @submit.prevent="submitForm">
                <div class="mb-4">
                  <label for="name" class="block text-gray-700 font-bold mb-2"
                    >Name:</label
                  >
                  <input
                    type="text"
                    id="name"
                    v-model="name"
                    class="w-full px-3 py-2 border border-gray-400 rounded-md"
                    required
                  />
                </div>

                <div class="mb-4">
                  <label for="email" class="block text-gray-700 font-bold mb-2"
                    >Email:</label
                  >
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="w-full px-3 py-2 border border-gray-400 rounded-md"
                    required
                  />
                </div>

                <div class="mb-4">
                  <label
                    for="message"
                    class="block text-gray-700 font-bold mb-2"
                    >Message:</label
                  >
                  <textarea
                    id="message"
                    v-model="message"
                    class="w-full px-3 py-2 border border-gray-400 rounded-md"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div class="md:w-1/2 md:pl-6">
              <h2 class="text-xl font-bold mb-3">Get in touch</h2>

              <p class="mb-2">
                <i class="fas fa-map-marker-alt mr-2"></i>Daniel Contreras
              </p>
              <p class="mb-2">
                <i class="fas fa-phone mr-2"></i>+1 (512) 215-1622
              </p>
              <p class="mb-2">
                <i class="fas fa-envelope mr-2"></i>estimator@coco-construction.com
              </p>

              <h3 class="text-lg font-bold mb-2 mt-6">Follow Us</h3>

              <div class="flex items-center">
                <a href="https://www.instagram.com/coco_constructionunderground/" class="text-gray-700 hover:text-blue-500 mr-4"
                  ><i class="fab fa-instagram fa-2x">Instagram</i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
