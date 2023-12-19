<template>
    <section class="bg-gray-50 dark:bg-gray-900 my-20">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Add Equipment
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="addEquipmwnts()">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Equipment
                                Name</label>
                            <input type="text" name="email" id="email" v-model="equipment.equip_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Wquipment Name" required="" />
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Equipment Type</label>
                            <input type="text" name="password" id="password" placeholder="Equipment Type"
                                v-model="equipment.equip_type"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="" />
                        </div>
                        <div>
                            <label for="taskCompletion"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Equipment Owned
                            </label>
                            <select name="taskCompletion" id="taskCompletion" v-model="equipment.equip_owned_leased"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                                <option value="OWNED">OWNED</option>
                                <option value="LEASED">LEASED</option>
                            </select>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Equipment Desc</label>
                            <input type="text" name="password" id="password" placeholder="Equipment Type"
                                v-model="equipment.equip_desc"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="" />
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Equipment Serial Number</label>
                            <input type="text" name="password" id="password" placeholder="Equipment Type"
                                v-model="equipment.equip_serial_num"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="" />
                        </div>
                        <div>
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Equipment
                                Move In Date</label>
                            <VueDatePicker v-model="equipment.equip_move_in" :format="datePickerFormat"></VueDatePicker>
                        </div>

                        <div>
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Equipment
                                Move Out Date</label>
                            <VueDatePicker v-model="equipment.equip_move_out" :format="datePickerFormat">
                            </VueDatePicker>
                        </div>
                        <div class="flex items-center justify-center">
                            <button
                                class="w-full bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Save
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import VueMultiselect from 'vue-multiselect'

export default {
    props: ['data'],
    components: { VueDatePicker, VueMultiselect },
    data() {
        return {
            equipment: {
                equip_name: "",
                equip_type: "",
                equip_owned_leased: "",
                equip_desc: "",
                equip_serial_num: "",
                equip_move_in: "",
                equip_move_out :""
            },
            datePickerFormat: 'yyyy-MM-dd'
        };
    },
    mounted() {
    },
    methods: {
        async addEquipmwnts() {
            try {
                const response = await axios.post(
                    "http://localhost:3000/api/equipments",
                    { ...this.equipment }
                );
                this.$root.$refs.toast.showToast(`Equipment added successfully...`, "success");
                this.$router.pop();
                return response;
            } catch (error) {
                this.$root.$refs.toast.showToast(
                    `${error.response.data.message}.....`,
                    "error"
                );
            }
        }
    },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

  