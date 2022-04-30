import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
// import { postEvent } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function EventForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  const [mainImage, setMainImage] = useState("");
  const [date, setDate] = useState(new Date());

  const [place, setPlace] = useState("");

  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (!token) navigate("/login");
  //   }, [token]);

  function submitForm(event) {
    event.preventDefault();

    // dispatch(postEvent(title, description, date, place, mainImage));

    setTitle("");
    setMainImage(" ");
    setPlace("");
    setDescription("");
    setDate("");
  }

  const uploadMainImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "xevkbl7f");
    // console.log("main",files)

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/daokf4bsg/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    // console.log(file);
    setMainImage(file.url);
  };

  return (
    <Container>
      <div className="p-6 mb-4 " style={{ backgroundColor: "whitesmoke" }}>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-4">
          <h1 className=" p-4 mt-3 mb-2">Post Events</h1>
          <Form.Group controlId="formBasicName">
            <Form.Label>Title</Form.Label>

            <Form.Control
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-4">Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              type="text"
              placeholder="Write description"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-4">Place</Form.Label>
            <Form.Control
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              type="text"
              placeholder="Write place name"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="mt-4">Image</Form.Label>
            <Form.Control
              onChange={uploadMainImage}
              type="file"
              placeholder="url"
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-4">Date</Form.Label>

            <DatePicker selected={date} onChange={(Date) => setDate(date)} />
          </Form.Group>

          <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={submitForm}>
              Post
            </Button>
          </Form.Group>
          <Link to="/myspace">Click here to go MyEvent Page</Link>
        </Form>
      </div>
    </Container>
  );
}
