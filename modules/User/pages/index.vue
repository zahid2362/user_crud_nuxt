<template>
  <div v-if="users">
    <Table :users="users" @toggleDeleteModal="toggleDeleteModal"></Table>
    <Pagination
      :total="total"
      :per_page="per_page"
      :page="page"
      @change="pageChange"
    ></Pagination>
    <ModalDelete
      :visible="showDeleteWarning"
      :id="selectedUserId"
      @close="toggleDeleteModal"
      @confirm="deleteUser"
    ></ModalDelete>
  </div>
</template>

<script setup lang="ts">
import type { User } from "./../interface/User";
import { userService } from "./../Service/user";
const { $toast } = useNuxtApp();
const config = useRuntimeConfig();

const showDeleteWarning: Ref<boolean> = ref(false);
const selectedUserId: Ref<number | null> = ref(null);
const per_page: Ref<number> = ref(10);
const total: Ref<number> = ref(0);
const page: Ref<number> = ref(1);
const users: Ref<User[]> = ref([]);

//methods
const fetchData = async () => {
  userService.index(
    `${config.public.base_url}/user`,
    per_page,
    total,
    page,
    users,
    $toast
  );
};

fetchData();

const pageChange = async (pageNo: number = 1): Promise<void> => {
  page.value = pageNo;
  console.log(1);
  fetchData();
};

const toggleDeleteModal = (id: number | null = null): void => {
  showDeleteWarning.value = !showDeleteWarning.value;
  selectedUserId.value = id;
};

const deleteUser = async (): Promise<void> => {
  await userService.delete(
    `${config.public.base_url}/user/${selectedUserId.value}`,
    $toast
  );
  await fetchData();
  toggleDeleteModal();
};
</script>

<style scoped></style>
