import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import { FormControl, ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import * as db from "../../Database";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [modules, setModules] = useState<any[]>(db.modules);
  const addModule = () => {
    setModules([...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] }]);
    setModuleName("");
  };
  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };
  const editModule = (moduleId: string) => {
    setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
  };
  const updateModule = (module: any) => {
    setModules(modules.map((m) => (m._id === module._id ? module : m)));
  };



  return (
    <div className="wd-modules">
      <ModulesControls moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.filter((m) => m.course === cid).map((module: any) => (
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">

              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <FormControl className="w-50 d-inline-block"
                  onChange={(e) => updateModule({ ...module, name: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name} />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={deleteModule}
                editModule={editModule} />

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
