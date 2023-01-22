import { create } from "zustand";
import { persist } from "zustand/middleware";

type TokenStore = {
  token?: string;
  setToken: (token: string) => void;
};

export const useTokenStore = create(
  persist<TokenStore>(
    (set) => ({
      token: undefined,
      setToken: (token) => {
        set({ token });
      },
    }),
    {
      name: "token",
    }
  )
);
