import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./css/users.css";
import Button from "react-bootstrap/Button";
import { createUser } from "./services/userServices";
import { createCartByUserId } from "./services/cartService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAllusers } from "./services/userServices";

const Users = () => {
  const [Username, setUsername] = useState(null);
  const [Password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [successMessageForSignup, setSuccessMessageForSignup] = useState("");
  const [successMessageForSignin, setSuccessMessageForSignin] = useState("");
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    if (cartId != null) {
      console.log("cartId is:" + cartId);
      localStorage.setItem("cartId", cartId.toString());
    }
  }, [cartId]);



const handleSigIn = async (event) =>{
  event.preventDefault();
  try {
    const res = await getAllusers();
    res.map((element)=>{
      if(element.username==Username){
        if(element.password==Password){
          const createCartForUser=async(userId)=>{
            try{
              const res = await createCartByUserId(userId);
              console.log(res);
            }catch(error){
              console.log(error);
            }
          }
          createCartForUser(element.id);
         
          window.location.href = '/home2';
        }
        setSuccessMessageForSignin("Invalid username or password");
      }
      setSuccessMessageForSignin("Invalid username or password");
      
    })
  } catch (error) {
    console.log(error);
  }
}

  const handleSignUp = async (event) => {
    event.preventDefault();
    const data = {
      username: Username,
      password: Password,
      email: email,
    };

    if(Username !==null && Password !==null && email !==null){
      console.log(1);
      try {
        const res = await createUser(data);
        console.log("id is :" + res.id);
        setSuccessMessageForSignup("User Successfully Saved");
  
      } catch (error) {
        console.log(error);
      }
  
      setPassword("");
      setUsername("");
      setEmail("");
      // window.location.href = '/home2'; // Replace '/new-page' with your desired URL
    }else{
      setSuccessMessageForSignup("User Not Added");
    }
  
    }
   
  //   const handleLogIn=async(event)=>{
  //     event.preventDefault
  //     const res=await createCartByUserId()

  //   }

  return (
    <div>
      <Row>
        <Col>
          <Form className="sign up"  onSubmit={handleSignUp}>
            <h1>Sign Up</h1>
            <Form.Group className="mb-3" controlId="formGroupUserName">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                value={Username}
                placeholder="Username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                onClick={() => {
                  setSuccessMessageForSignup("");
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                value={email}
                placeholder="Enter email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                onClick={() => {
                  setSuccessMessageForSignup("");
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={Password}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onClick={() => {
                  setSuccessMessageForSignup("");
                }}
              />
            </Form.Group>
            <Button
              className="CreateUserButton"
              type="submit"
              variant="primary"
            >
              Sign Up
            </Button>{" "}
            <p
              className={
                successMessageForSignup === "User Not Added" ? "error_message" : ""
              }
            >
              {successMessageForSignup}
            </p>
          </Form>
        </Col>

        <Col>
          <Form className="sign in" onSubmit={handleSigIn}>
            <h1>Sign In</h1>
            <Form.Group className="mb-3" controlId="formGroupUserName">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                value={Username}
                placeholder="Username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={Password}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>
            <Button
              className="CreateUserButton"
              type="submit"
              variant="primary"
            >
              Sign In
            </Button>{" "}
            <p className="loginSuccessMessage">{successMessageForSignin}</p>
        
          </Form>
        </Col>
      </Row>

      {/* <Form >
           <Form.Group className="mb-3" controlId="formGroupUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={Username} placeholder="Username" onChange={(event)=>{
                    setUsername(event.target.value)
                }} onClick={()=>{
                    setSuccessMessage("")
                }}/>
            </Form.Group>
          
            <Button className='LogIn Button' type='submit'  variant="primary" >Log In</Button>{' '}
            <p className={successMessage==="User Not Added" ? "error_message" :""}>{successMessage}</p>
            
        </Form> */}
    </div>
  );
};
export default Users;
