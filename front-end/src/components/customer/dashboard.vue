<template>
  <main>
    <div
      class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div class="flex flex-wrap justify-center">
        <div class="px-4 pt-6">
          <img
            src="@\assets\logo.png"
            class="flex justify-center"
          />
        </div>
      </div>
      <table class="w-full table-fixed flex flex-wrap justify-center">
        <tr>
          <td class="p-4 table-cell">
            <img
              src="@\assets\Construction-Plans.jpg"
              class="tableImage shadow rounded sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
          </td>
          <td class="p-4 table-cell">
            <img
              src="@\assets\Construction-Talk.webp"
              class="tableImage shadow rounded sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
          </td>
          <td class="p-4 table-cell">
            <img
              src="@\assets\Construction-Concrete.webp"
              class="tableImage shadow rounded sm:w-1/2 md:w-1/3 lg:w-1/4"
            />
          </td>
        </tr>
      </table>
      <div class="flex flex-1 px-40">
        <div class="p-10">
          <h2 class="text-3xl font-bold pb-5">Our Mission</h2>
          <p class="mt-4 text-xl list-disc pl-8">
            The Mission of CoCo Construction, LLC is to provide an outstanding
            service with Core Values that we believe are essential to accomplish
            the mission and the goals of CoCo Construction, LLC. To provide
            great service with our contribution to the outstanding achievements
            of owners, architects, engineers, general contractors,
            sub-contractors and all operation employees in the outfield for the
            completion of hundreds of homes, apartments, stores, buildings,
            hospitals, schools, etc. and help build stronger, better and
            exciting communities and cities.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
table {
  width: 100%;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
}

td {
  width: 33.33%;
  padding: 1rem;
  height: 300px;
}

.tableImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<script></script>
