<template>
  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
    {{ message }}
  </p>
</template>

<script setup>
const props = defineProps({
  message: String,
});
</script>

<style lang="scss" scoped></style>
