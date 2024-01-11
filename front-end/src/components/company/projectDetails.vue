<template>
  <section class="bg-gray-50 dark:bg-gray-900 my-20">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Add Project
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login()">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Project Name</label
              >
              <input
                type="text"
                name="email"
                id="email"
                v-model="project.proj_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Project Name"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Project Description</label
              >
              <textarea
                type="text"
                name="password"
                id="password"
                placeholder="Project Description"
                v-model="project.proj_desc"
                rows="4"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-y"
                required=""
              ></textarea>
            </div>
            <div>
              <label
                for="text"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Project Address</label
              >
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Project Address"
                v-model="project.proj_address"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                for="text"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Project Start Date</label
              >
              <VueDatePicker
                v-model="project.proj_start_date"
                :format="datePickerFormat"
              ></VueDatePicker>
            </div>

            <div>
              <label
                for="text"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Project End Date</label
              >
              <VueDatePicker
                v-model="project.proj_completion_date"
                :format="datePickerFormat"
              >
              </VueDatePicker>
            </div>
            <div>
              <VueMultiselect
                v-model="selected"
                :options="equipments"
                trackBy="equip_id"
                :multiple="true"
                :close-on-select="true"
                placeholder="Select Equipment"
                label="equip_name"
              >
              </VueMultiselect>
            </div>

            <div class="flex items-center justify-center space-x-4">
              <button
                class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto"
                type="submit"
              >
                Save
              </button>
              <button
                type="reset"
                class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto"
                @click="$router.go(-1)"
                >Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import VueMultiselect from "vue-multiselect";

export default {
  props: ["data"],
  components: { VueDatePicker, VueMultiselect },
  data() {
    return {
      project: {
        proj_name: "",
        proj_desc: "",
        proj_address: "",
        proj_start_date: "",
        proj_completion_date: "",
        project_bucket_identifier: "",
      },
      datePickerFormat: "yyyy-MM-dd",
      equipments: [],
      selected: null,
    };
  },
  mounted() {
    this.fetchEquipments();
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/projects",
          { ...this.project, equipments: this.selected ?? [] }
        );
        this.$root.$refs.toast.showToast(
          `Project added successfully...`,
          "success"
        );
        this.$router.go(-1);
        return response;
      } catch (error) {
        this.$root.$refs.toast.showToast(
          `${error.response.data.message}.....`,
          "error"
        );
      }
    },
    async fetchEquipments() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/equipments"
        );
        this.equipments = response.data.data;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
