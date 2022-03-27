<script setup lang="ts">
import { PingSubscription } from "~/composables/ping.subscription";

const { data } = await useHelloQuery();

const { data: ping } = usePingSubscription<string>({}, (_prev, { ping }: PingSubscription) => {
  return ping || "Ping...";
});
</script>

<template>
  <div id="front-page" class="prose">
    <h1>{{ data?.hello || "Nuxt3 ❤️ GraphQL" }}</h1>
    {{ ping }}
  </div>
</template>
