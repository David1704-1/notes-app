import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { useAuthStore } from "../store/authStore";

const unprotectedRoutes = ["/login", "/signup"];

export const AuthProtection = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const user = useAuthStore(({ user }) => user);
  const inUnprotected = unprotectedRoutes.includes(router.pathname);

  return (
    <>
      {user || inUnprotected ? (
        children
      ) : (
        <h1 className="mt-14 text-center font-bold text-black">
          Please login or signup to continue.
        </h1>
      )}
    </>
  );
};
