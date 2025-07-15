import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import "./styles.css";
import { TiGroup } from "react-icons/ti";
import { IoHelpCircleOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser, FaChalkboardUser } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function KambazNavigation() {
  return (
    <ListGroup id="wd-kambaz-navigation"
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <ListGroup.Item id="wd-neu-link" target="_blank" action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75px" /></ListGroup.Item><br />
      <ListGroup.Item to="/Kambaz/Account" as={Link}
        className="text-center border-0 bg-black text-white">
        <FaRegCircleUser className="fs-1 text text-white" /><br />
        Account </ListGroup.Item><br />
      <ListGroup.Item to="/Kambaz/Dashboard" as={Link}
        className="text-center border-0
                  bg-white text-danger">
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard </ListGroup.Item><br />
      <ListGroup.Item to="/Kambaz/Dashboard" as={Link}
        className="text-white
                  bg-black text-center border-0">
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses </ListGroup.Item><br />
      <ListGroup.Item to="/Kambaz/Dashboard" as={Link}
        className="text-white
                  bg-black text-center border-0">
        <TiGroup className="fs-1 text-danger" /><br />
        Groups </ListGroup.Item><br />
      {/* complete styling the rest of the links */}
      <ListGroup.Item to="/Kambaz/Calendar" as={Link}
        className="text-white bg-black text-center border-0">
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar </ListGroup.Item><br />
      <ListGroup.Item to="/Kambaz/Inbox" as={Link}
        className="text-white bg-black text-center border-0">
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox </ListGroup.Item><br />
      {/*Create for History Studio and Help */}
      <ListGroup.Item to="/Kambaz/History" as={Link}
        className="text-white bg-black text-center border-0">
        <LiaBookSolid className="fs-1 text-danger" /><br />
        History </ListGroup.Item><br />
      <ListGroup.Item to="/Kambaz/Studio" as={Link}
        className="text-white bg-black text-center border-0">
        <FaChalkboardUser className="fs-1 text-danger" /><br />
        Studio </ListGroup.Item><br />
      <ListGroup.Item to="/Kambaz/Help" as={Link}
        className="text-white bg-black text-center border-0">
        <IoHelpCircleOutline className="fs-1 text-danger" /><br />
        Help </ListGroup.Item><br />
    </ListGroup>);
}