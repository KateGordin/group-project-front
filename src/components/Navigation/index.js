import React from "react";
import "./NavBar.scss";
import event from "../../assets/music.jpeg";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectArtist } from "../../store/artist/selectors";
import NavbarItem from "./NavbarItem";

import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navigation() {
  const token = useSelector(selectToken);
  const artist = useSelector(selectArtist);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <div className="navbar">
      <NavLink end to={"/"}>
        <img
          className="navbar__logo"
          alt="logo"
          style={{ width: 170 }}
          src={event}
        />
      </NavLink>

      <div className="navbar__buttons d-flex">
        {/* <NavLink end to={"/events"}>
          <button className="btn-green">Events</button>
        </NavLink> */}
        <NavbarItem path="/events" linkText="Events" />

        <Nav style={{ width: "100%" }} fill>
          {token && artist.isArtist && (
            <NavbarItem path="/form" linkText="Add Events" />
          )}
          {token && <NavbarItem path="/myEvents" linkText="My Events" />}
          {loginLogoutControls}
        </Nav>
      </div>
    </div>
  );
}
