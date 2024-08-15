<template>
  <div>
    <form @submit.prevent="submit">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div class="mb-6">
          <input
            v-model="user.name"
            type="text"
            id="name"
            :class="getErrorInputClass('name')"
            class="border text-sm rounded-lg block w-full p-2.5 border-gray-30"
            placeholder="Enter your name"
          />

          <FormErrorMessage
            v-if="errors.name"
            :message="errors.name[0]"
          ></FormErrorMessage>
        </div>
        <div>
          <input
            v-model="user.email"
            type="email"
            id="email"
            :class="getErrorInputClass('email')"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your email"
          />
          <FormErrorMessage
            v-if="errors.email"
            :message="errors.email[0]"
          ></FormErrorMessage>
        </div>
        <div>
          <input
            v-model="user.password"
            type="password"
            id="password"
            :class="getErrorInputClass('password')"
            class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your password"
          />
          <FormErrorMessage
            v-if="errors.password"
            :message="errors.password[0]"
          ></FormErrorMessage>
        </div>

        <div class="flex">
          <div
            v-if="typeof user.avatar == 'string'"
            class="rounded-lg block p-1.5"
          >
            <img
              class="w-10 h-10 rounded-full"
              :src="user.avatar"
              :alt="user.name"
            />
          </div>
          <input
            @change="handleFileUpload"
            :class="getErrorInputClass('avatar')"
            class="border text-sm border-gray-300 cursor-pointer bg-gray-50 focus:outline-none rounded-lg block w-full p-1.5"
            id="avatar"
            type="file"
            accept="image/*"
          />
          <FormErrorMessage
            v-if="errors.avatar"
            :message="errors.avatar[0]"
          ></FormErrorMessage>
        </div>
        <div class="flex items-center mb-4">
          <input
            id="is_active"
            type="checkbox"
            value="1"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            v-model="user.is_active"
          />
          <label
            for="is_active"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Active</label
          >
          <FormErrorMessage
            v-if="errors.is_active"
            :message="errors.is_active[0]"
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

<script setup>
import { handleImageUpload, formSubmit, errorInputClass } from "@/user";
const { $toast } = useNuxtApp();
const config = useRuntimeConfig();
const router = useRouter();

const { data: user, error: userError } = await useFetch(
  `${config.public.base_url}/user/${useRoute().params.id}`,
  {
    transform: (users) => {
      let userData = users.data;
      userData.is_active = !!userData.is_active;
      return userData;
    },
  }
);
if (userError.value?.data?.success == false) {
  $toast.error(userError.value?.data?.message);
  router.push({ path: "/" });
}
const errors = ref({});

const handleFileUpload = (event) => {
  try {
    handleImageUpload(event, user);
  } catch (error) {
    $toast.error(error.message);
  }
};
const submit = async () => {
  formSubmit(
    `${config.public.base_url}/user/${useRoute().params.id}`,
    user.value,
    $fetch,
    $toast,
    router,
    errors,
    true
  );
};

const getErrorInputClass = (field) => {
  return errorInputClass(errors.value, field);
};
</script>

<style lang="scss" scoped></style>
