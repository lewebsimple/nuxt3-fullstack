export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated.value) {
    return navigateTo(`/`);
  }
});
