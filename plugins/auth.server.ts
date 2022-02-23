import type { AuthState } from "~/utils/jwt";
import { jwtCookieName, decodeJwt } from "~/utils/jwt";

export default defineNuxtPlugin(() => {
  const token = useCookie(jwtCookieName).value;
  useState<AuthState>("auth", () => decodeJwt(token));
});
