<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{
            props.per_page * (props.page - 1) + 1
          }}</span>
          to
          <span class="font-medium">{{
            Math.min(props.per_page * props.page, props.total)
          }}</span>
          of
          <span class="font-medium">{{ props.total }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            :disabled="1 == props.page"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            @click="updatePageChange('previous')"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            v-for="pageNumber in totalPage"
            :key="pageNumber"
            :disabled="pageNumber == props.page"
            class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            @click="changePage(pageNumber)"
          >
            {{ pageNumber }}
          </button>

          <button
            :disabled="totalPage == props.page"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            @click="updatePageChange('next')"
          >
            <span class="sr-only">Next</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PaginationProps, PaginationEmits } from '../interface/User';

const props = defineProps<PaginationProps>();
const emit = defineEmits<PaginationEmits>();

const totalPage = computed(() => {
  return props.total < 10 ? 1 : Math.ceil(props.total / props.per_page);
});

const changePage = (pageNo: number) => {
  emit("change", pageNo);
};
const updatePageChange = (type: string) => {
  emit("change", type == "next" ? props.page + 1 : props.page - 1);
};
</script>

<style scoped></style>
