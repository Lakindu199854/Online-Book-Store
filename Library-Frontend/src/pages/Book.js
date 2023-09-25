import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { getBookById } from './services/bookServices';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import './Book.scss';
import { Link } from 'react-router-dom';
import { addCartItemToCart } from './services/cartService';


const Book=()=>{

    const {bookId}=useParams();
    
    const cartId=parseInt(localStorage.getItem("cartId"))
    const [successMessage, setSuccessMessage] = useState("");
    



    const[book,setBook]=useState(null);

    const bookRequest=async()=>{
        const res=await getBookById(bookId);
        await setBook(res);
    }

    useEffect(()=>{
        bookRequest();
        console.log("cartId is :-"+cartId);
        console.log("bookId is :-"+bookId);
    },[])


    const addItemToCart=async()=>{
        try{
            const res = await addCartItemToCart(cartId,bookId);
            console.log("res:"+res);
            setSuccessMessage("Successfully added to cart")
        }catch(error){
            console.log(error);
        }
       

    }

    return(
        <div>
            
             <h1>Book Details</h1>
             <ListGroup>

             <ListGroup.Item>
                        {book &&(
                            <div>
                                <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={`${book.imgLink}`}/>
                                    <Card.Body>
                                    <div><h5>Details:</h5>{book.imgLink}</div>
                                    <div><h5>Name:</h5>{book.name}</div>
                                    <div><h5>Author:</h5>{book.author}</div>
                                    <div><h5>Price:</h5>{book.price}</div>
                                    
                                        <Card.Title>Description</Card.Title>
                                        <Card.Text>
                                        <p>{book.description}</p>    
                                        </Card.Text>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            
                                                <button className="cart-button" onClick={addItemToCart}>
                                                <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart
                                                </button>
                                                <p>{successMessage}</p>
                                       
                                        </div>
                                        
                                        
                                       
                                        
                                    </Card.Body>
                                </Card>                               
                            </div>
                        )}
                    </ListGroup.Item>
             </ListGroup>
               
                    
               
              
           
            
        </div>
    );
}
export default Book