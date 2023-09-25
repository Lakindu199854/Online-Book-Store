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
import { Link } from "react-router-dom";
import { removeItemFromCart } from "./services/cartService";

const Cart = () => {
  const [item, setItem] = useState([]);
  const cartId = parseInt(localStorage.getItem("cartId"));

  const getCartItems = async () => {
    try {
      const res = await getCartItemsByCartId(cartId);
      console.log("poppy")
      setItem(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity =async (cartItemId,quantity) => {
    try {
      const res = await updateCartItemQuantity(cartItemId,quantity);
      console.log("res is :"+res);
     
    } catch (error) {
      console.log(error);
    }
  };


  const removecartItem=async(cartId,cartItemId)=>{
    try {
      const res = await removeItemFromCart(cartId,cartItemId);
      console.log("res is :"+res);
     
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

 

  const handleAdd =async (cartItemId,quantity)=>{
   
    await updateQuantity(cartItemId,quantity+1);
    getCartItems();
    console.log("cart item id is:"+cartItemId);
    console.log("quantity is :"+quantity);
  }

  const handleMinus =async (cartItemId,quantity)=>{
    if(quantity!=0){
      await updateQuantity(cartItemId,quantity-1);
    }else{
      await removecartItem(cartId,cartItemId);
    }
    getCartItems();
   
  }

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      {item && (
        <div>
           {item.map((element) => (
          <Row>
          
             
               <Col>
             
             <ListGroup key={element.id}>
               <ListGroup.Item>{element.book.name}</ListGroup.Item>
             </ListGroup>
           
         </Col>
         <Col>
          
             <ListGroup key={element.id}>
               <ListGroup.Item>{element.quantity}</ListGroup.Item>
             </ListGroup>
          
         </Col>
         <Col>
          
              <ListGroup key={element.id}>
                <Button className="add" variant="primary" onClick={()=>handleAdd(element.id,element.quantity)}>+</Button>{' '}
                
            </ListGroup>
          
         </Col>
         <Col>
          
              <ListGroup key={element.id}>
                <Button className="minus" variant="primary" onClick={()=>handleMinus(element.id,element.quantity)}>-</Button>{' '}
            </ListGroup>
         </Col>
              
           
           
          </Row>
              ))}

          <Link to={`/checkout/`}>
            <Button className="submit" variant="primary" >Proceed To Checkout</Button>{' '}
          </Link>
         
        </div>
      )}
    </div>
  );
};
export default Cart;
