import type { UserRole } from "@prisma/client";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, hasUserRole } = useAuth();
  if (!isAuthenticated.value) {
    return navigateTo(`/login?redirect=${to.fullPath}`);
  } else if (!hasUserRole(to.meta.hasUserRole || "ADMIN")) {
    return abortNavigation("You do not have permission to visit this page.");
  }
});

declare module "nuxt3/dist/pages/runtime/composables" {
  interface PageMeta {
    hasUserRole?: UserRole;
  }
}
