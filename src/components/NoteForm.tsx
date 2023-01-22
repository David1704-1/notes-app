import { useState } from "react";

type NoteFormProps = {
  onSubmit: (args: { title: string; content: string }) => void;
};

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <form
      className="mt-6 flex w-96 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ title, content });
        setTitle("");
        setContent("");
      }}
    >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        className="rounded border border-gray-400"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        id=""
        cols={30}
        rows={3}
        className="rounded border border-gray-400"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <button type="submit" className="mt-2 rounded bg-slate-700 text-white">
        Add note
      </button>
    </form>
  );
};
