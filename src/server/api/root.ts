import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { notesRouter } from "./routers/notes";
import { foldersRouter } from "./routers/folders";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  notes: notesRouter,
  folders: foldersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
