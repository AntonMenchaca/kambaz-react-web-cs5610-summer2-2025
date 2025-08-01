import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import GreyCancelMark from "./GreyCancelMark";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ModulesControls({ moduleName, setModuleName, addModule }: { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (currentUser.role !== 'FACULTY') {
    return null;
  } else {
    return (
      <div id="wd-modules-controls" className="text-nowrap">
        <Button variant="danger" onClick={() => handleShow} size="lg" className="me-1 float-end" id="wd-add-module-btn">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Module
        </Button>
        <Dropdown className="float-end me-2">
          <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
            <GreenCheckmark /> Publish All
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="wd-publish-all-btn" id="wd-publish-all">
              <GreenCheckmark /> Publish All
            </Dropdown.Item>
            <Dropdown.Item className="wd-publish-all-btn" id="wd-publish-all-modules-and-items">
              <GreenCheckmark /> Publish all modules and items
            </Dropdown.Item>
            <Dropdown.Item className="wd-publish-all-btn" id="wd-publish-modules-only">
              <GreenCheckmark /> Publish modules only
            </Dropdown.Item>
            <Dropdown.Item className="wd-unpublish-all-btn" id="wd-unpublish-all-modules-and-items">
              <GreyCancelMark /> Unpublish all modules and items
            </Dropdown.Item>
            <Dropdown.Item className="wd-unpublish-modules-only-btn" id="wd-unpublish-modules-only">
              <GreyCancelMark /> Unpublish modules only
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">
          View Progress
        </Button>
        <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-collapse-all">
          Collapse All
        </Button>
        <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
          moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />

      </div>
    );
  }

}
