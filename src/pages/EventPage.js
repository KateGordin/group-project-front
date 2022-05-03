import React from "react";
import { fetchEvents } from "../store/event/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents,selectFilteredEvents } from "../store/event/selector";
import CardComponent from "../components/Card/Card";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EventPage() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
   const eventsFiltered = useSelector(selectFilteredEvents);
console.log('eventsFiltered', eventsFiltered)
const { filter } = useParams();

const toMap = !filter ? events : eventsFiltered;

  useEffect(() => {
    dispatch(fetchEvents);
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center " }}
    >
      {eventsFiltered
        ? toMap.map((event) => {
            return (
              <CardComponent
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                image={event.mainImage}
                place={event.place}
                tickets={event.tickets}
                artistName={event.artist?.name}
                artistId={event.artist?.id}
              />
            );
          })
        : "loading"}
    </div>
  );
}
