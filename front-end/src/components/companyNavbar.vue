<template>
  <nav
    class="border-gray-200 px-2 sm:px-2 py-2.5 bg-stone-800 z-10"
    style="position: fixed; top: 0; width: 100%"
  >
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <div class="sm:w-1/12">
        <a href="/"
          ><img
            src="@/assets/logo.png"
            class="bg-white rounded-lg"
        /></a>
      </div>

      <ul
        class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-stone-800 dark:border-gray-700"
      >
        <li>
          <router-link to="/Projects">
            <a
              class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 hover:text-orange-300"
              >Projects</a
            >
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/Management">
            <a
              class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 hover:text-orange-300"
              >Management</a
            >
          </router-link>
        </li> -->
        <li>
          <router-link to="/Equipments">
            <a
              class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 hover:text-orange-300"
              >Equipments</a
            >
          </router-link>
        </li>
        <li v-if="role === 'Admin'">
          <router-link to="/users">
            <a
              class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 hover:text-orange-300"
              >Users</a
            >
          </router-link>
        </li>
        <li>
          <a
            class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 hover:text-orange-300 cursor-pointer"
            @click="handleSignOut"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      role: ''
    }
  },
  mounted() {
    this.role = localStorage.getItem('role');
  },
  methods: {
    handleSignOut() {
      localStorage.setItem("token", "");
      localStorage.setItem("role", "");
      this.$store.commit('setLoggedIn', false);
      this.$nextTick(() => {
      this.$router.push('/');
    });
    },
  },
};
</script>
