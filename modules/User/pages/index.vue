<template>
  <div v-if="userListStore.users">
    <div class="flex flex-col gap-10">
      <UsersTable
        :users="userListStore.users"
        @toggleDeleteModal="userListStore.toggleDeleteModal"
        ></UsersTable>
    </div>
    <Pagination
      :total="userListStore.total"
      :per_page="userListStore.per_page"
      :page="userListStore.page"
      @change="pageChange"
    ></Pagination>
    <ModalDelete
      :id="userListStore.selectedUserId"
      :visible="userListStore.showDeleteWarning"
      @close="userListStore.toggleDeleteModal"
      @confirm="deleteUser"
    ></ModalDelete>
  </div>
</template>

<script setup lang="ts">
import { useUserListStore } from './../stores/User'
import { userService } from './../Service/user'

const { $toast } = useNuxtApp()
const config = useRuntimeConfig()
const userListStore = useUserListStore()
const user = useSanctumUser()
console.log(user.value, 'auth')
const client = useSanctumClient()
definePageMeta({
  middleware: ['sanctum:auth']
})

const fetchData = async () => {
  const url = `${config.public.base_url}/user`
  await userService.index(url, client, $toast, userListStore)
}

onMounted(async () => {
  await fetchData()
})

const pageChange = async (pageNo: number = 1): Promise<void> => {
  userListStore.changePage(pageNo)
  await fetchData();
}

const deleteUser = async (): Promise<void> => {
  const url = `${config.public.base_url}/user/${userListStore.selectedUserId}`
  await userService.delete(url, client, $toast);
  await fetchData();
  userListStore.toggleDeleteModal();
}
</script>
