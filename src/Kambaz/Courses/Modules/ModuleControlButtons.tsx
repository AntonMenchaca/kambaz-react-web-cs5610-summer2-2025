import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function ModuleControlButtons(
  { moduleId, deleteModule, editModule }: { moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void; }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (currentUser.role !== 'FACULTY') {
    return null;
  } else {
    return (
      <div className="float-end">
        <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
        <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
        <GreenCheckmark />
        <BsPlus className="fs-1" />
        <IoEllipsisVertical className="fs-4" />
      </div>);
  }

}