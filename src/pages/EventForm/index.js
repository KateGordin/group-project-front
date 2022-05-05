import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { postEvent } from "../../store/artist/actions";
import { selectToken } from "../../store/artist/selectors";
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
  const [images, setImages] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(50);
  const [seat, setSeat] = useState(100);

  const [address, setAdress] = useState("");

  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(
      postEvent(
        title,
        description,
        date,
        address,
        mainImage,
        images,
        ticketPrice,
        seat
      )
    );

    setTitle("");
    setMainImage(" ");
    setAdress("");
    setDescription("");
    setDate("");
    setImages("");
    setTicketPrice("");
    setSeat("");
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

  const uploadImage = async (e) => {
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
    console.log(file);
    setImages(file.url);
  };
  return (
    <Container>
      <div className="p-6 mb-4 " style={{ backgroundColor: "whitesmoke" }}>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-4">
          <h1 style={{ color: "black" }} className=" p-4 mt-3 mb-2">
            Post Events
          </h1>
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
            <Form.Label className="mt-4">Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(event) => setAdress(event.target.value)}
              type="text"
              placeholder="Write address"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-4">Date</Form.Label>

            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </Form.Group>

          <Form.Group>
            <Form.Label className="mt-4">Image</Form.Label>
            <Form.Control
              onChange={uploadMainImage}
              type="file"
              placeholder="url"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="mt-4">Other Images</Form.Label>
            <Form.Control
              onChange={uploadImage}
              type="file"
              placeholder="url"
              multiple
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-4">Ticket Price</Form.Label>
            <Form.Control
              value={ticketPrice}
              onChange={(event) => setTicketPrice(event.target.value)}
              type="number"
              placeholder="Enter price"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-4">Seat Available</Form.Label>
            <Form.Control
              value={seat}
              onChange={(event) => setSeat(event.target.value)}
              type="number"
              placeholder="Write available seat"
              required
            />
          </Form.Group>

          <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={submitForm}>
              Post
            </Button>
          </Form.Group>
          <Link to="/myEvents">Click here to go MyEvent Page</Link>
        </Form>
      </div>
    </Container>
  );
}
