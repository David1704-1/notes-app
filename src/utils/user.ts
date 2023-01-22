import { verify } from "jsonwebtoken";
import { z } from "zod";

const LoggedInUser = z.object({
  id: z.number(),
  username: z.string(),
  created_on: z.string(),
});

export const parseTokenToUser = (token: string) => {
  if (!token) return undefined;
  const rawUser = verify(token, process.env.JWT_SECRET || "");
  const user = LoggedInUser.safeParse(rawUser);
  return user.success ? user.data : undefined;
};

export type LoggedInUserType = ReturnType<typeof parseTokenToUser>;
