import { useAuthStore } from "../store/authStore";

export const Header = () => {
  const [user, logout] = useAuthStore(({ user, logout }) => [user, logout]);
  return (
    <div className="fixed top-0 flex h-12 w-screen flex-row items-center justify-between bg-slate-700">
      <h1 className="ml-6 font-bold text-white ">
        <a href="/">Notes App</a>
      </h1>
      <div className="mr-6 flex flex-row">
        {user ? (
          <>
            <h1 className="text-white">Hello, {user.username}</h1>
            <button onClick={logout} className="ml-4 rounded bg-white p-[2px]">
              Log out
            </button>
          </>
        ) : (
          <>
            <h1 className="text-white">
              <a href="/login">Log in</a>
            </h1>
            <h1 className="ml-6 text-white">
              <a href="/signup">Sign up</a>
            </h1>
          </>
        )}
      </div>
    </div>
  );
};
