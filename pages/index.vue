<script setup lang="ts">
const { data } = await useHelloQuery();
</script>

<template>
  <div id="front-page" class="prose">
    <h1>{{ data?.hello || "Nuxt3 ❤️ GraphQL" }}</h1>
  </div>
</template>
