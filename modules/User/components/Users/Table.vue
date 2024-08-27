<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">
      Users
    </h4>
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Id
            </th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Name
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Status
            </th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in props.users" :key="index">
            <td class="py-5 px-4 pl-9 xl:pl-11">
              <h5 class="font-medium text-black dark:text-white">
                {{ user.id }}
              </h5>
            </td>
            <td class="py-5 px-4">
              <h5 class="font-medium text-black dark:text-white">
                {{ user.name }}
              </h5>
              <p class="text-sm">
                {{ user.email }}
              </p>
            </td>
            <td class="py-5 px-4">
              <p
                class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                :class="{
                  'bg-danger text-danger': !user.is_active,
                  'bg-success text-success': user.is_active
                }"
              >
                {{ user.is_active }}
              </p>
            </td>
            <td class="py-5 px-4">
              <div class="flex items-center space-x-3.5">
                <NuxtLink
                  class="hover:text-primary"
                  :to="generateEditLink(user.id)"
                >
                  <EditButtonIcon></EditButtonIcon>
                </NuxtLink>

                <button
                type="button"
                class="text-danger"
                @click="handleDelete(user.id)"
              >
                <DeleteButtonIcon></DeleteButtonIcon>
              </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableProps, TableEmit } from '../../interface/User'

const props = defineProps<TableProps>()
const emit = defineEmits<TableEmit>()

const generateEditLink = (id: number): string => {
  return `/user/${id}`
}

const handleDelete = (id: number) => {
  emit('toggleDeleteModal', id)
}
</script>
