<template>
  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
    {{ props.message }}
  </p>
</template>

<script setup lang="ts">
import type { ErrorMessageProps } from "../../interface/User";

const props = defineProps<ErrorMessageProps>();
</script>

<style lang="scss" scoped></style>
