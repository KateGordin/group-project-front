import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectDetailEvent } from "../store/event/selector";
import { getDetailEvent, UPDATE_TICKETS } from "../store/event/actions";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Details.css";
import { useEffect, useState } from "react";
import PaymentModal from "../components/PaymentModal/PaymentModal";
import { Carousel } from "react-bootstrap";
import { updateTicket } from "../store/event/actions";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { More } from "@mui/icons-material";

export default function DetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const oneEvent = useSelector(selectDetailEvent);
  console.log("oneEvent", oneEvent);

  //get one event (by id), using func from actions
  const getOneEvent = async () => dispatch(await getDetailEvent(params.id));

  //buy tickets
  const buyTickets = async () =>
    dispatch(await updateTicket(oneEvent.tickets[0].id, 1, UPDATE_TICKETS));

  //for modal (payment)
  const [isOpen, setModalState] = useState(false);
  const onClose = () => setModalState(false);

  useEffect(() => {
    getOneEvent();
  }, []);

  return (
    <>
      {!oneEvent ? (
        "Loading"
      ) : (
        <div className="first-and-second">
          <div className="first">
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

            <Typography variant="body2" color="text.secondary">
              <Link to={`/artist/${oneEvent.artistId}`}>
                Know about artist{" "}
              </Link>
            </Typography>

            <p>
              <span style={{ fontWeight: "bold" }}>When: </span>
              {oneEvent.date}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Location: </span>
              {oneEvent.address}
            </p>
            <Button onClick={setModalState}>BYU NOW</Button>
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
          {oneEvent && (
            <PaymentModal
              buyTickets={buyTickets}
              oneEvent={oneEvent}
              onClose={onClose}
              isOpen={isOpen}
            />
          )}
        </div>
      )}
    </>
  );
}
