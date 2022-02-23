import type { ExecutionContext } from "graphql-helix";
import { parse } from "cookie-es";
import { prisma } from "~/prisma/client";
import type { AuthState } from "~/utils/jwt";
import { decodeJwt, jwtCookieName } from "~/utils/jwt";

export type Context = {
  auth: AuthState;
  prisma: typeof prisma;
};

export const contextFactory = async ({ request }: ExecutionContext): Promise<Context> => {
  const cookies: Record<string, string> = parse((request.headers as { cookie: string }).cookie || "");
  const token = cookies[jwtCookieName] || "";
  return { auth: decodeJwt(token), prisma };
};
