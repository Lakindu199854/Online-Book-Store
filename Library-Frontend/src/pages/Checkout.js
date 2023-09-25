import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { getCartItemsByCartId } from "./services/cartService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../pages/css/cart.css';
import { updateCartItemQuantity } from "./services/cartService";

const Cart = () => {
  const [item, setItem] = useState([]);
  const [total,setTotal]=useState([]);
  const cartId = parseInt(localStorage.getItem("cartId"));
  const [successMessage, setSuccessMessage] = useState("");



  const getCartItems = async () => {
    try {
      const res = await getCartItemsByCartId(cartId);
      setItem(res);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    getCartItems();
    const totalprice=item.reduce((sum,element)=>{
        return sum+element.book.price*element.quantity;
    },0);
    setTotal(totalprice);
  }, [item]);

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
                    {element.quantity !=0 &&(
                        <>
                        <ListGroup.Item>{element.book.name}</ListGroup.Item>
                         <ListGroup.Item>Qty:{element.quantity}</ListGroup.Item>
                         <ListGroup.Item>Price :${element.book.price}</ListGroup.Item>
                         </>
                         
                    )}
                 
                </ListGroup>
              ))}
            </Col>
            <Col>
            <h2>Order Summary</h2>
          
                <ListGroup >
                  <ListGroup.Item>Total : ${total}<br/>
                  Delivery Fee : $1.5<br/>
                  Total Payment : ${total+1.5}
                  
                  
                  </ListGroup.Item>
                  <Button className="submit" variant="primary" onClick={()=>{
                    setSuccessMessage("Order Successfully Placed");
                    
                   
                  }}>Place Order</Button>{' '}
                    
                </ListGroup>
                <p>{successMessage}</p>
            
            </Col>
          </Row>
         
        </div>
      )}
    </div>
  );
};
export default Cart;
