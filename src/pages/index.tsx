import { useEffect } from "react";
import { CustomHead } from "../components/CustomHead";
import { NoteForm } from "../components/NoteForm";
import { NoteItem } from "../components/NoteItem";
import { useAuthStore } from "../store/authStore";
import { api } from "../utils/api";

const Home = () => {
  const [user, setUser] = useAuthStore(({ user, setUser }) => [user, setUser]);
  const { data: fetchedUser } = api.auth.getUserFromToken.useQuery();
  const ctx = api.useContext();
  const { mutate: createNote } = api.notes.createNote.useMutation({
    onSuccess: () => {
      ctx.notes.getNotes.invalidate();
    },
  });
  const { data: notes = [] } = api.notes.getNotes.useQuery();
  useEffect(() => {
    setUser(fetchedUser);
  }, [fetchedUser]);

  return (
    <>
      <CustomHead title="Home" />
      <div className="mt-14 flex flex-col items-center">
        {user ? (
          <>
            {notes.length > 0 ? (
              notes.map((note) => <NoteItem note={note} />)
            ) : (
              <h1 className="font-bold text-black">
                You currently have no notes. Click below to create one.
              </h1>
            )}
            <NoteForm
              onSubmit={({ title, content }) => {
                createNote({
                  title,
                  content,
                });
              }}
            />
          </>
        ) : (
          <h1 className="font-bold text-black">
            Please login or signup to continue.
          </h1>
        )}
      </div>
    </>
  );
};

export default Home;
