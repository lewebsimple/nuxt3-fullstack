<script setup lang="ts">
const { isAuthenticated } = useAuth();
</script>

<template>
  <div class="py-3 bg-slate-800 text-white">
    <nav class="container">
      <ul class="flex items-center gap-6">
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li v-if="isAuthenticated">
          <NuxtLink to="/secret">Secret</NuxtLink>
        </li>
        <li class="ml-auto">
          <NuxtLink v-if="!isAuthenticated" to="/login">Login</NuxtLink>
          <FormLogout v-else />
        </li>
      </ul>
    </nav>
  </div>
</template>
