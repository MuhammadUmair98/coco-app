<template>
  <div>
    <main class="flex flex-row">
      <header class="w-full">
        <section class="text-center"></section>
        <customerNavbar v-if="!isLoggedIn" />
        <companyNavbar v-else />
      </header>
    </main>
    <body class="bg-gradient-to-b from-gray-200 from-50% to-orange-300">
      <toast ref="toast" />
      <router-view></router-view>
    </body>
  </div>
</template>

<script>
import customerNavbar from "./components/customerNavbar.vue";
import companyNavbar from "./components/companyNavbar.vue";
import toast from "./components/toastComponent.vue";

export default {
  name: "App",
  components: {
    customerNavbar,
    companyNavbar,
    toast,
  },
  computed: {
    isLoggedIn() {
      console.log("",this.$store.state.auth.isLoggedIn)
      return this.$store.state.auth.isLoggedIn;
    },
  },
  data() {
    return {
      showNavbar1: localStorage.getItem("token"),
      navbar1Routes: ["/", "/About", "/Services", "/Contact", "/Login"], // routes that use the customerNavbar
      navbar2Routes: ["/Projects", "/Management", "/Equipment"], // routes that use the employeeNavbar
    };
  },
  watch: {
    // Whenever the route changes, check if it matches any of the routes in the navbar1Routes or navbar2Routes arrays
    $route() {},
  },
};
</script>
