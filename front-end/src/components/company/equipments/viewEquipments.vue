<template>
  <div class="min-h-screen py-20 sm:px-6 lg:px-20">
    <div class="relative w-full overflow-x-auto">
      <h1 class="text-3xl font-bold flex items-center justify-between">
        <span>Equipment</span>
        <img src="@/assets/c_logo.png" class="h-12 ml-2" />
      </h1>
      <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div class="relative w-full overflow-x-auto mb-5">
      <button
        v-if="userRole === 'Admin'"
        @click="addEquipmentsView"
        class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
      >
        Add Equipment
      </button>
    </div>
    <div class="relative overflow-x-auto sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Equipment Name</th>
            <th scope="col" class="px-6 py-3">Equipment Type</th>
            <th scope="col" class="px-6 py-3">Equipment Owned</th>
            <th scope="col" class="px-6 py-3">Serial Number Date</th>
            <th scope="col" class="px-6 py-3">Move In Date</th>
            <th scope="col" class="px-6 py-3">Move Out Date</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="equipment in equipments"
            :key="equipment.equip_id"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ equipment.equip_name }}
            </td>
            <td class="px-6 py-4">
              {{ equipment.equip_type }}
            </td>
            <td class="px-6 py-4">
              {{ equipment.equip_owned_leased }}
            </td>
            <td class="px-6 py-4">
              {{ equipment.equip_serial_num }}
            </td>
            <td class="px-6 py-4">
              {{ equipment.equip_move_in }}
            </td>
            <td class="px-6 py-4">
              {{ equipment.equip_move_out }}
            </td>
            <td class="px-6 py-4">
              <button
                @click="deleteEquipments(equipment)"
                v-if="userRole === 'Admin'"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Delete
              </button>
              &nbsp;
              <button
                @click="openEditViewForEquipment(equipment)"
                v-if="userRole === 'Admin'"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      equipments: [],
      window,
      userRole: "",
    };
  },
  mounted() {
    this.userRole = localStorage.getItem("role");
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/equipments"
        );
        this.equipments = response.data.data;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    addEquipmentsView: function () {
      this.$router.push("/addEquipments");
    },
    async deleteEquipments(equipment) {
      if (window.confirm("Are you sure you want to delete?")) {
        await axios.delete(
          "http://localhost:3000/api/equipments/" + equipment.equip_id
        );
        this.fetchProjects();
      } else {
        return;
      }
    },
    openEditViewForEquipment(equipment){
      this.$router.push({
        name: "editEquipments",
        params: { id: equipment.equip_id },
      });
    }
  },
};
</script>
  