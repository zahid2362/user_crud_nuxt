<template>
  <div>
    <form @submit.prevent="submit">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div class="mb-6">
          <input
           id="name"
            v-model="userStore.createUser.name"
            type="text"
            :class="['border', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', getFieldErrorClass('name')]"
            placeholder="Enter your name"
          />

          <FormErrorMessage
            v-if="userStore?.errors?.name && userStore?.errors?.name.length > 0"
            :message="userStore?.errors?.name[0]"
          />
        </div>
        <div>
          <input
           id="email"
            v-model="userStore.createUser.email"
            type="email"
            :class="['border', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', getFieldErrorClass('email')]"
            placeholder="Enter your email"
          />
          <FormErrorMessage
            v-if="userStore?.errors?.email && userStore?.errors?.email.length > 0"
            :message="userStore?.errors?.email[0]"
          />
        </div>
        <div>
          <input
            id="password"
            v-model="userStore.createUser.password"
            type="password"
            :class="['border', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', getFieldErrorClass('password')]"
            placeholder="Enter your password"
          />
          <FormErrorMessage
            v-if="userStore?.errors?.password && userStore?.errors?.password.length > 0"
            :message="userStore?.errors?.password[0]"
          />
        </div>
        <div>
          <input
            id="avatar"
            :class="['border', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', getFieldErrorClass('avatar')]"
            type="file"
            accept="image/*"
            @change="handleFileUpload"
          />
          <FormErrorMessage
            v-if="userStore?.errors?.avatar && userStore?.errors?.avatar.length > 0"
            :message="userStore?.errors?.avatar[0]"
          />
        </div>
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        save
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { userService } from "../Service/user";
import type { ValidationErrors } from "./../interface/User";
import {useUserListStore} from './../stores/User'

const { $toast } = useNuxtApp();
const config = useRuntimeConfig();
const router = useRouter();
const userStore = useUserListStore();
userStore.clearErrors()
const handleFileUpload = (event: Event) => {
  userService.handleImageUpload(event, userStore, $toast);
};

const submit = async () => {
  const url = `${config.public.base_url}/user`;
  await userService.create(
    url,
    $fetch,
    $toast,
    userStore,
    router
  );
};

const getFieldErrorClass = (field: keyof ValidationErrors): Array<string> => {
  const error = userStore.getErrors
  return error[field] && error[field].length == 1
    ? userStore.getErrorFormClass : [];
};
</script>
