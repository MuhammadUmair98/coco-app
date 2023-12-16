<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign Up Here
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="register()">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" name="email" id="email" v-model="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" required="">
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" v-model="password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>

                        <div>
                            <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
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
                                Sign Up
                            </button>
                        </div>
                        <router-link to="/auth">
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already Have an account? <a href="#"
                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a>
                            </p>
                        </router-link>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
    
<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: '',
            password: '',
            selectedRole: null,
            roles: [],
        }
    },
    mounted() {
        this.fetchRoles();
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('http://localhost:3000/api/users/register', { email: this.email, password: this.password , roleId : this.selectedRole });
                this.$root.$refs.toast.showToast(`User registered successfully  !`, 'success');
                return response;
            } catch (error) {
                this.$root.$refs.toast.showToast(`${error.response.data.message}  !`, 'error');
            }
        },
        async fetchRoles() {
            try {
                const response = await axios.get('http://localhost:3000/api/roles');
                this.roles = response.data.data;
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        },
    },
};
</script>