<template>
  <div class="grid grid-cols-2 gap-4 my-20">
    <div>
      <div class="relative overflow-x-auto">
        <div class="flex justify-between items-center p-4">
          <h1 class="m-0">Task List</h1>
          <button
            @click="addProjectTask"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
        <table
          class="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Type</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Completion</th>
              <th scope="col" class="px-6 py-3">Start Date</th>
              <th scope="col" class="px-6 py-3">Completion Date</th>
              <th scope="col" class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projectsTaskSubTask"
              :key="project.proj_id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td class="px-6 py-4">
                {{ project.task_type }}
              </td>
              <td class="px-6 py-4">
                {{ project.task_desc }}
              </td>
              <td class="px-6 py-4">
                {{ project.task_completion }}
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
                  class="text-xs text-red-500 border border-red-500 px-2 py-1 rounded"
                >
                  View SubTasks
                </button>
                <button
                  @click="addSubTaskView(project.task_id)"
                  class="text-xs text-red-500 border border-red-500 px-2 py-1 rounded my-2"
                >
                  Add SubTasks
                </button>
                <!-- <button @click="taskView(project)" class="bg-blue-500 text-white px-4 py-2 rounded">
                                    Task / SubTask
                                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <div class="relative overflow-x-auto my-4">
        <div class="flex justify-between items-center p-4">
          <h1 class="m-0">SubTask List</h1>
        </div>
        <table
          class="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Completion</th>
              <th scope="col" class="px-6 py-3">Start Date</th>
              <th scope="col" class="px-6 py-3">Completion Date</th>
              <!-- <th scope="col" class="px-6 py-3">
                                Actions
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
                {{ project.subtask_desc }}
              </td>
              <td class="px-6 py-4">
                {{ project.subtask_completion }}
              </td>
              <td class="px-6 py-4">
                {{ project.subtask_start_date }}
              </td>
              <td class="px-6 py-4">
                {{ project.subtask_comp_date }}
              </td>
              <!-- <td class="px-6 py-4">
                                <button @click="editProject(project)" class="text-xs text-red-500">
                                    View SubTasks
                                </button>
                                <button @click="taskView(project)" class="bg-blue-500 text-white px-4 py-2 rounded">
                                    Task / SubTask
                                </button>
                            </td> -->
            </tr>
          </tbody>
        </table>
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
    };
  },
  mounted() {
    this.fetchProjectsTask();
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
  },
};
</script>
