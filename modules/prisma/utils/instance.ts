import { PrismaClient } from "@prisma/client";

const globalThis = global as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalThis.prisma || new PrismaClient();

// prisma.question.create({
//     data: {}
// })

if (process.env.NODE_ENV === "development") globalThis.prisma = prisma;
