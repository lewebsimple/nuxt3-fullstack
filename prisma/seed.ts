import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Default admin user
  const admin = {
    email: process.env.SEED_ADMIN_EMAIL || "admin@example.com",
    // TODO: Encrypt the stored password
    password: process.env.SEED_ADMIN_PASSWORD || "changeme",
    role: UserRole.ADMIN,
  };
  const user = await prisma.user.upsert({
    where: { email: admin.email },
    create: admin,
    update: admin,
  });
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
