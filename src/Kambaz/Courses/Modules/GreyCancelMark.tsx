import { FaCircle } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

export default function GreyCancelMark() {
  return (
    <span className="me-1 position-relative">
      <TiCancel className="me-1 position-absolute fs-5" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>);
}

