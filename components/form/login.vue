<script setup lang="ts">
const { login } = useAuth();
const credentials = reactive({
  email: "",
  password: "",
});
const error = ref<string>("");

async function onLogin() {
  try {
    await login(credentials);
    const { query } = useRoute();
    useRouter().push((query as { redirect: string }).redirect || "/");
  } catch (e) {
    error.value = (e as Error).message;
  }
}
</script>

<template>
  <form class="space-y-1.5" @submit.prevent="onLogin">
    <p v-if="error">{{ error }}</p>
    <div><input v-model="credentials.email" type="email" placeholder="Email" /></div>
    <div><input v-model="credentials.password" type="password" placeholder="Password" /></div>
    <div>
      <button type="submit" class="btn">Login</button>
    </div>
  </form>
</template>
