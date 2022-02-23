<script setup lang="ts">
const { login, loginFormSchema } = useAuth();
const formErrors = ref<string[]>([]);

async function handleSubmit(credentials: any) {
  const redirect = (useRoute().query as { redirect: string }).redirect || "/";
  try {
    await login(credentials as LoginFormData);
    useRouter().push(redirect);
  } catch (error) {
    // Remove status code and path from error message
    const message = (error as Error).message.replace(/\d+ (.*) .*/, "$1");
    formErrors.value = [message];
  }
}
</script>

<template>
  <FormKit type="form" :errors="formErrors" submit-label="Login" @submit="handleSubmit">
    <FormKitSchema :schema="loginFormSchema" />
  </FormKit>
</template>
