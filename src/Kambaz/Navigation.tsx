import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline, } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser, } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles.css";

export default function KambazNavigation() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const links = [
    { label: "Account", path: "/Kambaz/Account", icon: FaRegCircleUser },
    { label: "Dashboard", path: "/Kambaz/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Kambaz/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Kambaz/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Kambaz/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  const getClassName = (tabName: string) =>
    activeTab === tabName
      ? "text-center border-0 bg-white text-danger"
      : "text-center border-0 bg-black text-white";

  const getIconClassName = (tabName: string) =>
    activeTab === tabName
      ? "fs-1 wd-sidebar-icon text-danger"
      : "fs-1 wd-sidebar-icon text-danger";

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center wd-sidebar-icon-container"
      >
        <img src="/images/NEU.png" width="75px" />
      </ListGroup.Item>

      {links.map(({ label, path, icon: Icon }) => (
        <ListGroup.Item
          key={label}
          to={path}
          as={Link}
          className={getClassName(label)}
          onClick={() => setActiveTab(label)}
        >
          <Icon className={getIconClassName(label)} />
          {label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
