import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectDetailEvent } from "../store/event/selector";
import { getDetailEvent } from "../store/event/actions";
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
    <div className="m-5">
      {!oneEvent ? (
        "Loading"
      ) : (
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
            {oneEvent.place}
          </p>
          {/* for pop-up modal (payment) */}
          <PaymentModal oneEvent={selectedEvent} onClose={onClose} />
        </div>
      )}
    </div>
  );
}
