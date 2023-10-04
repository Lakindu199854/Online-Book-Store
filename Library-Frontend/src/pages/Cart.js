import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../pages/css/cart.css";
import {
  getCartItemsByCartId,
  removeItemFromCart,
  updateCartItemQuantity,
} from "./services/cartService";
import { Link } from "react-router-dom";

const Cart = () => {
  const [item, setItem] = useState([]);
  const cartId = parseInt(sessionStorage.getItem("cartId"));
  const [cartStatue, setCartStatus] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  const getCartItems = async () => {
    try {
      const res = await getCartItemsByCartId(cartId);
      console.log("poppy");
      console.log(cartId);

      setItem(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const nothingInCart=()=>{
  //   setCartStatus("Cart is empty");
  //   return;
  // }

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const res = await updateCartItemQuantity(cartItemId, quantity);
      console.log("res is :" + res);
    } catch (error) {
      console.log(error);
    }
  };

  const removecartItem = async (cartId, cartItemId) => {
    try {
      const res = await removeItemFromCart(cartId, cartItemId);
      console.log("res is :" + res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(item.length);
    if (item.length !== 0) {
      setIsEmpty(false);
    }
  }, [item]);

  useEffect(() => {
    getCartItems();
  }, []);

  const handleAdd = async (cartItemId, quantity) => {
    await updateQuantity(cartItemId, quantity + 1);
    getCartItems();
    console.log("cart item id is:" + cartItemId);
    console.log("quantity is :" + quantity);
  };

  const handleMinus = async (cartItemId, quantity) => {
    if (quantity != 0) {
      await updateQuantity(cartItemId, quantity - 1);
    } else {
      await removecartItem(cartId, cartItemId);
    }
    getCartItems();
  };

  return (
    <div className="Container">
      {isLoading ? (
        // JSX to render when isLoading is true
        <div>Loading...</div>
      ) : isEmpty ? (
        // JSX to render when isLoading is false and isEmpty is true
        <div className="emptyContainer">
          <div>
            <h3>Oops!! Your cart is empty</h3>
          </div>
  
          <div>
            <Link to={`/home`}>
              <Button variant="secondary" size="lg">
                Back To Shopping
              </Button>{" "}
            </Link>
          </div>
        </div>
      ) : (
        // JSX to render when isLoading is false and isEmpty is false
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          {item && (
            <div>
              <Row>
                <Col>
                  <h2>Item</h2>
                  {item.map((element) => (
                    <ListGroup key={element.id}>
                      <ListGroup.Item>{element.book.name}</ListGroup.Item>
                    </ListGroup>
                  ))}
                </Col>
  
                <Col>
                  <h2>Quantity</h2>
                  {item.map((element) => (
                    <ListGroup key={element.id}>
                      <ListGroup.Item>{element.quantity}</ListGroup.Item>
                    </ListGroup>
                  ))}
                </Col>
                <Col className="add_remove">
                  {item.map((element) => (
                    <ListGroup key={element.id}>
                      <Button
                        className="add"
                        variant="primary"
                        onClick={() => handleAdd(element.id, element.quantity)}
                      >
                        +
                      </Button>{" "}
                    </ListGroup>
                  ))}
                </Col>
                <Col className="add_remove">
                  {item.map((element) => (
                    <ListGroup key={element.id}>
                      <Button
                        className="minus"
                        variant="primary"
                        onClick={() =>
                          handleMinus(element.id, element.quantity)
                        }
                      >
                        -
                      </Button>{" "}
                    </ListGroup>
                  ))}
                </Col>
              </Row>
  
              <Link to={`/checkout/`}>
                <Button className="submit" variant="primary">
                  Proceed To Checkout
                </Button>{" "}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
};
export default Cart;
