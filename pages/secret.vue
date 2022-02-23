<script setup lang="ts">
definePageMeta({
  middleware: ["is-authenticated"],
});
</script>

<template>
  <div id="secret-page" class="prose">
    <h1>Secret page</h1>
  </div>
</template>
