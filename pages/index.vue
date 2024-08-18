<template>
  <div v-if="users">
    <Table :users="users" @toggleDeleteModal="toggleDeleteModal"></Table>
    <Pagination :total="total" :per_page="per_page" :page="page"></Pagination>
    <ModalDelete
      :visible="showDeleteWarning"
      :id="selectedUserId"
      @close="toggleDeleteModal"
      @confirm="deleteUser"
    ></ModalDelete>
  </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp();
const config = useRuntimeConfig();

const showDeleteWarning: Ref<boolean> = ref(false);
const selectedUserId: Ref<number | null> = ref(null);

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  is_active: boolean;
}

const per_page: Ref<number> = ref(10);
const total: Ref<number> = ref(0);
const page: Ref<number> = ref(1);
const users: Ref<User[]> = ref([]);

interface DeleteUserResponse {
  message: "string";
  success: boolean;
}

interface UserResponse {
  total: number;
  current_page: number;
  data: User[];
}

interface Response {
  message: string;
  success: boolean;
  users: UserResponse;
}

//methods
const fetchData = async () => {
  try {
    const response = await $fetch<Response>(`${config.public.base_url}/user`, {
      query: { per_page: per_page.value, page: 1 },
    });
    if (response.success) {
      users.value = response.users.data;
      total.value = response.users.total;
      page.value = response.users.current_page;
    }
  } catch (error) {
    if (typeof error === "object" && error !== null && "data" in error) {
      let errResponse = error.data as DeleteUserResponse;
      $toast.error(errResponse?.message);
    } else {
      $toast.error("An unexpected error occurred");
    }
  }
};

fetchData();

const toggleDeleteModal = (id: number | null = null): void => {
  showDeleteWarning.value = !showDeleteWarning.value;
  selectedUserId.value = id;
};

const deleteUser = async (): Promise<void> => {
  try {
    const response = await $fetch<DeleteUserResponse>(
      `${config.public.base_url}/user/${selectedUserId.value}`,
      { method: "delete" }
    );
    $toast.success(response.message);
  } catch (error) {
    if (typeof error === "object" && error !== null && "data" in error) {
      let errResponse = error.data as DeleteUserResponse;
      $toast.error(errResponse?.message);
    } else {
      $toast.error("An unexpected error occurred");
    }
  } finally {
    await fetchData();
    toggleDeleteModal();
  }
};
</script>

<style scoped></style>
