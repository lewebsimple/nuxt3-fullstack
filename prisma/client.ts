import Prisma from "@prisma/client";
import { config } from "dotenv";

// Load process.env.DATABASE_URL from .env
config();

// ES module workaround
const { PrismaClient } = Prisma;

export const prisma = new PrismaClient();
