import { config } from "dotenv";
import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;

// Load process.env.DATABASE_URL from .env
config();

export const prisma = new PrismaClient();
