import React, { useState, useContext } from "react";
import classes from "./Form.module.css";
import { Button, Row, Col, Form, Container } from "react-bootstrap";
import AuthContext from "../store/auth-context";

function UserForm() {
  const ctx = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    ctx.onLogin(username, password);
    setPassword("");
    setUsername("");
  };
  return (
    <Container className="p-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form className={`p-3 ${classes["form"]}`} onSubmit={submitHandler}>
            <Form.Group className="py-2">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={usernameHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="py-2">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={passwordHandler}
                value={password}
              ></Form.Control>
            </Form.Group>
            <Button className="my-2" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserForm;
