<template>
  <main class="flex flex-row">
    <header class="w-full">
      <section class="text-center"></section>
        <customerNavbar v-if="showNavbar1" />
        <companyNavbar v-else />

    </header>
  </main>
  <body class="bg-gradient-to-b from-gray-200 from-50% to-orange-300">
    <toast ref="toast" />
      <router-view></router-view>
  </body>
</template>


<script>
import customerNavbar from './components/customerNavbar.vue';
import companyNavbar from './components/companyNavbar.vue';
import toast from './components/toastComponent.vue';

export default {
  name: 'App',
  components: {
    customerNavbar,
    companyNavbar,
    toast
  },
  data() {
    return {
      showNavbar1: true,
      navbar1Routes: ['/', '/About', '/Services','/Contact','/Login'], // routes that use the customerNavbar
      navbar2Routes: ['/Projects', '/Management','/Equipment'] // routes that use the employeeNavbar
    }
  },
  watch: {
    // Whenever the route changes, check if it matches any of the routes in the navbar1Routes or navbar2Routes arrays
    '$route'() {
      const currentRoute = this.$route.path;
      this.showNavbar1 = this.navbar1Routes.includes(currentRoute);
      this.showNavbar2 = this.navbar2Routes.includes(currentRoute);
    }
  }
}
</script>