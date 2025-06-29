import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

const t = initTRPC.context<{
  db: PrismaClient;
}>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const createTRPCContext = () => {
  return {
    db: prisma,
  };
};