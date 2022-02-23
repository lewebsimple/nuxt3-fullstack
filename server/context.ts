import { prisma } from "../prisma/client";

export type Context = {
  prisma: typeof prisma;
};

export async function contextFactory(): Promise<Context> {
  return { prisma };
}
