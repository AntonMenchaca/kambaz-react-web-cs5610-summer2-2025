import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <Form.Control id="wd-username"
        placeholder="username"
        className="mb-2" />
      <Form.Control id="wd-password"
        placeholder="password" type="password"
        className="mb-2" />
      <Form.Control id="wd-password-verify"
        placeholder="verify password" type="password"
        className="mb-2" />
      <Link className="btn btn-primary w-100 mb-2" to="/Kambaz/Account/Profile" > Sign up </Link>
      <Link className="btn btn-link" to="/Kambaz/Account/Signin" >Sign in</Link>
    </div>
  );
}
