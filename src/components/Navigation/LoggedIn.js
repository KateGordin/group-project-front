import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/artist/actions";
import Button from "react-bootstrap/Button";

import { BsFillPersonFill } from "react-icons/bs";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();

  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem" }}>
        <div style={{ fontSize: "30px", color: "white" }}>
          <Link to="/myProfile">
            {" "}
            <abbr title="My Profile">
              <BsFillPersonFill />
            </abbr>
          </Link>
        </div>
      </Nav.Item>

      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}
