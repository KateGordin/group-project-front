import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectDetailEvent } from "../store/event/selector";
import { getDetailEvent } from "../store/event/actions";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Details.css'


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
        </div>
      )}
    </div>
  );
}
