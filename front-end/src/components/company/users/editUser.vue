<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Edit User
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="editUser()">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" name="email" id="email" v-model="user.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" required="">
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                v-model="user.password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                        </div>

                        <div>
                            <label for="role"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                                Role</label>
                            <select v-model="selectedRole" id="role" name="role"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                                <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                            </select>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                            </div>
                        </div>
                        <div class="flex items-center justify-center">
                            <button
                                class="w-full bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Edit User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { base_url } from '../../../config/config';


export default {
    data() {
        return {
            user: {},
            selectedRole: null,
            roles: [],
        }
    },
    mounted() {
        this.fetchRoles();
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            try {
                const response = await axios.get(`${base_url}/api/users/${this.$route.params.id}`);
                this.user = response.data.data;
                this.user.password = null;
                this.selectedRole = this.user.role.id;
                return response;
            } catch (error) {
                this.$root.$refs.toast.showToast(`${error.response.data.message}  !`, 'error');
            }
        },
        async fetchRoles() {
            try {
                const response = await axios.get(`${base_url}/api/roles`);
                this.roles = response.data.data;
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        },
        async editUser() {
            try {
                const response = await axios.put(`${base_url}/api/users/${this.$route.params.id}`,{ 
                    email : this.user.email,
                    role : this.selectedRole ,
                    ...(this.user.password && { password : this.user.password } )
                 });
                
            } catch (error) {
                console.error('Error:', error);
            }
        },
    },
};
</script>