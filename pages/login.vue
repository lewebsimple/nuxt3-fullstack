<script setup lang="ts">
definePageMeta({
  middleware: ["is-not-authenticated"],
});
</script>

<template>
  <div id="login-page" class="prose">
    <h1>Login page</h1>
    <div class="not-prose">
      <FormLogin />
    </div>
  </div>
</template>
