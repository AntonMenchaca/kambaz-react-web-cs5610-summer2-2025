import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as accountClient from "./client";
import { setCurrentUser } from "./reducer";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await accountClient.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
      } catch (error) {
        console.error("Error during logout:", error);
        // Even if logout fails on server, clear local state
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
      }
    };

    performLogout();
  }, [navigate, dispatch]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Logging out...</span>
        </div>
        <div className="mt-3">
          <h5>Logging you out...</h5>
        </div>
      </div>
    </div>
  );
}
