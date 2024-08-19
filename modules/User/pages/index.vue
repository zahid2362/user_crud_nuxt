<template>
  <div v-if="userListStore.users">
    <Table :users="userListStore.users" @toggleDeleteModal="userListStore.toggleDeleteModal"></Table>
    <Pagination
      :total="userListStore.total"
      :per_page="userListStore.per_page"
      :page="userListStore.page"
      @change="pageChange"
    ></Pagination>
    <ModalDelete
      :visible="userListStore.showDeleteWarning"
      :id="userListStore.selectedUserId"
      @close="userListStore.toggleDeleteModal"
      @confirm="deleteUser"
    ></ModalDelete>
  </div>
</template>

<script setup lang="ts">
import {useUserListStore} from './../stores/User'
import { userService } from "./../Service/user";
const { $toast } = useNuxtApp();
const config = useRuntimeConfig();
const userListStore = useUserListStore();

//methods
const fetchData = async () => {
  const url = `${config.public.base_url}/user`;
  await userService.index(url,$toast,userListStore);
};

await fetchData();

const pageChange = async (pageNo: number = 1): Promise<void> => {
  userListStore.changePage(pageNo)
  await fetchData();
};

const deleteUser = async (): Promise<void> => {
  const url = `${config.public.base_url}/user/${userListStore.selectedUserId}`
  await userService.delete(url, $toast);
  await fetchData();
  userListStore.toggleDeleteModal();
};
</script>
