<!-- src/components/Toast.vue -->
<template>
  <div
    style="z-index: 1000"
    class="fixed bottom-4 right-4 flex flex-col space-y-4"
    ref="toastContainer"
  >
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      :class="[
        'rounded-lg p-4 shadow-lg',
        'transition-all duration-500',
        toast.type === 'success'
          ? 'bg-green-800 text-white'
          : 'bg-red-800 text-white',
      ]"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toasts: [],
    };
  },
  methods: {
    showToast(message, type = "success", duration = 5000) {
      const toast = { message, type };
      this.toasts.push(toast);

      setTimeout(() => {
        this.toasts.shift();
      }, duration);
    },
  },
};
</script>
