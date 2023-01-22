import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const CreateNoteInput = z.object({
  title: z.string(),
  content: z.string(),
  folderId: z.number(),
});

const GetNotesInput = z.object({
  folderId: z.number(),
});

export const notesRouter = createTRPCRouter({
  getNotes: publicProcedure.input(GetNotesInput).query(({ ctx, input }) => {
    if (!ctx.user) throw new Error("Unauthorized");
    return ctx.prisma.note.findMany({
      where: {
        Folder: {
          id: {
            equals: input.folderId,
          },
          User: {
            id: {
              equals: ctx.user.id,
            },
          },
        },
      },
    });
  }),
  createNote: publicProcedure
    .input(CreateNoteInput)
    .mutation(({ ctx, input: { title, content, folderId } }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      return ctx.prisma.note.create({
        data: {
          title,
          content,
          Folder: {
            connect: {
              id: folderId,
            },
          },
        },
      });
    }),
});
