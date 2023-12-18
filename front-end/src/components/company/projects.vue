<template>
    <div class="relative overflow-x-auto my-20">
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
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            showModal: false,
            isAddProjectModalOpen: false,
            projects: [],
            newProject: {
                proj_name: '',
            }
        };
    },
    mounted() {
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
            this.$router.push({ name: 'editProject',  params: { id: project.proj_id } });
        },
        taskView: function (project) {
            this.$router.push({ name: 'taskView',  params: { id: project.proj_id } });
        }
    }
};
</script>
  