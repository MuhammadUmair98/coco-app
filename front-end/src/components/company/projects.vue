<template>
  <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-20">
    <div class="relative w-full overflow-x-auto mt-10">
      <h1 class="text-3xl font-bold flex items-center justify-between" >
        <span>Projects</span>
        <img src="@/assets/logo.png" class="h-12 ml-2">
      </h1>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
    </div>
    <div class="relative w-full overflow-x-auto mb-5">
      <button
        v-if="userRole === 'Admin'"
        @click="addProject"
        class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
      >
        Add Project
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
            <th scope="col" class="px-6 py-3">Project Name</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Start Date</th>
            <th scope="col" class="px-6 py-3">Completion Date</th>
            <th scope="col" class="px-6 py-3">Days</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="project in projects"
            :key="project.proj_id"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ project.proj_name }}
            </td>
            <td class="px-6 py-4">
              {{ project.proj_address }}
            </td>
            <td class="px-6 py-4">
              {{ project.proj_desc }}
            </td>
            <td class="px-6 py-4">
              {{ formatDate(project.proj_start_date) }}
            </td>
            <td class="px-6 py-4">
              {{ formatDate(project.proj_completion_date) }}
            </td>
            <td class="px-6 py-4">
              {{ totDays(project.proj_start_date, project.proj_completion_date) }}
            </td>
            <td class="px-6 py-4 space-y-2">
              <button
                @click="editProject(project)"
                class="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              &nbsp;
              <button
                @click="taskView(project)"
                class="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Tasks
              </button>
              &nbsp;
              <button
                @click="filesView(project)"
                class="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Files
              </button>
              <button
                v-if="userRole === 'Admin'"
                @click="deleteProject(project.proj_id)"
                class="bg-blue-500 text-white px-4 py-1 rounded"
                type="submit"
              >
                Delete
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
      showModal: false,
      isAddProjectModalOpen: false,
      projects: [],
      newProject: {
        proj_name: "",
      },
      userRole : ''
    };
  },
  mounted() {
    this.userRole = localStorage.getItem('role');
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get("http://localhost:3000/api/projects");
        this.projects = response.data.data;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    addProject: function () {
      this.$router.push("projectView");
    },
    editProject: function (project) {
      this.$router.push({
        name: "editProject",
        params: { id: project.proj_id },
      });
    },
    formatDate(dateString) {
      if (!dateString) {
      return '';
    }
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    totDays(date1, date2){
      if(!date1 || !date2) {
        return "N/A";
      }
      else {
        date1 = new Date(date1);
        date2 = new Date(date2);
        var diffTime = date2.getTime() - date1.getTime();
        var dayTime = Math.round((diffTime) / (1000 * 60 * 60 * 24));
        return dayTime;
      }
    },
    async deleteProject(proj_id) {
      if (window.confirm("Are you sure you want to delete?")) {
        try {
          await axios.delete(
            `http://localhost:3000/api/projects/delete-project/${proj_id}`
          );
          this.fetchProjects();
        } 
        catch (error) {
          this.$root.$refs.toast.showToast(
            `${error.response.data.message}.....`,
            "error"
          );
        }
      }
    },
    taskView: function (project) {
      this.$router.push({ name: "taskView", params: { id: project.proj_id } });
    },
    filesView: function (project) {
      this.$router.push({ name: "projectFiles", params: { id: project.proj_id } });
    }
  },
};
</script>
