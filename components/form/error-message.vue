<template>
  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
    {{ props.message }}
  </p>
</template>

<script setup lang="ts">
interface Props {
  message: string;
}
const props = defineProps<Props>();
</script>

<style lang="scss" scoped></style>
