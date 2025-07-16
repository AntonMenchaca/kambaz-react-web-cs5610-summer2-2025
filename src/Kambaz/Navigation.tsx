import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline, IoHelpCircleOutline } from "react-icons/io5";
import { TiGroup } from "react-icons/ti";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser, FaChalkboardUser } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles.css";

export default function KambazNavigation() {
  const [activeTab, setActiveTab] = useState("Dashboard");

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

      <ListGroup.Item
        to="/Kambaz/Account"
        as={Link}
        className={getClassName("Account")}
        onClick={() => setActiveTab("Account")}
      >
        <FaRegCircleUser className={getIconClassName("Account")} />
        Account
      </ListGroup.Item>

      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        className={getClassName("Dashboard")}
        onClick={() => setActiveTab("Dashboard")}
      >
        <AiOutlineDashboard className={getIconClassName("Dashboard")} />
        Dashboard
      </ListGroup.Item>

      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        className={getClassName("Courses")}
        onClick={() => setActiveTab("Courses")}
      >
        <LiaBookSolid className={getIconClassName("Courses")} />
        Courses
      </ListGroup.Item>

      <ListGroup.Item
        to="/Kambaz/Groups"
        as={Link}
        className={getClassName("Groups")}
        onClick={() => setActiveTab("Groups")}
      >
        <TiGroup className={getIconClassName("Groups")} />
        Groups
      </ListGroup.Item>

      <ListGroup.Item
        to="/Kambaz/Calendar"
        as={Link}
        className={getClassName("Calendar")}
        onClick={() => setActiveTab("Calendar")}
      >
        <IoCalendarOutline className={getIconClassName("Calendar")} />
        Calendar
      </ListGroup.Item>

      <ListGroup.Item
        to="/Kambaz/Inbox"
        as={Link}
        className={getClassName("Inbox")}
        onClick={() => setActiveTab("Inbox")}
      >
        <FaInbox className={getIconClassName("Inbox")} />
        Inbox
      </ListGroup.Item>

      <ListGroup.Item
        to="/Kambaz/History"
        as={Link}
        className={getClassName("History")}
        onClick={() => setActiveTab("History")}
      >
        <LiaBookSolid className={getIconClassName("History")} />
        History
      </ListGroup.Item>

      <ListGroup.Item
        to="/Kambaz/Studio"
        as={Link}
        className={getClassName("Studio")}
        onClick={() => setActiveTab("Studio")}
      >
        <FaChalkboardUser className={getIconClassName("Studio")} />
        Studio
      </ListGroup.Item>

      <ListGroup.Item
        to="/Kambaz/Help"
        as={Link}
        className={getClassName("Help")}
        onClick={() => setActiveTab("Help")}
      >
        <IoHelpCircleOutline className={getIconClassName("Help")} />
        Help
      </ListGroup.Item>
    </ListGroup>
  );
}
