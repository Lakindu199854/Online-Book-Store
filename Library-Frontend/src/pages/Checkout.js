import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { getCartItemsByCartId } from "./services/cartService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../pages/css/cart.css";
import { updateCartItemQuantity } from "./services/cartService";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { createOrder } from "./services/orderService";

const Cart = () => {
  const [item, setItem] = useState([]);
  const [total, setTotal] = useState([]);
  const cartId = parseInt(sessionStorage.getItem("cartId"));
  const userId = parseInt(sessionStorage.getItem("userid"));

  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const getCartItems = async () => {
    try {
      const res = await getCartItemsByCartId(cartId);
      setItem(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getCartItems();
  },[])

  useEffect(() => {
    
    const totalprice = item.reduce((sum, element) => {
      return sum + element.book.price * element.quantity;
    }, 0);
    setTotal(totalprice);
  }, [item]);


  const onSubmit = async () => {
    setSuccessMessage("Order Successfully Placed");
    const data = {
      status: "processing",
      name: name,
      address: address,
      phone: phone,
      email: email,
      user: {
        id: userId,
      },
    };

    try {
      const res = await createOrder(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setName("")
    setAddress("")
    setPhone("")
    setEmail("")
    

  };

  
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      {item && (
        <div>
          <Row>
            <Col>
              {item.map((element) => (
                <ListGroup key={element.id}>
                  {element.quantity != 0 && (
                    <>
                      <ListGroup.Item>{element.book.name}</ListGroup.Item>
                      <ListGroup.Item>Qty:{element.quantity}</ListGroup.Item>
                      <ListGroup.Item>
                        Price :${element.book.price}
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              ))}
            </Col>
            <Col>
              <h1>Order Summary</h1>
              <ListGroup>
                <ListGroup.Item>
                  Total : ${total}
                  <br />
                  Delivery Fee : $1.5
                  <br />
                  Total Payment : ${total + 1.5}
                </ListGroup.Item>
              </ListGroup>
              <h1>Delivery Details</h1>
              <FloatingLabel
                controlId="floatingName"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="Name"
                  placeholder="N.A.Name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingAddress"
                label="Address"
                className="mb-3"
              >
                <Form.Control
                  type="Address"
                  placeholder="123 Main Street"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPhoneNumber"
                label="Phone Number"
                className="mb-3"
              >
                <Form.Control
                  type="Phone Number"
                  placeholder="+94 70 2182454"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="Email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </FloatingLabel>
              <Button className="submit" variant="primary" onClick={onSubmit}>
                Place Order
              </Button>{" "}
              <p>{successMessage}</p>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
export default Cart;
