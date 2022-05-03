import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectDetailEvent } from "../store/event/selector";
import { getDetailEvent } from "../store/event/actions";
<<<<<<< HEAD
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Details.css'

=======
import { useEffect, useState } from "react";
import PaymentModal from "../components/PaymentModal/PaymentModal";
>>>>>>> f9987874905dc2b1501189011a84f3f4ff37d6ba

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
    <div>
      {!oneEvent ? (
        "Loading"
      ) : (
        <div key={oneEvent.id}>
          <h3>{oneEvent.title}</h3>
          <img src={oneEvent.mainImage} style={{ width: 500 }} />
          <p>{oneEvent.description}</p>
          <p>
            <span style={{ fontWeight: "bold" }}>When: </span>
            {oneEvent.date}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Location: </span>
            {oneEvent.address}
          </p>
            <div className="map">
           <MapContainer
                    center={[oneEvent.latitude, oneEvent.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenSrreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[oneEvent.latitude, oneEvent.longitude]}
                    >
                      <Popup>{oneEvent.address}</Popup>
                    </Marker>
                  </MapContainer>
                 </div>
          <button>BUY A TICKET</button>

          {/* for pop-up modal (payment) */}
          <PaymentModal oneEvent={selectedEvent} onClose={onClose} />

        </div>
      )}
    </div>
  );
}
