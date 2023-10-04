import axios from "axios";

import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import "../css/users.css";
import Button from "react-bootstrap/Button";


import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link, useNavigate } from "react-router-dom";
import { createCartByUserId } from "../services/cartService";




const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [registerEnabled, setRegisterEnebled] = useState("");

  const navigate=useNavigate();


 
  
  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:9500/auth/login",data
      );
      
      console.log(response);   
      setErrorMessage("");
      sessionStorage.setItem('token',response.data.token);
      sessionStorage.setItem('username',response.data.username);
      sessionStorage.setItem('userid',response.data.id);
      axios.defaults.headers.common['Authorization']=`Bearer ${response.data.token}`;
       

        try {
          
          const res = await createCartByUserId(response.data.id);
          console.log(res);
          console.log("cart Id is : "+res.cart.id);
          sessionStorage.setItem('cartId',res.cart.id);
          setCartId(res.cart.id);
        } catch (error) {
          console.log(error);
        }
        navigate("/home")
        
    } catch (error) {
      setErrorMessage("Invalid username or password");
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

 

  return (
    <div>
      <div className="Container">
        <Row>
          <Col>
            <Form className="sign up-form" onSubmit={handleLogin}>
              <h1>Log in</h1>
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
                Log in
              </Button>{" "}
              {errorMessage && 
              <div className="text-danger mb-3">{errorMessage}</div>}
              <Link to="/register">Don't have an account? Sign up</Link>

              
             
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Login;
