import { generic, ruleType, ShieldCache } from "nexus-shield";
import type { UserRole } from "@prisma/client";

export { and, or, chain, not, race } from "nexus-shield";

export const isAuthenticated = generic(
  ruleType({
    cache: ShieldCache.CONTEXTUAL,
    resolve: (_root, _args, { auth }) => {
      return !!auth.user;
    },
  }),
);

export const hasUserRole = (role: UserRole) =>
  generic(
    ruleType({
      cache: ShieldCache.CONTEXTUAL,
      resolve: (_root, _args, { auth }) => {
        return [role, "ADMIN"].includes(auth.user?.role || "");
      },
    }),
  );
