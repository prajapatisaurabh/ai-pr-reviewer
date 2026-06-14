import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const gloablForPrisma = global as unknown as { prisma: PrismaClient | null };

export const createPrismaClient = () => {
  const url = process.env["DATABASE_URL"];
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
};

export const prisma = gloablForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  gloablForPrisma.prisma = createPrismaClient();
}
