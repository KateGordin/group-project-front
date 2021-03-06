import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { selectArtist } from "../../store/artist/selectors";
import EditProfile from "./EditProfile";
import { selectToken } from "../../store/artist/selectors";
import { useNavigate } from "react-router-dom";

import "./Style.css";

export default function MyProfile() {
  const [editMode, setEditMode] = useState(false);
  const token = useSelector(selectToken);
  const artist = useSelector(selectArtist);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  if (artist === null) {
    return <Loading />;
  }
  return (
    <Container className="p-5">
      <div className="col-6 justify-content-center">
        <h1 className=" p-2">My Profile</h1>
        <Card.Body>
          <Card.Title style={{ color: "rgb(2, 2, 46)" }}>
            Name: {artist.name}
          </Card.Title>
          <Card.Title style={{ color: "rgb(2, 2, 46)" }}>
            Email: {artist.email}
          </Card.Title>
          <Card.Img variant="top" alt="logo" src={artist.image} />
          <Card>
            <Card.Text>
              <strong>About:</strong> {artist.about}
            </Card.Text>

            <Button onClick={() => setEditMode(!editMode)}>
              {editMode ? "Close" : "Edit Profile"}
            </Button>
          </Card>

          {editMode && (
            <Card>
              <EditProfile close={() => setEditMode(false)} />
            </Card>
          )}
        </Card.Body>
      </div>
    </Container>
  );
}
