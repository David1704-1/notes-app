import { useRouter } from "next/router";
import { type PropsWithChildren, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useTokenStore } from "../store/tokenStore";
import { api } from "../utils/api";
import { CustomHead } from "./CustomHead";

const unprotectedRoutes = ["/login", "/signup"];

export const AuthProtection = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const ctx = api.useContext();

  const { user, setUser } = useAuthStore(({ user, setUser }) => ({
    user,
    setUser,
  }));
  const token = useTokenStore(({ token }) => token);
  const inUnprotected = unprotectedRoutes.includes(router.pathname);
  useEffect(() => {
    const getUser = async () => {
      if (!token || user) return;
      const fetchedUser = await ctx.auth.getUserFromToken.fetch();
      if (fetchedUser) setUser(fetchedUser);
    };
    void getUser();
  }, [token, user, ctx.auth.getUserFromToken, setUser]);
  return (
    <>
      {user || inUnprotected ? (
        children
      ) : (
        <>
          <CustomHead title="Welcome!" />
          <h1 className="mt-14 text-center font-bold text-black">
            Please login or signup to continue.
          </h1>
        </>
      )}
    </>
  );
};
