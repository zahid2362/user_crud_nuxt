<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">User</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Home </NuxtLink></li>
          <li><NuxtLink to="/user/create">Create User </NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div class="container mx-auto p-4">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
