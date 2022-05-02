import React from "react";
import "./NavBar.scss";
import event from "../assets/music.jpeg";
import { NavLink } from "react-router-dom";

export default function NavBar() {
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
      <div className="navbar__buttons">
        <NavLink end to={"/events"}>
          <button className="btn-green">Events</button>
        </NavLink>

        <NavLink end to={"/login"}>
          <button className="btn-primary">Log in</button>
        </NavLink>
      </div>
    </div>
  );
}
