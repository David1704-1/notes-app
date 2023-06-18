import { z } from "zod";
import { hash, compare } from "bcrypt";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { sign } from "jsonwebtoken";
import { omit } from "remeda";
import dayjs from "dayjs";

const UserInput = z.object({
  username: z.string(),
  password: z.string(),
});

export const authRouter = createTRPCRouter({
  signup: publicProcedure.input(UserInput).mutation(async ({ ctx, input }) => {
    const { username, password } = input;
    const passwordHash = await hash(password, 10);
    const user = await ctx.prisma.user.create({
      data: {
        username,
        password_hash: passwordHash,
        created_on: dayjs().toDate(),
      },
      select: {
        id: true,
        username: true,
        created_on: true,
      },
    });
    const token = sign(user, process.env.JWT_SECRET as string, {
      algorithm: "HS256",
      expiresIn: "3d",
    });
    return token;
  }),
  login: publicProcedure.input(UserInput).mutation(async ({ ctx, input }) => {
    const { username, password } = input;
    const user = await ctx.prisma.user.findFirstOrThrow({
      where: {
        username,
      },
    });
    await compare(password, user.password_hash);
    const token = sign(
      omit(user, ["password_hash"]),
      process.env.JWT_SECRET as string,
      {
        algorithm: "HS256",
        expiresIn: "3d",
      }
    );
    return token;
  }),
  getUserFromToken: publicProcedure.query(({ ctx: { user } }) => user),
});
