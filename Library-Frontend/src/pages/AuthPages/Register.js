import axios from "axios";

import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import "../css/users.css";
import Button from "react-bootstrap/Button";
import { createUser } from "../services/userServices";
import { createCartByUserId } from "../services/cartService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAllusers } from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessageForSignin, setSuccessMessageForSignin] = useState("");
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [registerEnabled, setRegisterEnebled] = useState("");

  const navigate=useNavigate();


  useEffect(() => {
    if (userId !== null && cartId !== null) {
      storeCartandUser();
    }
  }, [cartId, userId]);

  const storeCartandUser = () => {
    if (cartId != null) {
      console.log("cartId is in users:" + cartId);
      sessionStorage.setItem("cartId", cartId.toString());
      sessionStorage.setItem("userId", cartId.toString());
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email,
    };
    try {
      const response = await axios.post(
        "http://localhost:9500/auth/register",data
      );
      navigate("/login")
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);

    if (username.length < 6) {
      setRegisterEnebled(true);
    } else {
      setRegisterEnebled(false);
    }
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);

    if (password.length < 6) {
      setRegisterEnebled(true);
    } else {
      setRegisterEnebled(false);
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (email != "" && regx.test(email)) {
      setRegisterEnebled(false);
    } else {
      setRegisterEnebled(true);
    }
  };


  return (
    <div>
      <div className="Container">
        <Row>
          <Col>
            <Form className="sign up-form" onSubmit={handleRegister}>
              <h1>Sign Up</h1>
              <Form.Group className="mb-3" controlId="formGroupUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={handleUsername}
                //   onClick={() => {
                //     setSuccessMessageForSignup("");
                //   }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  placeholder="Enter email"
                  onChange={handleEmail}
                //   onClick={() => {
                //     setSuccessMessageForSignup("");
                //   }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={handlePassword}
                //   onClick={() => {
                //     setSuccessMessageForSignup("");
                //   }}
                />
              </Form.Group>
              <Button
                className="CreateUserButton"
                type="submit"
                variant="primary"
                disabled={registerEnabled}
              >
                Sign Up
              </Button>{" "}
              {errorMessage && 
              <div className="errorMessage">{errorMessage}</div>}
            </Form>
            <Link to="/login">Already have an account? Sign in</Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Register;
