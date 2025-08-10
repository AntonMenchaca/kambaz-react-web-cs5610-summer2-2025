import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();


  return (
    <div id="wd-account-navigation">
      <ul>
        {links.map((link) => (
          <li key={link}>
            <Link to={`/Kambaz/Account/${link}`} className={pathname === `/Kambaz/Account/${link}` ? "active" : ""}>
              {link}
            </Link>
          </li>
        ))}
        {currentUser && currentUser.role === "ADMIN" && (
          <li>
            <Link to={`/Kambaz/Account/Users`} className={pathname === `/Kambaz/Account/Users` ? "active" : ""}> Users </Link>
          </li>
        )}

      </ul>
    </div>
  );
}
