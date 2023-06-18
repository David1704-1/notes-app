import { useRouter } from "next/router";
import { CustomHead } from "../components/CustomHead";
import { NoteForm } from "../components/NoteForm";
import { NoteItem } from "../components/NoteItem";
import { api } from "../utils/api";

const FolderPage = () => {
  const router = useRouter();
  const folderId = Number(router.query.folder_id as string);
  const { data: folder } = api.folders.getFolderById.useQuery({
    id: folderId,
  });
  const { data: notes = [] } = api.notes.getNotes.useQuery({
    folderId,
  });
  const ctx = api.useContext();
  const { mutate: createNote } = api.notes.createNote.useMutation({
    onSuccess: () => {
      void ctx.notes.invalidate();
    },
  });
  return (
    <>
      <CustomHead title={`Folder: ${folder?.name ?? ""}`} />
      <div className="mt-14 flex flex-col items-center">
        {notes.length > 0 ? (
          notes.map((note) => <NoteItem key={note.id} note={note} />)
        ) : (
          <h1 className="font-bold text-black">
            This folder is empty. Fill the below form to create a note.
          </h1>
        )}
        <NoteForm
          onSubmit={({ title, content }) => {
            createNote({
              title,
              content,
              folderId,
            });
          }}
        />
      </div>
    </>
  );
};
export default FolderPage;
