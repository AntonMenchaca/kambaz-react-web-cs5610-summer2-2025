import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
    id: 1, title: "NodeJS Module",
    description: "Learn about NodeJS and ExpressJS",
    lessons: [],
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })} />
      <hr />

      <h4>Modifying Assignment Score</h4>
      <a id="wd-update-assignment-score"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <FormControl className="w-75" id="wd-assignment-score"
        type="number"
        defaultValue={assignment.score} onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })} />
      <hr />

      <h4>Modifying Assignment Completed Status</h4>
      <a id="wd-update-assignment-completed"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="wd-assignment-completed"
          checked={assignment.completed} onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })} />
        <label className="form-check-label" htmlFor="wd-assignment-completed">
          Assignment Completed
        </label>
      </div>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr />
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr />
      <h4>Retrieving Modules</h4>
      <a id="wd-update-module-title"
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/title/${module.title}`}>
        Update Module Title
      </a>
      <FormControl className="w-75" id="wd-module-title"
        defaultValue={module.title} onChange={(e) =>
          setModule({ ...module, title: e.target.value })} />
      <hr />

      <h4>Modifying Module Description</h4>
      <a id="wd-update-module-description"
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/description/${module.description}`}>
        Update Module Description
      </a>
      <FormControl className="w-75" id="wd-module-description"
        defaultValue={module.description} onChange={(e) =>
          setModule({ ...module, description: e.target.value })} />
      <hr />

      <a id="wd-retrieve-modules" className="btn btn-primary"
        href={`${MODULE_API_URL}`}>
        Get Modules
      </a>
      <hr />

    </div>
  );
}
