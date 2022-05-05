import React, { useEffect } from "react";
// import ReactStars from "react-rating-stars-component";
import { Button, Card, Carousel, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { deleteEvent } from "../../store/artist/actions";
import { selectMyEvent, selectToken } from "../../store/artist/selectors";

import "./Style.css";

export default function MyEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const events = useSelector(selectMyEvent);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  const onDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  if (events === null) {
    return <Loading />;
  }

  return (
    <Container className="p-4">
      <Card.Title>My Events</Card.Title>

      <Row
        xs={1}
        md={2}
        className=""
        style={{ columnGap: "15px", rowGap: "15px" }}
      >
        {events.length === 0
          ? "No events added yet"
          : events.map((event) => {
              return (
                <Card
                  clssName=" d-flex"
                  style={{ width: "18rem" }}
                  key={event.id}
                >
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="w-100"
                        // class="mcard-img-top"
                        src={event.mainImage}
                        alt={"event.title"}
                      />
                    </Carousel.Item>
                    {event.images.map((item) => (
                      <Carousel.Item key={item.id}>
                        <img className="w-100" src={item.image} alt={item.id} />
                      </Carousel.Item>
                    ))}
                  </Carousel>

                  <Card.Body>
                    <Card.Title className="text-lowercase">
                      {event.title}
                    </Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Card.Text>{event.date}</Card.Text>
                    <Card.Text>{event.place}</Card.Text>

                    {event.tickets.map((ticket) => {
                      return (
                        <div>
                          <Card.Text>
                            {" "}
                            No. of tickets available:{" "}
                            <strong>{ticket.numberAvailable}</strong>
                          </Card.Text>
                        </div>
                      );
                    })}
                    <Button variant="danger" onClick={() => onDelete(event.id)}>
                      Delete
                    </Button>

                    <Link to={`/event/${event.id}`}>
                      <Button variant="primary">Details</Button>
                    </Link>
                  </Card.Body>
                </Card>
              );
            })}
      </Row>
    </Container>
  );
}
