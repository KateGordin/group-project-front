import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectDetailEvent } from "../store/event/selector";
import { getDetailEvent } from "../store/event/actions";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Details.css'
import { useEffect, useState } from "react";
import PaymentModal from "../components/PaymentModal/PaymentModal";
import { Modal, Box, Typography } from "@mui/material";
import { Carousel } from "react-bootstrap";

export default function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const oneEvent = useSelector(selectDetailEvent);
  // console.log("oneEvent", oneEvent);

  //get one event (by id), using func from actions
  const getOneEvent = async () => dispatch(await getDetailEvent(params.id));

  useEffect(() => {
    getOneEvent();
  }, []);

  //for modal (payment)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const onClose = () => setSelectedEvent(null);

  return (
    <>
      {!oneEvent ? (
        "Loading"
      ) : (
        <div className="first-and-second">
          <div className="first">
            <div key={oneEvent.id}>
              <h3>{oneEvent.title}</h3>
              {/* <img src={oneEvent.mainImage} style={{ width: 500 }} /> */}
           <Carousel style={{ width: "30rem" }}>
              <Carousel.Item>
                <img
                  className="w-100"
                  src={oneEvent.mainImage}
                  alt={"oneEvent.title"}
                />
              </Carousel.Item>
                {oneEvent.images.map((item) => (
                  <Carousel.Item key={item.id}>
                    <img className="w-100" src={item.image} alt={item.id} />
                  </Carousel.Item>
                ))}
            </Carousel>
              <p>{oneEvent.description}</p>
              <p>
                <span style={{ fontWeight: "bold" }}>When: </span>
                {oneEvent.date}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Location: </span>
                {oneEvent.address}
              </p>
              {/* for pop-up modal (payment) */}
            </div>
            <PaymentModal oneEvent={selectedEvent} onClose={onClose} />
          </div>
          <div className="second">
            <MapContainer
              center={[oneEvent.latitude, oneEvent.longitude]}
              zoom={14}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenSrreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[oneEvent.latitude, oneEvent.longitude]}>
                <Popup>{oneEvent.address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
}