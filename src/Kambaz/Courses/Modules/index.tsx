import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import * as db from "../../Database";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;
  return (
    <div className="wd-modules">
      <ModulesControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.filter((m) => m.course === cid).map((module: any) => (
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons />
            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </ListGroup.Item>
                ))}</ListGroup>)}</ListGroup.Item>))}
      </ListGroup>
    </div>
  );
}
