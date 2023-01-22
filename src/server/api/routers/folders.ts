import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const CreateFolderInput = z.object({
  name: z.string(),
});

export const foldersRouter = createTRPCRouter({
  getFolders: publicProcedure.query(({ ctx }) => {
    if (!ctx.user) throw new Error("Unauthorized");
    return ctx.prisma.folder.findMany({
      where: {
        User: {
          id: {
            equals: ctx.user.id,
          },
        },
      },
    });
  }),
  createFolder: publicProcedure
    .input(CreateFolderInput)
    .mutation(({ ctx, input: { name } }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      return ctx.prisma.folder.create({
        data: {
          name,
          User: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    }),
  getFolderById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input: { id } }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      return ctx.prisma.folder.findUnique({
        where: {
          id,
        },
      });
    }),
});
