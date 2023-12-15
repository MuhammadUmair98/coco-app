<template>
    <nav class="border-gray-200 px-2 sm:px-2 py-2.5 bg-stone-800" style="position: fixed; top: 0; width: 100%">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
        
        <div class="sm:w-1/12">
          <a href="/"><img src="https://i.ibb.co/84bbGn2/logo.png" class="bg-white rounded-lg"/></a>
        </div>

        <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-stone-800  dark:border-gray-700">

          <li>
            <router-link to="/">
              <a class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 hover:text-orange-300 ">Home</a>
            </router-link>
          </li>
          <li>
            <router-link to="/About">
              <a class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 hover:text-orange-300 ">About</a>
            </router-link>
          </li>
          <li>
            <router-link to="/Services">
              <a class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 hover:text-orange-300 ">Services</a>
            </router-link>
          </li>
          <li>
            <router-link to="/Contact">
              <a class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 hover:text-orange-300 ">Contact</a>
            </router-link>
          </li>
          <li>
            <router-link to="/auth">
              <a class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-400 hover:text-orange-300 ">Login</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>
  
  <script>
  export default {
    name: 'customerNavbar',
  }
  </script>