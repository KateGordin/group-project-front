import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { selectArtist } from "../../store/artist/selectors";
import EditProfile from "./EditProfile";
import Playercomp from "../../components/MusicPlayerComponent/Playercomp";

export default function MyProfile() {
  const [editMode, setEditMode] = useState(false);

  const artist = useSelector(selectArtist);

  // useEffect(() => {
  //   console.log("artist", artist.id);
  // }, [artist]);

  if (artist === null) {
    return <Loading />;
  }
  return (
    <div>
      <Playercomp artistId="2K5oIzqUzZKO738h7GT3iv" />

      <Container className="p-5">
        <div className="col-6 justify-content-center">
          <h1 className="text-muted p-2">My Profile</h1>
          <Card.Body>
            <Card.Title>Name: {artist.name}</Card.Title>
            <Card.Title>Email: {artist.email}</Card.Title>
            <Card.Img variant="top" alt="logo" src={artist.image} />
            <Card>
              <Button onClick={() => setEditMode(!editMode)}>
                {editMode ? "Close" : "Edit Profile"}
              </Button>
            </Card>

            {editMode && (
              <Card>
                <EditProfile />
              </Card>
            )}
          </Card.Body>
        </div>
      </Container>
    </div>
  );
}
