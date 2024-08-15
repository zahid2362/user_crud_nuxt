<template>
  <table class="min-w-full bg-white">
    <thead class="bg-gray-800 text-white">
      <tr>
        <th class="px-4 py-2">Id</th>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Status</th>
        <th class="px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users">
        <td class="border px-4 py-2">{{ user.id }}</td>
        <td class="border px-4 py-2">
          <div class="flex items-center">
            <img
              v-if="user.avatar"
              class="w-10 h-10 rounded-full"
              :src="user.avatar"
              :alt="user.name"
            />
            <div class="ps-3">
              <div class="text-base font-semibold">{{ user.name }}</div>
              <div class="font-normal text-gray-500">
                {{ user.email }}
              </div>
            </div>
          </div>
        </td>
        <td class="border px-4 py-2">
          <label class="inline-flex items-center me-5">
            <input
              type="checkbox"
              class="sr-only peer"
              :checked="user.is_active"
              disabled
            />
            <div
              class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
            ></div>
          </label>
        </td>
        <td class="border px-4 py-2">
          <div class="flex justify-center items-center space-x-2">
            <NuxtLink
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              :to="generateEditLink(user.id)"
            >
              Edit
            </NuxtLink>
            <button
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              @click="$emit('toggleDeleteModal', user.id)"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  users: Array,
});
const generateEditLink = (id) => {
  return `/user/${id}`;
};
</script>

<style scoped></style>
