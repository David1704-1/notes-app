import { type AppType } from "next/app";
import { api } from "../utils/api";
import "../styles/globals.css";
import { Header } from "../components/Header";
import { AuthProtection } from "../components/AuthProtection";

const NotesApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <AuthProtection>
        <Component {...pageProps} />
      </AuthProtection>
    </>
  );
};

export default api.withTRPC(NotesApp);
