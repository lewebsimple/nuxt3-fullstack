<script setup lang="ts">
const { logout } = useAuth();
async function onLogout() {
  await logout();
  location.reload();
}
</script>

<template>
  <button @click="onLogout">Logout</button>
</template>
