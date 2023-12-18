<template>
    <div class="grid grid-cols-2 gap-4 my-20">
        <div>

            <div class="relative overflow-x-auto">
                <div class="flex justify-start mb-2 my-2 mx-2 bg-white-500">
                    <button @click="addProject" class="bg-blue-500 text-white px-4 py-2 rounded">
                        Add Project
                    </button>
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Project Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Start Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Completion Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="project in projects" :key="project.proj_id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ project.proj_name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ project.proj_address }}
                            </td>
                            <td class="px-6 py-4">
                                {{ project.proj_desc }}
                            </td>
                            <td class="px-6 py-4">
                                {{ project.proj_start_date }}
                            </td>
                            <td class="px-6 py-4">
                                {{ project.proj_completion_date }}
                            </td>
                            <td class="px-6 py-4">
                                <button @click="editProject(project)" class="bg-blue-500 text-white px-4 py-2 rounded">
                                    Edit
                                </button>
                                <button @click="taskView(project)" class="bg-blue-500 text-white px-4 py-2 rounded">
                                    Task / SubTask
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>


            <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead>
                                    <tr>
                                        <th scope="col"
                                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Age
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Address
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            John Brown</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">45
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">New
                                            York No. 1 Lake Park</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <button type="button"
                                                class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Delete</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            Jim Green</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">27
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                            London No. 1 Lake Park</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <button type="button"
                                                class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Delete</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            Joe Black</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">31
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                            Sidney No. 1 Lake Park</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <button type="button"
                                                class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            projects: [],
            project: {}
        };
    },
    mounted() {
        this.project.id = this.$route.params.id;
        this.fetchProjects();
    },
    methods: {
        async fetchProjects() {
            try {
                const response = await axios.get('http://localhost:3000/api/projects');
                this.projects = response.data.data;
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        },
        addProject: function () {
            this.$router.push('projectView');
        },
        editProject: function (project) {
            this.$router.push({ name: 'editProject', params: { id: project.proj_id } });
        },
    },
};
</script>
  