import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { CustomHead } from "../components/CustomHead";
import { useAuthStore } from "../store/authStore";
import { api } from "../utils/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [postLogin, setUser] = useAuthStore(({ postLogin, setUser }) => [
    postLogin,
    setUser,
  ]);
  const ctx = api.useContext();

  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  const { error, mutate: login } = api.auth.login.useMutation({
    onSuccess: async (data) => {
      postLogin(data);
      const user = await ctx.auth.getUserFromToken.fetch();
      setUser(user);
      void router.push("/");
    },
    onError: clearInputs,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      username,
      password,
    });
  };

  return (
    <>
      <CustomHead title="Login" />
      <div className="mt-14 flex flex-col items-center">
        {error ? (
          <h1 className="font-bold text-red-600">{error.message}</h1>
        ) : (
          <form className="flex flex-col text-center" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="rounded border border-gray-500"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="passoword">Password</label>
            <input
              type="password"
              className="rounded border border-gray-500"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log in</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
