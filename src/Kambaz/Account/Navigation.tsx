import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <Link to={`/Kambaz/Account/${link}`} className={pathname === `/Kambaz/Account/${link}` ? "active" : ""}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
