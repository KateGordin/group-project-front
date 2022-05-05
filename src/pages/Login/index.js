import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { login } from "../../store/artist/actions";
import { selectToken } from "../../store/artist/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

import "./Style.css";

export default function Login() {
  const [email, setEmail] = useState("meau@gmail.com");
  const [password, setPassword] = useState("meau");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (token !== null) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  useEffect(() => {
    if (token !== null) {
      navigate(-1);
    }
  }, [token, navigate]);

  function submitForm(event) {
    //console.log("hi");
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  return (
    <Container className="login-style">
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5" style={{}}>
        <h1 className="mt-5 mb-5">Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Log in
          </Button>
        </Form.Group>
        <Link to="/signup" style={{ textAlign: "center" }}>
          Click here to sign up
        </Link>
      </Form>
    </Container>
  );
}
