<template>
  <div>
    <form @submit.prevent="submit">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div class="mb-6">
          <input
            v-model="userStore.user.name"
            type="text"
            id="name"
            :class="['border', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', getFieldErrorClass('name')]"
            placeholder="Enter your name"
          />

          <FormErrorMessage
            v-if="userStore?.errors?.name?.length > 0 "
            :message="userStore?.errors?.name[0]"
          ></FormErrorMessage>
        </div>
        <div>
          <input
            v-model="userStore.user.email"
            type="email"
            id="email"
            :class="['border', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', getFieldErrorClass('email')]"
            placeholder="Enter your email"
          />
          <FormErrorMessage
            v-if=" userStore?.errors?.email?.length > 0"
            :message="userStore?.errors?.email[0]"
          ></FormErrorMessage>
        </div>
        <div>
          <input
            v-model="userStore.user.password"
            type="password"
            id="password"
            :class="['border', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', getFieldErrorClass('password')]"
            placeholder="Enter your password"
          />
          <FormErrorMessage
            v-if="userStore?.errors?.password?.length > 0"
            :message="userStore?.errors?.password[0]"
          ></FormErrorMessage>
        </div>

        <div class="flex">
          <div
            v-if="typeof userStore.user.avatar == 'string'"
            class="rounded-lg block p-1.5"
          >
            <img
              class="w-10 h-10 rounded-full"
              :src="userStore.user.avatar"
              :alt="userStore.user.name"
            />
          </div>
          <input
            @change="handleFileUpload"
            :class="['border', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', getFieldErrorClass('avatar')]"
            id="avatar"
            type="file"
            accept="image/*"
          />
          <FormErrorMessage
            v-if="userStore?.errors?.avatar?.length > 0"
            :message="userStore?.errors?.avatar[0]"
          ></FormErrorMessage>
        </div>
        <div class="flex items-center mb-4">
          <input
            id="is_active"
            type="checkbox"
            value="1"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            v-model="userStore.user.is_active"
          />
          <label
            for="is_active"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Active</label
          >
          <FormErrorMessage
            v-if="userStore?.errors?.is_active?.length > 0"
            :message="userStore?.errors?.is_active[0]"
          ></FormErrorMessage>
        </div>
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        update
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

const fetchData = async () => {
  const url =`${config.public.base_url}/user/${useRoute().params.id}`;
  userService.show(url,$toast,router,userStore);
};

await fetchData();
userStore.clearErrors()

const handleFileUpload = (event: Event) => {
  userService.handleImageUpload(event, userStore, $toast , true);
};

const submit = async () => {
  const url = `${config.public.base_url}/user/${useRoute().params.id}`;
  await userService.update(userStore,$toast,url,router);
};

const getFieldErrorClass = (field: keyof ValidationErrors): Array<string> => {
  const error = userStore.getErrors
  return error[field] && error[field].length == 1
    ? userStore.getErrorFormClass : [];
};
</script>
