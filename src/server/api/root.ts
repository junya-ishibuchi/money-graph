import { createTRPCRouter } from '@/server/api/trpc';
import { uploadRouter } from '@/server/api/routers/upload';

export const appRouter = createTRPCRouter({
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;