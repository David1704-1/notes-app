import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const NoteInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const notesRouter = createTRPCRouter({
  getNotes: publicProcedure.query(({ ctx }) => {
    if (!ctx.user) throw new Error("Unauthorized");
    return ctx.prisma.note.findMany({
      where: {
        CreateBy: {
          id: {
            equals: ctx.user.id,
          },
        },
      },
    });
  }),
  createNote: publicProcedure
    .input(NoteInput)
    .mutation(({ ctx, input: { title, content } }) => {
      if (!ctx.user) throw new Error("Unauthorized");
      return ctx.prisma.note.create({
        data: {
          title,
          content,
          CreateBy: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    }),
});
