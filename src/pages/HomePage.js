import React from "react";
import video from "../assets/video.mp4";
import "./HomePage.scss";
import { NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4" />
      </video>

      <div className="event-button" onClick={() => navigate("/events")}>
        <button>Go To Events</button>
      </div>
    </div>
  );
}
