import React from "react";
import video from "../assets/video.mp4";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home">
      <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
