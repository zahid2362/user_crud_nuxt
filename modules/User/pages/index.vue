<template>
  <div v-if="userStore.users">
    <Table :users="userStore.users" @toggleDeleteModal="userStore.toggleDeleteModal"></Table>
    <Pagination
      :total="userStore.total"
      :per_page="userStore.per_page"
      :page="userStore.page"
      @change="pageChange"
    ></Pagination>
    <ModalDelete
      :visible="userStore.showDeleteWarning"
      :id="userStore.selectedUserId"
      @close="userStore.toggleDeleteModal"
      @confirm="deleteUser"
    ></ModalDelete>
  </div>
</template>

<script setup lang="ts">
import {useUserListStore} from './../stores/User'
import { userService } from "./../Service/user";
const { $toast } = useNuxtApp();
const config = useRuntimeConfig();
const userStore = useUserListStore();

//methods
const fetchData = async () => {
  await userService.index(
    `${config.public.base_url}/user`,
    $toast,
    userStore
  );
};

fetchData();

const pageChange = async (pageNo: number = 1): Promise<void> => {
  userStore.changePage(pageNo)
  await fetchData();
};

const deleteUser = async (): Promise<void> => {
  await userService.delete(
    `${config.public.base_url}/user/${userStore.selectedUserId}`,
    $toast
  );
  await fetchData();
  userStore.toggleDeleteModal();
};
</script>

<style scoped></style>
