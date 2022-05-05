import React, { useState } from "react";
import { fetchEvents, UPDATE_EVENT_TICKETS } from "../store/event/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents, selectFilteredEvents } from "../store/event/selector";
import CardComponent from "../components/Card/Card";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PaymentModal from "../components/PaymentModal/PaymentModal";
import { updateTicket } from "../store/event/actions";

export default function EventPage() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const eventsFiltered = useSelector(selectFilteredEvents);
  // console.log("eventsFiltered", eventsFiltered);
  const { filter } = useParams();

  const toMap = !filter ? events : eventsFiltered;
  //for modal (payment)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const onClose = () => setSelectedEvent(null);

  //buy tickets
  const buyTickets = async () =>
    dispatch(
      await updateTicket(selectedEvent.tickets[0].id, 1, UPDATE_EVENT_TICKETS)
    );

  useEffect(() => {
    dispatch(fetchEvents);
  }, []);

  return (
    <div
      className="eventpage-class"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center ",
      }}
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
                onOpenModal={() => setSelectedEvent(event)}
              />
            );
          })
        : "loading"}
      {selectedEvent && (
        <PaymentModal
          oneEvent={selectedEvent}
          onClose={onClose}
          isOpen={!!selectedEvent}
          buyTickets={buyTickets}
        />
      )}
    </div>
  );
}
