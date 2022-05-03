import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectArtist } from "../../store/artist/selectors";
import { updateArtist } from "../../store/artist/actions";

export default function EditProfile() {
  const artist = useSelector(selectArtist);
  const dispatch = useDispatch();
  
  //console.log("artistcompo", artist.id);

  const [name, setName] = useState(artist.name);
  const [email, setEmail] = useState(artist.email || "");
  const [image, setImage] = useState(artist.image);
  const  id  = artist.id;

  function submitForm(e) {
    dispatch(updateArtist(name, email, image, id));
  }

  return (
    <Form className="p-5 " onSubmit={submitForm}>
      <h1 className=" mb-5">Edit your profile</h1>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Update your name"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          placeholder="Update your name"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.Control
          value={image}
          onChange={(event) => setImage(event.target.value)}
          type="text"
        />
      </Form.Group>
      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={() => submitForm()}>
          Save changes
        </Button>
      </Form.Group>
    </Form>
  );
}
