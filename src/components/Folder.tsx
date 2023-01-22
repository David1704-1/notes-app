import { FolderFilled } from "@ant-design/icons";
type FolderProps = {
  name: string;
  onClick: VoidFunction;
};

export const Folder = ({ name, onClick }: FolderProps) => {
  return (
    <span
      className="border-1 mb-3 mr-2 flex cursor-pointer flex-col items-center justify-center rounded border"
      onClick={onClick}
    >
      <FolderFilled className="text-4xl text-blue-500" />
      <h4 className="text-base">{name}</h4>
    </span>
  );
};
