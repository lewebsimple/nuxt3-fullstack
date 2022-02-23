import { UserRole } from "@prisma/client";
import type { AuthState } from "~/utils/jwt";

export const useAuth = () => {
  // Current authentication state (initialized in plugins/auth.server.ts)
  const auth = useState<AuthState>("auth", () => ({ user: null }));

  // Authorization rules
  const isAuthenticated = computed<boolean>(() => !!auth.value.user?.id);
  const hasUserRole = (role: UserRole) => ["ADMIN", role].includes(auth.value.user?.role || "");

  // Authentication helpers
  const login = async (credentials: { email: string; password: string }) => {
    const result = await $fetch("/api/login", { method: "POST", body: credentials });
    auth.value = result;
  };
  const logout = async () => {
    const result = await $fetch("/api/logout", { method: "POST" });
    auth.value = result;
  };

  // FormKit schema for the login form
  const loginFormSchema = [
    {
      $formkit: "text",
      name: "email",
      label: "Email",
      validation: "required|email",
    },
    {
      $formkit: "password",
      name: "password",
      label: "Password",
      validation: "required",
    },
  ];

  return { auth, isAuthenticated, hasUserRole, login, logout, loginFormSchema };
};
