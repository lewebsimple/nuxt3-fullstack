import { prisma } from "../prisma/client";
import type { AuthState } from "../utils/jwt";
import { decodeJwt } from "../utils/jwt";
import { pubsub } from "./pubsub";

export type Context = {
  auth: AuthState;
  prisma: typeof prisma;
  pubsub: typeof pubsub;
};

export const contextFactory = (token: string): Context => {
  return { auth: decodeJwt(token), prisma, pubsub };
};
