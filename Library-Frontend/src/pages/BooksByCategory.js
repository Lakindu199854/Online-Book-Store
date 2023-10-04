import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { getBookByCategoryId, getBookById } from './services/bookServices';
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

const BooksByCategory=()=>{

    const {categoryId}=useParams();
    const[books,setBooks]=useState([]);

    const categoryRequest=async(categoryId)=>{
        try{
            console.log("3")
            const res=await getBookByCategoryId(categoryId);
            console.log(res);
            await setBooks(res);
            
        }catch(error){
            console.log(error);
        }
    }
 
    useEffect(()=>{
        console.log(categoryId);
        // console.log("1");
        categoryRequest(categoryId);
        // console.log("2");
    },[categoryId]);

    return(
        <div>
            
            {books &&
            <Container> {/* Use the fluid prop to create a full-width container */}
            <Row xs={1} md={3} className="g-4">
                {books.map((book, idx) => (
                <Col key={idx} className="d-flex justify-content-start">
                    <Card >
                    <Link to={`/book/${book.id}`}>
                        
                        <Card.Img variant="top"  src={`${book.imgLink}`} className="card-image" />
                        <Card.Body>
                        <Card.Title>{book.name}</Card.Title>
                        <Card.Subtitle>Author:{book.imgLink}</Card.Subtitle>
                        <Card.Subtitle>Author:{book.author}</Card.Subtitle>
                        <Card.Subtitle>Price:${book.price}</Card.Subtitle>
                        <Card.Text>
                        {book.description}
                        </Card.Text>
                    </Card.Body>
                    </Link>
                    </Card>
                </Col>
                ))}
            </Row>
            </Container>
      }
 
            
        </div>
    );
}
export default BooksByCategory