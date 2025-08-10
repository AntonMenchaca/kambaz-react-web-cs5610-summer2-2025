import { useEffect, useState, useCallback } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router";
import { FormControl } from "react-bootstrap";
import * as client from "../../Account/client";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setEmail(user.email || "");
    setRole(user.role || "");
  }, [uid]);

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate("/Kambaz/Account/Users");
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid, fetchUser]);

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate("/Kambaz/Account/Users")} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit" />
        )}
        {editing && (
          <FaCheck onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save" />
        )}
        {!editing && (
          <div className="wd-name"
            onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <FormControl className="w-100 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }
            }}
          />
        )}
      </div>

      <b>Roles:</b>
      {!editing && <span className="wd-roles">{user.role}</span>}
      {editing && (
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-control mb-2 wd-edit-role"
          onKeyDown={(e) => {
            if (e.key === "Enter") { saveUser(); }
          }}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      )}
      <br />

      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />

      <b>Email:</b>
      {!editing && <span className="wd-email">{user.email}</span>}
      {editing && (
        <FormControl
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 wd-edit-email"
          onKeyDown={(e) => {
            if (e.key === "Enter") { saveUser(); }
          }}
        />
      )}
      <br />

      <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate("/Kambaz/Account/Users")}
        className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>

    </div>
  );
}

