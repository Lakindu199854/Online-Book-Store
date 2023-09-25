import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./css/users.css";
import Button from "react-bootstrap/Button";
import { createUser } from "./services/userServices";
import { createCartByUserId } from "./services/cartService";

const Users = () => {
  const [Username, setUsername] = useState(null);
  const [Password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [cartId, setCartId] = useState(null);



    useEffect(()=>{
        if(cartId!=null){
            console.log("cartId is:"+cartId)
            localStorage.setItem('cartId',cartId.toString());
        }
    },[cartId])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: Username,
      password: Password,
      email: email,
    };
    try {
      const res = await createUser(data);
      console.log("res is :" + res.id);

      try {
      
        const res2 = await createCartByUserId(res.id);
        console.log("res2 is :" + res2.cart.user.username);
        setCartId(res2.cart.id);
        console.log("cartIt is:"+res2.cart.id)
      } catch (error) {
        console.log(error);
      }

      setPassword("");
      setUsername("");
      setEmail("");

      if (res && res.success) {
        setSuccessMessage("User Successfully Saved");
      } else {
        console.log(1);
        setSuccessMessage("User Not Added");
      }
    } catch (error) {
      console.log(error);
      setSuccessMessage("User Not Added");
    }
    window.location.href = '/home2'; // Replace '/new-page' with your desired URL

  };

  //   const handleLogIn=async(event)=>{
  //     event.preventDefault
  //     const res=await createCartByUserId()

  //   }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
              setSuccessMessage("");
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
              setSuccessMessage("");
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
              setSuccessMessage("");
            }}
          />
        </Form.Group>
        <Button className="CreateUserButton" type="submit" variant="primary">
          Log In
        </Button>{" "}
        <p
          className={successMessage === "User Not Added" ? "error_message" : ""}
        >
          {successMessage}
        </p>
      </Form>
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
