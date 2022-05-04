import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchArtist } from "../../store/allArtist/actions";
import { selectOneArtist } from "../../store/allArtist/selectors";

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Container, Row, Carousel, Button } from "react-bootstrap";
import Loading from "../../components/Loading";

export default function Artist() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const artist = useSelector(selectOneArtist);

  useEffect(() => {
    dispatch(fetchArtist(id));
  }, [dispatch]);

  // dispatch(fetchArtist);

  if (!artist) return <Loading />;
  console.log("sweta", artist.image);
  return (
    <Container className="p-5">
      <Row>
        <Col sm={7} style={{ width: "38rem" }} className="m-2">
          <img className="w-100" src={artist.image} alt={"artist.name"} />
        </Col>

        <Col sm={5}>
          <Row xs={1} md={2} className="g-4" style={{ columnGap: "30px" }}>
            <Card.Body>
              <Card.Title>{artist.name}</Card.Title>
              <hr />
              <Card.Text>
                <strong>About: </strong>
                {artist.about}
              </Card.Text>
            </Card.Body>

            <Link to={`/events`}>
              <Button variant="primary">Event</Button>
            </Link>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
