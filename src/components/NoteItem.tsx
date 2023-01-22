import dayjs from "dayjs";

type NoteItemType = {
  title: string;
  content: string;
  created_on: Date;
};

type NoteItemProps = {
  note: NoteItemType;
};

export const NoteItem = ({
  note: { title, content, created_on },
}: NoteItemProps) => {
  return (
    <div className="mb-2 flex w-96 flex-col rounded border border-gray-400 p-2">
      <h1 className="text-center font-bold">{title}</h1>
      <p>{content}</p>
      <span>Created on: {dayjs(created_on).format("DD/MM/YYYY HH:mm:ss")}</span>
    </div>
  );
};
