<template>
  <div class="min-h-screen py-20 sm:px-6 lg:px-20">
    <div class="relative w-full overflow-x-auto">
      <h1 class="text-3xl font-bold flex items-center justify-between">
        <span>Tasks</span>
        <img src="@/assets/c_logo.png" class="h-12 ml-2" />
      </h1>
      <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
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
                v-for="(project, index) in projectsTaskSubTask"
                :key="project.proj_id"
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td class="px-6 py-4">
                  <input
                    v-model="project.task_completion"
                    @change="updateTaskStatus(index)"
                    :value="project.task_completion"
                    id="vue-checkbox"
                    type="checkbox"
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
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View SubTasks
                  </button>
                  <button
                    @click="addSubTaskView(project.task_id)"
                    v-if="userRole === 'Admin'"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Add SubTasks
                  </button>
                  <button
                    @click="deleteTask(project.task_id)"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete Task
                  </button>
                  <!-- <button @click="taskView(project)" class="bg-blue-500 text-white px-4 py-2 rounded">
                                      Task / SubTask
                                  </button> -->
                </td>
                <td>
                  <button
                    @click="viewFiles(project.task_id)"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
                <th scope="col" class="px-6 py-3">Action</th>
                <!-- <th scope="col" class="px-6 py-3">
                                  Files
                              </th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(project, index) in subTasks"
                :key="project.proj_id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="px-6 py-4">
                  <input
                    id="vue-checkbox"
                    type="checkbox"
                    v-model="project.subtask_completion"
                    @change="updateSubTaskStatus(index)"
                    :value="project.subtask_completion"
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
                <td class="px-6 py-4">
                  <button
                    v-if="userRole === 'Admin'"
                    @click="deleteSubTask(project.subtask_id)"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  &nbsp;
                  <button
                    @click="openSubTaskFilesView(project.subtask_id)"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Files
                  </button>
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
import { base_url } from '../../../config/config';

export default {
  data() {
    return {
      projectsTaskSubTask: [],
      subTasks: [],
      userRole: "",
      taskId : null
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
          `${base_url}/api/projects/project-tasks-sub-tasks/${this.$route.params.id}`
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
      this.taskId = taskId;
    },
    addSubTaskView: function (taskId) {
      this.$router.push({ name: "addSubTask", params: { id: taskId } });
    },
    viewFiles: async function (taskId) {
      this.$router.push({ name: "taskFiles", params: { id: taskId } });
    },
    async updateTaskStatus(index) {
      const response = await axios.put(
        `${base_url}/api/projects/task-status`,
        {
          taskId: this.projectsTaskSubTask[index].task_id,
          isStatus: this.projectsTaskSubTask[index].task_completion,
        }
      );
      this.$root.$refs.toast.showToast(`Task status updated`, "success");
    },
    async updateSubTaskStatus(index) {
      const response = await axios.put(
        `${base_url}/api/projects/sub-task-status`,
        {
          subTaskId: this.subTasks[index].subtask_id,
          isStatus: this.subTasks[index].subtask_completion,
        }
      );
      this.$root.$refs.toast.showToast(`Task sub status updated`, "success");
    },
    async deleteSubTask(subTaskId) {
      try {
        if (window.confirm("Are you sure you want to delete?")) {
          const response = await axios.delete(
            `${base_url}/api/projects/sub-tasks/${subTaskId}`
          );
          this.$root.$refs.toast.showToast(`SubTask delete`, "success");
          this.fetchProjectsTask().then((res) => {
            this.viewSubTasks(this.taskId);
          });
        }
      } catch (error) {
        this.$root.$refs.toast.showToast(
          `${error.response.data.message}.....`,
          "error"
        );
      }
    },
    async deleteTask(taskId) {
      try {
        if (window.confirm("Are you sure you want to delete?")) {
          const response = await axios.delete(
            `${base_url}/api/projects/tasks/${taskId}`
          );
          this.$root.$refs.toast.showToast(`Task deleted`, "success");
          this.fetchProjectsTask();
        }
      } catch (error) {
        this.$root.$refs.toast.showToast(
          `${error.response.data.message}.....`,
          "error"
        );
      }

    },
    openSubTaskFilesView(subTaskId){
      this.$router.push(
        {
          name: "subTaskFiles",
          params: { id: subTaskId }
        }
      );
    }
  },
};
</script>
