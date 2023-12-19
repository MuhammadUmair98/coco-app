<template>
    <div class="relative overflow-x-auto my-20">
        <div class="flex justify-start mb-2 my-2 mx-2 bg-white-500">
            <button @click="addEquipmentsView" class="bg-blue-500 text-white px-4 py-2 rounded">
                Add Equipment
            </button>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Equipment Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Equipment Type
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Equipment Owned
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Serial Number Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Move In Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Move Out Date
                    </th>
                    <!-- <th scope="col" class="px-6 py-3">
                        Actions
                    </th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="equipment in equipments" :key="equipment.equip_id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                    <!-- <td class="px-6 py-4">
                        <button @click="editProject(project)" class="bg-blue-500 text-white px-4 py-2 rounded">
                            Edit
                        </button>
                        <button @click="taskView(project)" class="bg-blue-500 text-white px-4 py-2 rounded">
                            Task / SubTask
                        </button>
                    </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
           equipments : []
        };
    },
    mounted() {
        this.fetchProjects();
    },
    methods: {
        async fetchProjects() {
            try {
                const response = await axios.get('http://localhost:3000/api/equipments');
                this.equipments = response.data.data;
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        },
        addEquipmentsView: function () {
            this.$router.push('/addEquipments');
        }
    }
};
</script>
  