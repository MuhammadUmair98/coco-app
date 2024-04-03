<template>
    <div class="min-h-screen py-20 sm:px-6 lg:px-20">
      <div class="relative w-full overflow-x-auto">
        <h1 class="text-3xl font-bold flex items-center justify-between">
          <span>Users</span>
          <img src="@/assets/c_logo.png" class="h-12 ml-2" />
        </h1>
        <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      <div class="relative w-full overflow-x-auto mb-5">
        <button
          v-if="userRole === 'Admin'"
          @click="addUser"
          class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Add Users
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
              <th scope="col" class="px-6 py-3">User Email</th>
              <th scope="col" class="px-6 py-3">Role</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ user.email }}
              </td>
              <td class="px-6 py-4">
                {{ user.role.name }}
              </td>             
              <td class="px-6 py-4 space-y-2">
                <!-- <button
                  v-if="userRole === 'Admin'"
                  @click="editUser(user.id)"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button> -->
                &nbsp;
                <button
                  @click="delteUser(user.id)"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
  import { base_url } from '../../../config/config';
  export default {
    data() {
      return {
        users : []
      };
    },
    mounted() {
      this.userRole = localStorage.getItem("role");
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          console.log('==============', base_url)
          const response = await axios.get(`${base_url}/api/users`);
          this.users = response.data.data.reverse();
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },
      addUser: function () {
        this.$router.push("addUser");
      },
      editUser: function (id) {
        this.$router.push({
          name: "editUser",
          params: { id: id },
        });
      },
      async delteUser(id){
        try {
          await axios.delete(`${base_url}/api/users/${id}`);
          this.$root.$refs.toast.showToast(`User deleted  !`, 'success');
          this.fetchUsers();
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    },
  };
  </script>
  