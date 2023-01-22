import { create } from "zustand";
import { LoggedInUserType } from "../utils/user";
import { useTokenStore } from "./tokenStore";

type AuthStore = {
  user: LoggedInUserType;
  postLogin: (token: string) => void;
  logout: VoidFunction;
  setUser: (user: LoggedInUserType) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  postLogin: (token) => {
    useTokenStore.setState({ token });
  },
  logout: () => {
    useTokenStore.setState({ token: undefined });
    set({ user: undefined });
  },
  setUser: (user) => {
    set({ user });
  },
}));
