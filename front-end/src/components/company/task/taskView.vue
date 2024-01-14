<template>
  <div class="min-h-screen flex flex-col py-12 sm:px-6 lg:px-20">
    <div class="relative w-full overflow-x-auto mt-10">
      <h1 class="text-3xl font-bold flex items-center justify-between">
        <span>Tasks</span>
        <img src="@/assets/c_logo.png" class="h-12 ml-2" />
      </h1>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <div class="flex justify-between items-center p-4">
          <h1 class="m-0 font-bold">Task List</h1>
          <button
            v-if="userRole === 'Admin'"
            @click="addProjectTask"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
        <div class="relative overflow-x-auto sm:rounded-lg">
          <table
            class="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Completion</th>
                <th scope="col" class="px-6 py-3">Type</th>
                <th scope="col" class="px-6 py-3">Description</th>
                <th scope="col" class="px-6 py-3">Start Date</th>
                <th scope="col" class="px-6 py-3">Completion Date</th>
                <th scope="col" class="px-6 py-3">Actions</th>
                <th scope="col" class="px-6 py-3">Attachments</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="project in projectsTaskSubTask"
                :key="project.proj_id"
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td class="px-6 py-4">
                  <input
                    v-model="project.subtask_completion"
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                </td>
                <td class="px-6 py-4">
                  {{ project.task_type }}
                </td>
                <td class="px-6 py-4">
                  {{ project.task_desc }}
                </td>
                <td class="px-6 py-4">
                  {{ project.task_start_date }}
                </td>
                <td class="px-6 py-4">
                  {{ project.task_comp_date }}
                </td>
                <td class="px-6 py-4">
                  <button
                    @click="viewSubTasks(project.task_id)"
                    class="text-xs text-red-500 border border-red-500 px-2 py-1 rounded my-2 mx-1"
                  >
                    View SubTasks
                  </button>
                  <button
                    @click="addSubTaskView(project.task_id)"
                    v-if="userRole === 'Admin'"
                    class="text-xs text-red-500 border border-red-500 px-2 py-1 rounded my-2 mx-1"
                  >
                    Add SubTasks
                  </button>
                  <!-- <button @click="taskView(project)" class="bg-blue-500 text-white px-4 py-2 rounded">
                                      Task / SubTask
                                  </button> -->
                </td>
                <td>
                  <button
                    @click="viewFiles(project.task_id)"
                    class="text-xs text-red-500 border border-red-500 px-2 py-1 rounded my-2 mx-1"
                  >
                    Files
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div class="flex justify-between items-center p-4">
          <h1 class="m-0 font-bold">SubTask List</h1>
        </div>
        <div class="relative overflow-x-auto my-4 sm:rounded-lg">
          <table
            class="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Completion</th>
                <th scope="col" class="px-6 py-3">Description</th>
                <th scope="col" class="px-6 py-3">Start Date</th>
                <th scope="col" class="px-6 py-3">Completion Date</th>
                <!-- <th scope="col" class="px-6 py-3">
                                  Files
                              </th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="project in subTasks"
                :key="project.proj_id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="px-6 py-4">
                  <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    v-model="project.subtask_completion"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                </td>
                <td class="px-6 py-4">
                  {{ project.subtask_desc }}
                </td>
                <td class="px-6 py-4">
                  {{ project.subtask_start_date }}
                </td>
                <td class="px-6 py-4">
                  {{ project.subtask_comp_date }}
                </td>
                <!-- <td class="px-6 py-4">
                          
                                    <button @click="taskView(project)" class="bg-blue-500 text-white px-4 py-2 rounded">
                                      Files
                                    </button>
                                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      projectsTaskSubTask: [],
      subTasks: [],
      userRole: "",
    };
  },
  mounted() {
    this.fetchProjectsTask();
    this.userRole = localStorage.getItem("role");
  },
  methods: {
    async fetchProjectsTask() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/projects/project-tasks-sub-tasks/${this.$route.params.id}`
        );
        this.projectsTaskSubTask = response.data.data;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    addProjectTask: function () {
      this.$router.push({
        name: "addTask",
        params: { id: this.$route.params.id },
      });
    },
    viewSubTasks: function (taskId) {
      const tasks = this.projectsTaskSubTask?.find((s) => s.task_id == taskId);
      this.subTasks = tasks.sub_task;
    },
    addSubTaskView: function (taskId) {
      this.$router.push({ name: "addSubTask", params: { id: taskId } });
    },
    viewFiles: async function (taskId) {
      this.$router.push({ name: "taskFiles", params: { id: taskId } });
    },
  },
};
</script>
