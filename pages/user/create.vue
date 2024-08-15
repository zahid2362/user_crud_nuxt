import { RuntimeConfig } from '@nuxt/schema';
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
        <div>
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

<script setup>
import { handleImageUpload, formSubmit } from "@/user";
const { $toast } = useNuxtApp();
const config = useRuntimeConfig();
const router = useRouter();
const user = ref({
  name: "",
  email: "",
  password: "",
  avatar: null,
});

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
    `${config.public.base_url}/user`,
    user.value,
    $fetch,
    $toast,
    router,
    errors
  );
};

const getErrorInputClass = (field) => {
  return errors.value[field]
    ? [
        "bg-red-50",
        "border-red-500",
        "text-red-900",
        "placeholder-red-700",
        "focus:ring-red-500",
        "focus:border-red-500",
      ]
    : [];
};
</script>

<style lang="scss" scoped></style>
