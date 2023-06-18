import { useRouter } from "next/router";
import { useState } from "react";
import { CustomHead } from "../components/CustomHead";
import { Folder } from "../components/Folder";
import { api } from "../utils/api";

const Home = () => {
  const ctx = api.useContext();
  const [folderName, setFolderName] = useState("");
  const router = useRouter();
  const { mutate: createFolder } = api.folders.createFolder.useMutation({
    onSuccess: () => {
      void ctx.folders.getFolders.invalidate();
    },
  });
  const { data: folders = [] } = api.folders.getFolders.useQuery();

  return (
    <>
      <CustomHead title="Home" />
      <div className="mt-14 flex flex-col items-center">
        <>
          {folders.length > 0 ? (
            <div className="grid grid-cols-5">
              {folders.map(({ id, name }) => (
                <Folder
                  key={id}
                  name={name}
                  onClick={() => void router.push(`/${id}`)}
                />
              ))}
            </div>
          ) : (
            <>
              <h1 className="font-bold text-black">
                You currently have no folders. Click below to create one.
              </h1>
              <label htmlFor="name">Folder name</label>
            </>
          )}
          <input
            type="text"
            name="name"
            className="rounded border border-gray-400"
            value={folderName}
            onChange={(event) => setFolderName(event.target.value)}
          />
          <button
            className="mt-2 rounded bg-slate-700 p-1 text-white"
            onClick={() => {
              createFolder({
                name: folderName,
              });
              setFolderName("");
            }}
          >
            Add folder
          </button>
        </>
      </div>
    </>
  );
};

export default Home;
