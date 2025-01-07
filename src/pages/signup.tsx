import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { CustomHead } from "../components/CustomHead";
import { useAuthStore } from "../store/authStore";
import { api } from "../utils/api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();
  const postLogin = useAuthStore((state) => state.postLogin);

  const { error, mutate: signUp } = api.auth.signup.useMutation({
    onSuccess(data) {
      postLogin(data);
      void router.push("/");
    },
  });

  const clearInputs = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passowrds dont match!");
      clearInputs();
      return;
    }
    signUp({
      username,
      password,
    });
  };

  return (
    <>
      <CustomHead title="Signup" />
      <div className="mt-14 flex flex-col items-center">
        {error ? (
          <h1 className="font-bold text-red-600">{error.message}</h1>
        ) : (
          <form className="flex flex-col text-center" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              data-testid="usernameinput"
              className="rounded border border-gray-500"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              data-testid="passwordinput"
              className="rounded border border-gray-500"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="passwordConfirm">Password confirm</label>
            <input
              type="password"
              data-testid="passwordconfirminput"
              className="rounded border border-gray-500"
              name="passowordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button type="submit" data-testid="signupconfirm">
              Sign up
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Signup;
